'use client';
import React, { useEffect, useRef } from 'react';
import helpers from '@/helpers';

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  value?: string;
  limit?: number | null;
  name?: string | undefined;
  label?: string;
  placeholder?: string | null;
  onInputChange?: (value: string) => void;
  disabled?: boolean;
  rootClassName?: string;
  containerClassName?: string;
  className?: string;
  autoFocus?: boolean;
}

const { cn } = helpers;

const Input: React.FC<InputProps> = ({
  type = 'text',
  value = '',
  limit = null,
  name = undefined,
  label = null,
  placeholder = null,
  autoFocus = false,
  onInputChange,
  disabled,
  rootClassName,
  containerClassName,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={cn('w-full', rootClassName)}>
      {label && (
        <label className='text-sm font-medium text-textPrimary'>{label}</label>
      )}
      <div
        className={cn(
          'flex h-12 w-full flex-1 items-center gap-2.5 rounded-md border border-border px-2.5 transition-all duration-150 ease-linear focus-within:border-primary',
          rootClassName
        )}
      >
        <input
          type={type}
          value={value}
          placeholder={placeholder ?? 'Enter text'}
          name={name}
          className={cn(
            `h-9 w-full flex-1 bg-transparent text-sm font-medium text-textPrimary outline-none`,
            className
          )}
          maxLength={limit ?? undefined}
          onChange={(e) => {
            if (onInputChange) {
              onInputChange(e.target.value);
            }
          }}
          disabled={disabled}
          ref={inputRef}
          autoFocus={autoFocus}
        />
        {limit && (
          <p className='text-sm font-medium text-textPrimary'>
            {value?.length || 0}/{limit}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
