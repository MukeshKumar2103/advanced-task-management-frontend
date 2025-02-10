import React from 'react';
import { customProps } from './types';

const Calendar: React.FC<customProps> = ({
  width = 20,
  height = 20,
  strokeWidth = '1.67',
  color = 'var(--ut-grey900)',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 1.66602V3.33268M5 1.66602V3.33268'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.99365 10.833H10.0011M9.99365 14.1663H10.0011M13.3232 10.833H13.3307M6.66406 10.833H6.67154M6.66406 14.1663H6.67154'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.91406 6.66602H17.0807'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.08203 10.2027C2.08203 6.57162 2.08203 4.75607 3.12546 3.62803C4.1689 2.5 5.84827 2.5 9.20703 2.5H10.7904C14.1491 2.5 15.8285 2.5 16.8719 3.62803C17.9154 4.75607 17.9154 6.57162 17.9154 10.2027V10.6307C17.9154 14.2617 17.9154 16.0773 16.8719 17.2053C15.8285 18.3333 14.1491 18.3333 10.7904 18.3333H9.20703C5.84827 18.3333 4.1689 18.3333 3.12546 17.2053C2.08203 16.0773 2.08203 14.2617 2.08203 10.6307V10.2027Z'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.5 6.66602H17.5'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Calendar;
