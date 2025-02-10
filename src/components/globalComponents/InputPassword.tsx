'use client';
import React, { useEffect, useRef, useState } from 'react';
import helpers from '@/helpers';
import Icons from '@/assets/icons';

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  value?: string;
  limit?: number | null;
  name: string | undefined;
  label?: string;
  placeholder?: string | null;
  onInputChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const { EyeVisible } = Icons;
const { cn } = helpers;

const InputPassword: React.FC<InputProps> = ({
  value = '',
  name = undefined,
  label = null,
  placeholder = null,
  onInputChange,
  disabled,
  className,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className=''>
      {label && (
        <label className='text-sm font-medium text-textPrimary'>{label}</label>
      )}
      <div
        className={cn(
          'flex h-12 w-full flex-1 items-center rounded-md border border-border focus-within:border-primary'
        )}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          placeholder={placeholder ?? 'Enter text'}
          name={name}
          className={cn(
            `ml-2.5 h-9 w-full flex-1 border-r border-border bg-transparent text-sm font-medium text-textPrimary outline-none`,
            className
          )}
          onChange={(e) => {
            if (onInputChange) {
              onInputChange(e.target.value);
            }
          }}
          ref={inputRef}
          autoFocus={autoFocus}
          disabled={disabled}
        />
        <div
          className={cn(
            'mx-1 flex h-9 w-10 cursor-pointer items-center justify-center rounded transition-all duration-150 ease-linear'
          )}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          <EyeVisible
            width='20'
            height='20'
            color=''
            className={cn(
              'transition-all duration-150 ease-linear',
              showPassword ? 'stroke-primary' : 'stroke-textPrimary'
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
