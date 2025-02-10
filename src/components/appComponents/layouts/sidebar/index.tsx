import React from 'react';
import helpers from '@/helpers';
import Popover from '@/components/globalComponents/Popover';

const { cn } = helpers;

const isToggled = true;

export default function Sidebar() {
  return (
    <div
      className={cn(
        'relative h-full max-h-screen w-auto overflow-hidden border-r bg-white',
        isToggled ? 'w-full max-w-64' : 'w-14'
      )}
    >
      <div className='relative h-full w-full flex-1'>
        <div className='sticky h-12 w-full border-b pl-5'>
          <Popover
            trigger={['click']}
            content={<p>Header Header Header Header Header Header</p>}
            className=''
          >
            Header
          </Popover>
        </div>
        <div className='flex h-full max-h-[90%] w-full flex-1 flex-col gap-1 overflow-y-scroll px-2.5 py-5'>
          <div className={cn('h-full min-h-12 w-full flex-1')}>Sidebar 1</div>
          <div className='h-full max-h-14 min-h-6 w-full flex-1'></div>
        </div>
      </div>
      <div className='absolute bottom-0 flex h-full max-h-[8%] w-full items-center border-t bg-white'>
        bottom
      </div>
    </div>
  );
}
