'use client';

import Image from 'next/image';
import Images from '@/assets/images';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const { Auth } = Images;

const { AuthImage } = Auth;

export default function RootAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    console.log('authToken', userData, authToken);

    if (!['/auth/sign-up', '/auth/verify-email']?.includes(pathname))
      if (!authToken) {
        navigateToAuth();
        return;
      }

    if (userData) {
      const user = JSON.parse(userData);

      console.log('authToken', user, authToken);

      if (!user?.id) {
        navigateToAuth();
        return;
      }

      navigateToHome(user?.id);
    }
  }, [pathname]);

  const navigateToAuth = () => router.push('/auth/sign-in');

  const navigateToHome = (id: string | number) => router.push(`/${id}/home`);

  return (
    <div className='flex h-full min-h-screen w-full flex-col-reverse items-center justify-center bg-primaryLight p-2.5 xl:!flex-row xl:bg-transparent xl:p-0'>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='w-full max-w-96'>{children}</div>
      </div>
      <div className='hidden h-screen w-full xl:block'>
        <div className='h-full w-full rounded-l-3xl p-4'>
          <Image
            src={AuthImage}
            alt='auth_bg'
            className='h-full w-full rounded-3xl object-fill'
          />
        </div>
      </div>
    </div>
  );
}
