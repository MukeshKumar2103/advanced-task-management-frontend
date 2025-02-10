import React from 'react';
import cmd from '@/assets/icons/keys/letter-a.svg';
import Image from 'next/image';
import cn from '@/helpers/cn';

export default function KeysContainer({
  keys,
  background = true,
  color,
  className,
}: {
  keys: string[];
  background?: boolean;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-md p-1',
        background ? 'bg-[var(--ut-grey500)]' : '',
        className
      )}
    >
      <Image src={cmd} alt='cmd' className='size-3' />
    </div>
  );
}
