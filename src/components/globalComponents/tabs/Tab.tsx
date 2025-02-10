import React, { useCallback } from 'react';
import helpers from '@/helpers';

import { TabProps } from './index';

const { cn } = helpers;

export default function Tab({
  id,
  varient = 'default',
  accessKey,
  children,
  PrefixIcon,
  SuffixIcon,
  containerClassName = '',
  rootClassName = '',
  className = '',
  prefixClassName,
  suffixClassName,
  underline,
  isSelected,
  isDisabled,
  ...props
}: TabProps) {
  const styles = {
    primary: 'px-2 py-1 hover:bg-[var(--ut-grey200)]',
    secondary: '',
    default:
      'px-2 py-1 hover:bg-[var(--ut-grey200)] text-[var(--ut-content-tertiary)]',
  };

  const underlineStyle =
    'before:absolute before:contents-[""] before:-bottom-[4px] before:h-0.5 before:bg-[var(--ut-grey600)]';

  const showUnderline = useCallback(() => {
    return varient !== 'default'
      ? underline?.varient === 'default' && (isSelected || underline?.isShow)
      : isSelected || underline?.isShow;
  }, [underline?.varient, varient]);

  const underlineStyles = {
    primary: cn(
      'border-b-2 border-transparent',
      isSelected ? underline?.className : 'hover:!border-[var(--ut-grey600)]'
    ),
    secondary: '',
    default: '',
  };

  // const underlineStyles = {
  //   primary: cn(
  //     'before:w-full before:h-0.5 before:bg-transparent before:absolute before:-bottom-[1px]',
  //     isSelected ? underline?.className : 'hover:!border-[var(--ut-grey600)]'
  //   ),
  //   secondary: '',
  //   default: '',
  // };

  return (
    <div
      key={id}
      className={cn(
        'relative w-auto h-full flex items-center gap-2.5',
        // varient !== 'default' && (isSelected || underline?.isShow)
        //   ? 'border-b-2 border-[var(--ut-grey200)]'
        //   : 'border-b-2',
        underline?.varient && underlineStyles[underline?.varient],
        // underline?.className,
        containerClassName
      )}
    >
      <div
        className={cn(
          'flex h-auto w-fit cursor-pointer items-center overflow-hidden font-sm rounded-[var(--ut-radii-3)] transition-all duration-150 ease-linear',
          SuffixIcon ? 'justify-between' : 'justify-center',
          styles[varient],
          // underline?.varient && underlineStyles[underline?.varient],
          rootClassName
        )}
        {...props}
      >
        <div className='flex w-full items-center gap-2'>
          {PrefixIcon && <PrefixIcon className={prefixClassName} />}
          <div className={cn('flex w-full flex-1', className)}>{children}</div>
        </div>
        {SuffixIcon && <SuffixIcon className={suffixClassName} />}
      </div>
    </div>
  );
}
