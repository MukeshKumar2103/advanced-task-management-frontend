'use client';

import { useEffect } from 'react';

import globalComponents from '@/components/globalComponents';
import hooks from '@/hooks';
import useKeyBind from '@/hooks/useKeyBind';
import HoverContainer from '@/components/globalComponents/HoverContainer';
import Tooltip from '@/components/globalComponents/Tooltip';
import KeysContainer from '@/components/globalComponents/KeysContainer';

const { Modal } = globalComponents;
const { useToggle } = hooks;

export default function ActionBarSearch() {
  const { registerShortcut, disableShortcuts, destroyShortcuts } = useKeyBind();
  const [isOpen, setIsOpen] = useToggle(false);

  useEffect(() => {
    registerShortcut('Control+S', () => {
      console.log('Ctrl+S pressed');
    });
    registerShortcut('Meta+K', () => {
      console.log('Cmd+Shift+K pressed');
    });

    registerShortcut('Escape', () => {
      console.log('Cmd+Shift+K pressed');
    });

    return () => {
      disableShortcuts();
      destroyShortcuts();
    };
  }, [registerShortcut, disableShortcuts, destroyShortcuts]);

  const onClose = () => {
    console.log('clicked');
    setIsOpen(false);
  };
  const onOpen = () => setIsOpen(true);

  const tooltipContent = (
    <div className='flex items-center gap-5'>
      <p className=''>Open Search</p>
      <KeysContainer keys={['Command']} background={true} />
    </div>
  );

  return (
    <HoverContainer
      varient='glass'
      rootClassName={'ml-1.5 flex w-[27%] items-center'}
    >
      <Tooltip
        content={tooltipContent}
        rootClassName='w-full'
        className='w-fit'
        onClick={onOpen}
      >
        <div className='flex flex-1 cursor-pointer items-center !justify-start rounded-md px-2 py-1'>
          <p className='text-[var(--ut-white-60)]'>Search...</p>
        </div>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        rootClassName='bg-transparent backdrop-blur-none'
        showClose={false}
      >
        <div className='wax-w-[800px] w-96 flex-1'>hi</div>
      </Modal>
    </HoverContainer>
  );
}
