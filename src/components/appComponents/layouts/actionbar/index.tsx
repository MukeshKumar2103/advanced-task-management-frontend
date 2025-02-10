'use client';

import { useEffect, useRef } from 'react';

import custom from '@/assets/custom';
import globalComponents from '@/components/globalComponents';
import hooks from '@/hooks';

import ActionBarSearch from './ActionBarSearch';
import UserProfile from './UserProfile';
import CreateNewModal from '@/components/globalComponents/createNew';

const { Calendar } = custom;
const { HoverContainer, Modal } = globalComponents;
const { useToggle, useKeyBind } = hooks;

export default function ActionBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useToggle(false);

  const { registerShortcut, disableShortcuts, destroyShortcuts } = useKeyBind();

  useEffect(() => {
    registerShortcut('Meta+K', () => {
      inputRef?.current?.focus();
    });

    registerShortcut('T', () => {
      if (!isNewModalOpen) setIsNewModalOpen(true);
    });

    registerShortcut('Escape', () => {
      if (inputRef.current) {
        inputRef?.current?.blur();
      }
    });

    // return () => {
    //   disableShortcuts();
    //   destroyShortcuts();
    // };
  }, [
    registerShortcut,
    disableShortcuts,
    destroyShortcuts,
    isNewModalOpen,
    setIsNewModalOpen,
  ]);

  const onCloseModal = () => setIsNewModalOpen(false);

  return (
    <div
      className='flex w-full items-center justify-between bg-[var(--ut-global-actions-bar-background)] px-2 text-[var(--ut-white)]'
      style={{}}
    >
      <div className={'flex flex-1 items-center justify-between'}>
        <div className=''>Logo</div>
        <HoverContainer
          rootClassName='size-7 p-1 justify-center'
          varient='glass'
        >
          <Calendar width={16} height={16} color='var(--ut-white-60)' />
        </HoverContainer>
      </div>
      <ActionBarSearch />
      <div className={'flex flex-1 items-center gap-2.5 justify-end'}>
        <HoverContainer
          varient='glass'
          rootClassName='px-2 py-0.5 text-[var(--white-20)] bg-transparent'
          onClick={(event) => setIsNewModalOpen(true)}
        >
          New
        </HoverContainer>
        <div className={'flex items-center justify-end'}>
          <UserProfile />
        </div>
      </div>

      <Modal
        isOpen={isNewModalOpen}
        onClose={onCloseModal}
        containerClassName='max-w-[640px] w-full flex-1 rounded-t-xl'
      >
        <CreateNewModal />
      </Modal>
    </div>
  );
}
