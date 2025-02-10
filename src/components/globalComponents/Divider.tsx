import React from 'react';

import helpers from '@/helpers';

const { cn } = helpers;

type DividerProps = { label?: string; className?: string };

const Divider = ({ label, className }: DividerProps) => {
  return (
    <div
      className={cn('my-11 flex h-auto w-full items-center gap-2', className)}
    >
      <span className='contents-[""] h-0.5 w-full bg-[#F5F5F5]' />
      {label && <p className='h-full w-auto text-sm font-medium'>{label}</p>}
      <span className='contents-[""] h-0.5 w-full bg-[#F5F5F5]' />
    </div>
  );
};

export default Divider;
