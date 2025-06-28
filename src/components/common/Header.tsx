import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Phone } from 'lucide-react';
import { CLINIC_INFO, ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to={ROUTES.HOME} className="flex items-center space-x-3">
              <Logo size="md" animated={true} />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight">{CLINIC_INFO.NAME}</span>
                <span className="text-xs text-pink-600 font-medium">Beauty & Wellness</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-pink-600'
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.firstName}!
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none focus:text-pink-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-pink-600'
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <User size={16} />
                      <span>Welcome, {user?.firstName}!</span>
                    </div>
                    <Button variant="outline" fullWidth onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" fullWidth>
                        Sign In
                      </Button>
                    </Link>
                    <Link to={ROUTES.SIGNUP} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="primary" fullWidth>
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 