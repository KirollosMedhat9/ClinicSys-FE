import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      placeholder,
      type = 'text',
      value,
      onChange,
      onBlur,
      error,
      disabled = false,
      required = false,
      fullWidth = false,
      className = '',
      leftIcon,
      rightIcon,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'block w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
    
    const stateClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500';

    const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white';
    const widthClass = fullWidth ? 'w-full' : '';
    const paddingClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    const inputClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${widthClass} ${paddingClasses} ${className}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">{leftIcon}</div>
            </div>
          )}
          <motion.input
            ref={ref}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={inputClasses}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">{rightIcon}</div>
            </div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 