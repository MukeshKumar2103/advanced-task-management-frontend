import custom from '@/assets/custom';
import globalComponents from '@/components/globalComponents';
import Divider from '@/components/globalComponents/Divider';

const { HoverContainer, Popover } = globalComponents;
const { Chevron } = custom;

export default function UserProfile() {
  const content = (
    <div className='h-full max-h-[calc(100vh-3.5rem)] text-sm w-60 py-2'>
      <div className='flex h-auto w-full items-center gap-3 px-4 py-2'>
        <div className='flex size-8 items-center justify-center rounded-full bg-[var(--ut-purple900)] text-sm font-bold text-white'>
          <p>MK</p>
        </div>
        <div>
          <h6 className='text-sm font-medium'>Mukesh Kumar</h6>
          <p className='text-xs font-normal text-[var(--ut-grey900)]'>Online</p>
        </div>
      </div>

      <div className='flex flex-col gap-1.5 px-2 py-1 text-sm font-normal'>
        <HoverContainer
          varient='default'
          rootClassName='h-8 w-full rounded-md border border-[var(--ut-grey400)] px-1.5 text-[var(--ut-grey800)]'
        >
          Set status
        </HoverContainer>

        <HoverContainer
          varient='default'
          className='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          <div className='5 flex items-center gap-2'>
            <p className='text-start'>Mute Notifications</p>
          </div>
          <Chevron width={10} height={10} className='-rotate-180' />
        </HoverContainer>
      </div>

      <Divider className='my-2' />

      <div className='flex flex-col px-2 text-sm font-normal'>
        <HoverContainer
          varient='default'
          PrefixIcon={Chevron}
          SuffixIcon={Chevron}
          prefixClassName={'size-3 flex items-center justify-center'}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Profile
        </HoverContainer>

        <HoverContainer
          varient='default'
          PrefixIcon={Chevron}
          SuffixIcon={Chevron}
          prefixClassName={'size-3 flex items-center justify-center'}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Themes
        </HoverContainer>

        <HoverContainer
          PrefixIcon={Chevron}
          SuffixIcon={Chevron}
          prefixClassName={'size-3 flex items-center justify-center'}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Settings
        </HoverContainer>

        <HoverContainer
          varient='default'
          PrefixIcon={Chevron}
          SuffixIcon={Chevron}
          prefixClassName={'size-3 flex items-center justify-center'}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Notification settings
        </HoverContainer>
      </div>

      <Divider className='my-2' />

      <div className='flex flex-col px-2 text-sm font-normal'>
        <HoverContainer
          varient='default'
          SuffixIcon={Chevron}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Keyboard shortcuts
        </HoverContainer>

        <HoverContainer
          varient='default'
          SuffixIcon={Chevron}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Download apps
        </HoverContainer>

        {/* <HoverContainer
          varient='default'
          SuffixIcon={Chevron}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Referrals
        </HoverContainer>

        <HoverContainer
          varient='default'
          SuffixIcon={Chevron}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Help
        </HoverContainer> */}
      </div>

      <Divider className='my-2' />

      <div className='flex flex-col px-2 text-sm font-normal'>
        <HoverContainer
          varient='default'
          SuffixIcon={Chevron}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Trash
        </HoverContainer>
        <HoverContainer
          varient='default'
          SuffixIcon={Chevron}
          suffixClassName={'size-2.5 -rotate-180'}
          rootClassName='flex h-8 w-full items-center justify-between rounded-md px-1.5 text-sm font-normal'
        >
          Logout
        </HoverContainer>
      </div>
    </div>
  );

  return (
    <Popover
      trigger={['click']}
      position='bottom_right'
      content={content}
      className=''
    >
      <HoverContainer
        varient='glass'
        rootClassName='w-auto rounded-full px-2 py-1'
      >
        <div className='flex items-center gap-1'>
          <p className='p-0.5'>M</p>
          <Chevron
            width={8}
            height={8}
            className='-rotate-90'
            color='var(--ut-white-80)'
          />
        </div>
      </HoverContainer>
    </Popover>
  );
}
