import React from 'react';

interface DropDownProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  width = 24,
  height = 24,
  color = 'var(--ut-grey900)',
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 10L12 16L18 10H6Z'
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default DropDown;
