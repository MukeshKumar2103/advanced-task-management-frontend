import React from 'react';

interface EyeProps {
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: string;
  className?: string;
}

export default function EyeVisible({
  width,
  height,
  color,
  strokeWidth,
  className,
}: EyeProps) {
  return (
    <svg
      width={width ?? '18'}
      height={height ?? '18'}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M11.025 9.00039C11.025 10.1188 10.1184 11.0254 9 11.0254C7.88162 11.0254 6.975 10.1188 6.975 9.00039C6.975 7.88201 7.88162 6.97539 9 6.97539C10.1184 6.97539 11.025 7.88201 11.025 9.00039Z'
        stroke={color ?? '#898E99'}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.25 9.00039C3.33009 6.23467 5.85182 4.27539 9 4.27539C12.1482 4.27539 14.6699 6.23468 15.75 9.00039C14.6699 11.7661 12.1482 13.7254 9 13.7254C5.85182 13.7254 3.33009 11.7661 2.25 9.00039Z'
        stroke={color ?? '#898E99'}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
