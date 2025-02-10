import Image from 'next/image';
import Images from '@/assets/images';

export default function RootAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { AuthBg } = Images;

  return (
    <div className='flex h-screen w-full items-center'>
      <div className='flex h-full w-1/2 items-center justify-center'>
        <div className='w-[25.25rem]'>{children}</div>
      </div>
      <div className='h-screen w-1/2 overflow-hidden rounded-l-3xl border-2 border-[#000000] shadow-[0px_4px_4px_0px_000000]'>
        <Image
          src={AuthBg}
          alt='auth_bg'
          className='h-full w-full object-cover'
        />
      </div>
    </div>
  );
}
