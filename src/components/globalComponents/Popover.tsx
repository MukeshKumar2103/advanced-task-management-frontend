'use client';

import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  MouseEventHandler,
} from 'react';
import { createPortal } from 'react-dom';

import helpers from '@/helpers';
import custom from '@/assets/custom';
import useOutsideClick from '@/hooks/useOutsideClick';

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  trigger?: 'hover' | 'click' | ['hover'] | ['click'] | ['hover', 'click'];
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom_right';
  arrow?: boolean;
  rootClassName?: string;
  className?: string;
  onOpenChange?: (value: boolean) => void;
}

const { cn } = helpers;
const { DropDown } = custom;

const Popover: React.FC<TooltipProps> = ({
  children,
  isOpen = false,
  content,
  trigger = 'hover',
  position = 'bottom',
  arrow = false,
  rootClassName = '',
  className = '',
  onOpenChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
    if (onOpenChange) onOpenChange(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
    if (onOpenChange) onOpenChange(false);
  };

  const childrenRef = useOutsideClick(handleMouseLeave);

  const calculatePosition = () => {
    if (elementRef.current && childrenRef.current) {
      const targetRect = elementRef.current.getBoundingClientRect();
      const childrenRect = childrenRef.current.getBoundingClientRect();
      const offset = 6;

      const positionStyles: React.CSSProperties = {
        top:
          targetRect.top +
          (position === 'bottom'
            ? targetRect.height + offset
            : position === 'bottom_right'
              ? targetRect.height + offset
              : -childrenRect.height - offset),
        left:
          position === 'bottom_right'
            ? targetRect.right - childrenRect.width
            : targetRect.left,
      };

      if (position === 'left' || position === 'right') {
        positionStyles.top =
          targetRect.top + targetRect.height / 2 - childrenRect.height / 2;
        positionStyles.left =
          position === 'left'
            ? targetRect.left - childrenRect.width - offset
            : targetRect.right + offset;
      }

      setPositionStyle(positionStyles);
    }
  };

  useEffect(() => {
    calculatePosition();
  }, [isVisible, position]);

  useEffect(() => {
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // onClick?.(event);
    handleMouseEnter();
  };

  const arrowPosition = {
    top: '-bottom-[0.9rem] left-1/2 -translate-x-1/2',
    bottom: '-top-[0.9rem] left-1/2 -translate-x-1/2 -rotate-180',
    left: '-right-[0.9rem] top-1/2 -translate-y-1/2',
    right: '-left-[0.9rem] top-1/2 -translate-y-1/2',
    bottom_right: '-top-[0.9rem] left-1/2 -translate-x-1/2 -rotate-180',
    bottom_left: '-top-[0.9rem] left-1/2 -translate-x-1/2 -rotate-180',
  };

  if (!content) return <>{children}</>;

  return (
    <div
      ref={elementRef}
      data-popover='true'
      onMouseEnter={() => {
        if (trigger === 'hover' || (trigger?.includes('hover') && !isOpen))
          handleMouseEnter();
      }}
      onMouseLeave={() => {
        if (trigger === 'hover' || (trigger?.includes('hover') && !isOpen))
          handleMouseLeave();
      }}
      className={cn('group relative w-fit cursor-pointer', rootClassName)}
      onClick={handleClick}
    >
      {children}

      {isVisible &&
        createPortal(
          <div
            ref={childrenRef}
            className={cn(
              'text-black-90 shadow-overlay-heavy absolute z-10 w-fit max-w-80 overflow-hidden break-words rounded bg-white text-sm',
              className
            )}
            style={positionStyle}
            data-popover-content='true'
            role='dialog'
          >
            <div className='relative'>
              {arrow && (
                <div className={cn('absolute', arrowPosition[position])}>
                  <DropDown width={20} height={20} color='#2D3036' />
                </div>
              )}
              <div className=''>{content}</div>
            </div>
          </div>,
          document.body as HTMLElement
        )}
    </div>
  );
};

export default Popover;
