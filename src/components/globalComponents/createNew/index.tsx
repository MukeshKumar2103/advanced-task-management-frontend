'use client';

import React, { useState } from 'react';
import helpers from '@/helpers';
import Tabs, { TabProps } from '../tabs';
import globalComponents from '@/constants/globalComponents';
import hooks from '@/hooks';
import CreateTask from './CreateTask';

const { tabs } = globalComponents;
const { tabList } = tabs;

const { cn } = helpers;
const { useArray } = hooks;

interface CreateNewModalProps {
  allowedTabs?: string[];
}

export default function CreateNewModal({ allowedTabs }: CreateNewModalProps) {
  const {
    datas: tabs,
    setDatas: setTabs,
    selectedData: selectedTab,
    updateDatas: updateTabs,
  } = useArray({ initial: tabList, selected: tabList?.[0] });

  const onTabChange = (value: TabProps) => {
    console.log('value', value);
    updateTabs({ id: value?.id, key: 'isSelected', value: true });
  };

  return (
    <div className={cn('w-full overflow-hidden')}>
      <div className='relative w-full h-11 px-6 border-b border-[var(--ut-grey300)]'>
        <Tabs
          tabs={tabs}
          varient='secondary'
          rootClassName='h-[42px]'
          selected={selectedTab}
          underline={{
            varient: 'primary',
            className: 'border-[var(--ut-background-primary)]',
          }}
          onTabChange={onTabChange}
        />
      </div>
      <div className='w-full min-h-40 px-6 py-5'>
        {selectedTab?.accessKey === 'task' && <CreateTask />}
      </div>
    </div>
  );
}
