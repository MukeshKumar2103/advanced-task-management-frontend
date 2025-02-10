'use client';

import React, { useEffect, useRef, useState } from 'react';
import helpers from '@/helpers';

// Define types for the component's props
interface OtpInputProps {
  data?: string;
  length?: number;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  onOtpSubmit?: (otp: string) => void;
  className?: string;
  clearOtp?: boolean;
  toastError?: boolean;
}

// destructuring
const { cn } = helpers;

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onChange,
  disabled = false,
  onOtpSubmit = () => {},
  className,
  clearOtp,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  useEffect(() => {
    if (!disabled) setOtp(new Array(length).fill(''));
  }, [disabled, length]);

  useEffect(() => {
    if (clearOtp) {
      setOtp(new Array(length).fill(''));
    }
  }, [clearOtp, length]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length && onOtpSubmit) onOtpSubmit(combinedOtp);
    if (onChange) onChange(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='flex w-full items-center justify-between gap-4'>
      {otp.map((value, index) => {
        return (
          <React.Fragment key={index}>
            {!disabled ? (
              <input
                type='text'
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
                value={value}
                onChange={(e) => {
                  if (!disabled) handleChange(index, e);
                }}
                onClick={() => {
                  if (!disabled) handleClick(index);
                }}
                onKeyDown={(e) => {
                  if (!disabled) handleKeyDown(index, e);
                }}
                className={cn(
                  'flex h-12 w-[72px] items-center justify-center rounded-lg !border-[1px] border-solid text-center',
                  value
                    ? '!border-[var(--new-primary)]'
                    : '!border-[var(--BG-100)]',
                  className
                )}
              />
            ) : (
              <div
                className={cn(
                  'flex h-12 w-[72px] cursor-not-allowed items-center justify-center rounded-lg !border-[1px] border-solid !border-[var(--BG-50)] text-center',
                  className
                )}
              >
                <span className='font14px-400 text-[var(--font-400)] opacity-20'>
                  0
                </span>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OtpInput;
