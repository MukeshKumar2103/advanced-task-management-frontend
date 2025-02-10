'use client';

import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  MouseEventHandler,
} from 'react';
import { createPortal } from 'react-dom';

// helpers
import helpers from '@/helpers';
import custom from '@/assets/custom';

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactNode;
  content: ReactNode | null;
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'bottom_right'
    | 'bottom_left';
  arrow?: boolean;
  rootClassName?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const { DropDown } = custom;
const { cn } = helpers;

const defaultValue = 4;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content = null,
  position = 'bottom',
  arrow = true,
  rootClassName = '',
  className = '',
  onClick,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => setIsVisible(true);

  const handleMouseLeave = () => setIsVisible(false);

  // const calculatePosition = () => {
  //   if (targetRef.current && tooltipRef.current) {
  //     const targetRect = targetRef.current.getBoundingClientRect();
  //     const tooltipRect = tooltipRef.current.getBoundingClientRect();
  //     const offset = 6;

  //     const positionStyles: React.CSSProperties = {
  //       top:
  //         targetRect.top +
  //         (position === 'bottom'
  //           ? targetRect.height + offset
  //           : -tooltipRect.height - offset) +
  //         defaultValue,
  //       left:
  //         targetRect.left +
  //         targetRect.width / 2 -
  //         tooltipRect.width / 2 +
  //         defaultValue,
  //     };

  //     if (position === 'left' || position === 'right') {
  //       positionStyles.top =
  //         targetRect.top +
  //         targetRect.height / 2 -
  //         tooltipRect.height / 2 +
  //         defaultValue;
  //       positionStyles.left =
  //         (position === 'left'
  //           ? targetRect.left - tooltipRect.width - offset
  //           : targetRect.right + offset) + defaultValue;
  //     }

  //     setPositionStyle(positionStyles);
  //   }
  // };

  const calculatePosition = () => {
    if (targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const offset = 6;

      const positionStyles: React.CSSProperties = {
        top:
          targetRect.top +
          (position === 'bottom'
            ? targetRect.height + offset
            : position === 'bottom_right'
              ? targetRect.height + offset
              : position === 'bottom_left'
                ? targetRect.height + offset
                : -tooltipRect.height - offset),
        left:
          position === 'bottom_right'
            ? targetRect.right - tooltipRect.width
            : position === 'bottom_left'
              ? targetRect.left
              : targetRect.left +
                targetRect.width / 2 -
                tooltipRect.width / 2 +
                defaultValue,
      };

      if (position === 'left' || position === 'right') {
        positionStyles.top =
          targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        positionStyles.left =
          position === 'left'
            ? targetRect.left - tooltipRect.width - offset
            : targetRect.right + defaultValue;
      }

      setPositionStyle(positionStyles);
    }
  };

  useEffect(() => {
    if (isVisible) calculatePosition();
  }, [isVisible, position]);

  useEffect(() => {
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick?.(event);
  };

  const arrowPosition = {
    top: '-bottom-[1.1rem] left-1/2 -translate-x-1/2',
    bottom: '-top-[1.1rem] left-1/2 -translate-x-1/2 -rotate-180',
    bottom_right: '-top-[1.1rem] left-1/2 -translate-x-1/2 -rotate-180',
    bottom_left: '-top-[1.1rem] left-1/2 -translate-x-1/2 -rotate-180',
    left: '-right-[1.1rem] top-1/2 -translate-y-1/2',
    right: '-left-[1.1rem] top-1/2 -translate-y-1/2',
  };

  if (!content) return <>{children}</>;

  return (
    <div
      ref={targetRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative w-fit flex-1 cursor-pointer',
        rootClassName
      )}
      onClick={handleClick}
      {...props}
    >
      {children}

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'shadow-overlay-heavy absolute z-10 w-fit max-w-60 break-words rounded bg-[#2D3036] px-2 py-1.5 text-sm text-white',
              className
            )}
            style={positionStyle}
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

export default Tooltip;
