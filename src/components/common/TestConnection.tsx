import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_GATEWAY_URL, ENDPOINTS } from '../../utils/constants';
import Button from './Button';

const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [gatewayStatus, setGatewayStatus] = useState<string>('');
  const [authServiceStatus, setAuthServiceStatus] = useState<string>('');

  const testConnection = async () => {
    setStatus('checking');
    setErrorMessage('');
    setGatewayStatus('');
    setAuthServiceStatus('');
    
    try {
      // Test 1: API Gateway health
      console.log('🔍 Testing API Gateway health...');
      const gatewayResponse = await fetch(`${API_GATEWAY_URL}/actuator/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (gatewayResponse.ok) {
        setGatewayStatus('✅ API Gateway is running');
        console.log('✅ API Gateway health check passed');
      } else {
        setGatewayStatus('❌ API Gateway health check failed');
        console.log('❌ API Gateway health check failed:', gatewayResponse.status);
      }

      // Test 2: Try to reach auth-service through gateway
      console.log('🔍 Testing auth-service through API Gateway...');
      const authResponse = await fetch(`${API_GATEWAY_URL}${ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test123'
        })
      });
      
      if (authResponse.status === 400 || authResponse.status === 401) {
        setAuthServiceStatus('✅ Auth service is reachable (got expected error response)');
        console.log('✅ Auth service is reachable through gateway');
      } else if (authResponse.status === 404) {
        setAuthServiceStatus('❌ Auth service route not found');
        console.log('❌ Auth service route not found');
      } else {
        setAuthServiceStatus(`⚠️ Unexpected response: ${authResponse.status}`);
        console.log('⚠️ Unexpected response from auth service:', authResponse.status);
      }

      // Test 3: Direct auth-service test (if gateway fails)
      if (!gatewayResponse.ok) {
        console.log('🔍 Testing direct auth-service connection...');
        try {
          const directAuthResponse = await fetch('http://localhost:8081/actuator/health', {
            method: 'GET',
          });
          if (directAuthResponse.ok) {
            setAuthServiceStatus('✅ Auth service is running directly');
            console.log('✅ Auth service is running directly');
          } else {
            setAuthServiceStatus('❌ Auth service not responding directly');
            console.log('❌ Auth service not responding directly');
          }
        } catch (directError) {
          setAuthServiceStatus('❌ Cannot reach auth service directly');
          console.log('❌ Cannot reach auth service directly:', directError);
        }
      }

      setStatus('connected');
      
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      console.error('❌ Connection test failed:', error);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return '✅ Connection Test Complete';
      case 'error':
        return '❌ Connection Test Failed';
      default:
        return '⏳ Running Connection Tests...';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border max-w-sm max-h-96 overflow-y-auto">
      <h3 className="font-semibold text-gray-800 mb-2">Backend Connection Test</h3>
      <div className={`text-sm font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </div>
      
      {gatewayStatus && (
        <div className="mt-2 text-xs">
          <div className={gatewayStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {gatewayStatus}
          </div>
        </div>
      )}
      
      {authServiceStatus && (
        <div className="mt-1 text-xs">
          <div className={authServiceStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {authServiceStatus}
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-2">
          <p className="text-xs text-red-500 mb-2">{errorMessage}</p>
          <p className="text-xs text-gray-600">Gateway URL: {API_GATEWAY_URL}</p>
          <p className="text-xs text-gray-500 mt-1">
            Check if API Gateway and Auth Service are running
          </p>
        </div>
      )}
      
      <Button
        size="sm"
        variant="outline"
        onClick={testConnection}
        className="mt-2"
        disabled={status === 'checking'}
      >
        Retry Tests
      </Button>
    </div>
  );
};

export default TestConnection; 