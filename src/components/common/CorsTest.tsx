import React, { useState } from 'react';
import { API_GATEWAY_URL, ENDPOINTS } from '../../utils/constants';
import Button from './Button';

const CorsTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testCors = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      console.log('🔍 Testing CORS with simple GET request...');
      
      const response = await fetch(`${API_GATEWAY_URL}/actuator/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000'
        },
      });

      if (response.ok) {
        setTestResult('✅ CORS is working - GET request successful');
        console.log('✅ CORS test passed');
      } else {
        setTestResult(`❌ CORS issue - HTTP ${response.status}`);
        console.log('❌ CORS test failed:', response.status);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('CORS')) {
        setTestResult('❌ CORS Error: Request blocked by browser');
        console.error('❌ CORS Error:', error);
      } else {
        setTestResult(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error('❌ Network Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testPostRequest = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      console.log('🔍 Testing CORS with POST request...');
      
      const response = await fetch(`${API_GATEWAY_URL}${ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test123'
        })
      });

      if (response.status === 400 || response.status === 401) {
        setTestResult('✅ CORS is working - POST request reached backend (got expected error)');
        console.log('✅ CORS POST test passed');
      } else if (response.status === 404) {
        setTestResult('⚠️ CORS works but endpoint not found - check API Gateway routing');
        console.log('⚠️ Endpoint not found');
      } else {
        setTestResult(`⚠️ Unexpected response: HTTP ${response.status}`);
        console.log('⚠️ Unexpected response:', response.status);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('CORS')) {
        setTestResult('❌ CORS Error: POST request blocked by browser');
        console.error('❌ CORS POST Error:', error);
      } else {
        setTestResult(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error('❌ Network Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border max-w-sm">
      <h3 className="font-semibold text-gray-800 mb-2">CORS Test</h3>
      
      <div className="space-y-2">
        <Button
          size="sm"
          variant="outline"
          onClick={testCors}
          disabled={isLoading}
          className="w-full"
        >
          Test GET Request
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={testPostRequest}
          disabled={isLoading}
          className="w-full"
        >
          Test POST Request
        </Button>
      </div>

      {testResult && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
          <div className={testResult.includes('✅') ? 'text-green-600' : testResult.includes('⚠️') ? 'text-yellow-600' : 'text-red-600'}>
            {testResult}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorsTest; 