import React from 'react';

// helpers
import helpers from '@/helpers';

interface CheckBoxProps {
  className?: string;
  data?: any;
  value: boolean;
  onChange: (value: boolean | any) => void;
  intermediate?: boolean;
  disabled?: boolean;
  width?: string; // Dynamic width (default: 'w-4')
  height?: string; // Dynamic height (default: 'h-4')
}

const { cn } = helpers;

export default function CheckBox({
  className = '',
  data,
  value,
  onChange,
  intermediate,
  disabled,
  width = 'w-4', // Default width set to 'w-4'
  height = 'h-4', // Default height set to 'h-4'
}: CheckBoxProps) {
  return (
    <label
      className={cn(
        `${width} ${height} custom-checkbox relative flex items-center justify-center`,
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
      style={{ display: 'inline-block', position: 'relative' }} // Optional inline styling
    >
      <input
        type='checkbox'
        name='checkbox'
        checked={value}
        className={cn(
          'absolute',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          intermediate ? '!border-[var(--new-primary)]' : ''
        )}
        onChange={(e) => {
          if (data) onChange(data);
          else onChange(e.target.checked);
        }}
        disabled={disabled}
      />
      {intermediate && (
        <div className="contents-[''] z-[1] w-1/2 border border-[var(--new-primary)]"></div>
      )}
    </label>
  );
}

const styles = `
  .custom-checkbox input[type='checkbox'] {
    @apply appearance-none bg-white m-0 font-inherit w-[90%] h-[90%] text-current border-[1.8px] border-[#D1D3D8] grid place-content-center;
  }

  .custom-checkbox input[type='checkbox'].squre {
    @apply rounded-[3px]; /* Custom square border-radius */
  }

  .custom-checkbox input[type='checkbox']::before {
    @apply content-[''] block w-[7px] h-[7px] scale-0 transition-transform duration-120 ease-in-out shadow-[inset_0.5em_0.5em_white] origin-[bottom_left];
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  .custom-checkbox input[type='checkbox']:checked::before {
    @apply scale-100;
  }

  .custom-checkbox input[type='checkbox']:checked {
    @apply bg-[var(--new-primary)] border-none;
  }

  .custom-checkbox input[type='checkbox']:disabled {
    @apply cursor-not-allowed opacity-50;
  }
`;

if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}
