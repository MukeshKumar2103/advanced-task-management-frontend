import React from 'react';
import Tab from './Tab';

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  varient?: 'primary' | 'secondary' | 'default';
  children: React.ReactNode;
  accessKey?: string;
  PrefixIcon?: React.ElementType;
  SuffixIcon?: React.ElementType;
  containerClassName?: string;
  rootClassName?: string;
  className?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  underline?: {
    isShow?: boolean;
    varient?: 'primary' | 'default';
    className?: string;
  };
  isSelected?: boolean;
  isDisabled?: boolean;
}

type TabsProps = {
  tabs: TabProps[];
  allowdTabs?: string[];
  containerClassName?: string;
  varient?: 'primary' | 'secondary' | 'default';
  selected: TabProps;
  rootClassName?: string;
  className?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  underline?: {
    isShow?: boolean;
    varient?: 'primary' | 'default';
    className?: string;
  };
  onTabChange?: (value: TabProps) => void;
};

export default function Tabs({
  tabs,
  varient,
  selected,
  containerClassName,
  rootClassName,
  className,
  prefixClassName,
  suffixClassName,
  underline,
  onTabChange,
}: TabsProps) {
  return (
    <div className='w-full h-full flex items-center gap-6'>
      {tabs?.map((tab: TabProps) => {
        return (
          <Tab
            key={tab?.accessKey}
            varient={varient}
            containerClassName={containerClassName}
            rootClassName={rootClassName}
            className={className}
            prefixClassName={prefixClassName}
            suffixClassName={suffixClassName}
            underline={underline}
            {...tab}
            onClick={(event) => onTabChange && onTabChange(tab)}
          />
        );
      })}
    </div>
  );
}
