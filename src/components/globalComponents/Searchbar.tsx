import React, { ChangeEvent } from 'react';
import helpers from '@/helpers';

const { cn } = helpers;

interface SearchbarProps {
  searchKey?: string;
  setSearchKey?: (key: string) => void;
  onChange?: (value: string) => void;
  //   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Searchbar({
  searchKey,
  setSearchKey,
  onChange,
}: SearchbarProps) {
  return (
    <div
      className={cn(
        'flex h-8 w-full flex-1 items-center gap-2.5 rounded-md border border-border px-2.5 transition-all duration-150 ease-linear focus-within:border-primary'
      )}
    >
      <input
        placeholder='Search...'
        className='text-sm font-medium text-textPrimary outline-none'
        autoFocus
        value={searchKey}
        onChange={(event) => {
          onChange?.(event.target.value);
        }}
      />
    </div>
  );
}
