import React from 'react';

import helpers from '@/helpers';

const { cn } = helpers;

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'varient'> {
  varient?: 'primary' | 'secondary' | 'default';
  className?: string;
  trigger?: 'hover' | 'click';
}

const Button: React.FC<ButtonProps> = ({
  varient = 'default',
  className = '',
  trigger = 'hover',
  ...props
}) => {
  const btnStyles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-black',
    default: 'bg-white text-black border border-gray-300',
    disabled: 'cursor-not-allowed bg-gray-200 text-gray-600',
  };

  const buttonStyle = btnStyles[varient] || btnStyles.default;

  return (
    <button
      className={cn(
        'h-12 w-full rounded-md text-sm font-bold transition-all duration-150 ease-linear',
        props?.disabled ? btnStyles['disabled'] : buttonStyle,
        props?.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        trigger === 'hover' ? '' : '',
        className
      )}
      {...props}
    />
  );
};

export default Button;
