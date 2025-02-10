'use client';

import { verifyEmail } from '@/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a specific query parameter
  const token = searchParams.get('token');

  const [isVerifing, setIsVerifing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const parsedToken = token?.replaceAll(' ', '+');
    const verifyEmailToken = async (token: string) => {
      console.log('token', token);
      try {
        const payload = { token };
        const res = await verifyEmail({ payload });

        if (res?.status === 200) {
          router.push('/auth/sign-in');
        } else {
          setIsVerifing(false);
          setIsError(true);
        }
      } catch (error) {
        console.warn(error);
      }
    };
    if (parsedToken) verifyEmailToken(parsedToken);
  }, [token]);

  // const verifyEmailToken = async (token: string) => {
  //   console.log('token', token);
  //   try {
  //     const payload = { token };
  //     const res = await verifyEmail({ payload });

  //     if (res?.status === 200) {
  //       router.push('/auth/sign-in');
  //     } else {
  //       setIsVerifing(false);
  //       setIsError(true);
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  if (isVerifing) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
}
