'use client';

import { MouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import helpers from '@/helpers';

const { cn } = helpers;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  rootClassName?: string;
  containerClassName?: string;
  className?: string;
  showClose?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  showClose = true,
  className,
  rootClassName,
  containerClassName,
}: ModalProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;

      // Check if click is on popover or its children
      const isPopoverClick = target.closest(
        '[role="dialog"], [data-popper-root], .popover-content'
      );

      if (
        elementRef.current &&
        !elementRef.current.contains(target) &&
        !isPopoverClick
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn(
        'absolute left-0 top-0 h-screen w-screen bg-black/20',
        rootClassName
      )}
    >
      <div
        ref={elementRef}
        onClick={stopPropagation} // Add this line
        className={cn(
          'shadow-overlay-heavy absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md bg-white',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
