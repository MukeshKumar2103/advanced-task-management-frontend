import React from 'react';

import helpers from '@/helpers';

const { cn } = helpers;

interface HoverContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'varient'> {
  varient?: 'primary' | 'secondary' | 'default' | 'glass';
  children?: React.ReactNode;
  PrefixIcon?: React.ElementType;
  SuffixIcon?: React.ElementType;
  rootClassName?: string;
  className?: string;
  prefixClassName?: string;
  suffixClassName?: string;
}

export default function HoverContainer({
  varient = 'default',
  children,
  PrefixIcon,
  SuffixIcon,
  rootClassName = '',
  className = '',
  prefixClassName,
  suffixClassName,
  ...props
}: HoverContainerProps) {
  const styles = {
    primary: '',
    secondary: '',
    default: 'hover:bg-[var(--ut-grey200)] rounded-[var(--ut-radii-3)]',
    glass: 'bg-[var(--ut-white-16)] hover:bg-[var(--ut-white-20)]',
  };

  return (
    <div
      className={cn(
        'flex h-auto w-auto cursor-pointer items-center rounded-md overflow-hidden text-sm text-[#2a2e34] transition-all duration-150 ease-linear',
        SuffixIcon ? 'justify-between pr-2' : 'justify-center',
        styles[varient],
        rootClassName
      )}
      {...props}
    >
      <div className='flex w-full items-center gap-2'>
        {PrefixIcon && <PrefixIcon className={prefixClassName} />}
        <div className={cn('flex w-full flex-1', className)}>{children}</div>
      </div>
      {SuffixIcon && <SuffixIcon className={suffixClassName} />}
    </div>
  );
}
