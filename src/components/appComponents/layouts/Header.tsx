'use client';

import React, { useState } from 'react';
import helpers from '@/helpers';
import Tooltip from '@/components/globalComponents/Tooltip';
import Modal from '@/components/globalComponents/Modal';

const { cn } = helpers;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <div className={cn('min-h-12 w-full border-b bg-white px-5 py-1.5')}>
      {/* <Tooltip content='header'>Header</Tooltip> */}
      <div className='cursor-pointer' onClick={() => setIsOpen(true)}>
        <Tooltip content='header'>Head</Tooltip>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className=''>Header</div>
      </Modal>
    </div>
  );
}
