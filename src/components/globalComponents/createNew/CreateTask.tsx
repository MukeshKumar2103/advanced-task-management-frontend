'use client';

import React, { useState } from 'react';
import Popover from '../Popover';
import Searchbar from '../Searchbar';
import Divider from '../Divider';

export default function CreateTask() {
  const [searchKey, setSearchKey] = useState('');

  const onSearchChange = (value: string) => setSearchKey(value);

  const listContent = (
    <div className=''>
      <div className='px-2 pt-2 hover:shadow-[var(--ut-shadow-effect)]'>
        <Searchbar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          onChange={onSearchChange}
        />
      </div>
      <Divider className='my-2' />
      <div className='px-2'>
        <h5 className='w-full h-8 text-xs font-medium text-[var(--ut-content-tertiary)]'>
          Recents
        </h5>
      </div>
    </div>
  );

  return (
    <div>
      <div className='flex items-center gap-5'>
        <Popover trigger={['click']} content={listContent}>
          List
        </Popover>
        <Popover trigger={['click']} content={listContent}>
          List
        </Popover>
      </div>
    </div>
  );
}
