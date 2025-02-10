import React from 'react';
import { customProps } from './types';

export default function Arrow({
  width = 14,
  height = 14,
  color = 'var(--ut-grey900)',
}: customProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 14 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.22319 15V3.32386L1.73455 7.8267L0.626598 6.73295L7.00444 0.369318L13.3681 6.73295L12.2885 7.8267L7.78569 3.32386V15H6.22319Z'
        fill={color}
      />
    </svg>
  );
}
