'use client';

import React, { FormEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// api
import { signUpApi } from '@/api/auth';

import components from '@/components';
import helpers from '@/helpers';

// types
interface userDetailsTypes {
  first_name: string;
  last_name: string;
  email: string;
  is_aggreed: boolean;
}

// destructuring
const { Input, CheckBox, Button, Divider } = components;
const { validations } = helpers;

export default function SignUp() {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<userDetailsTypes>({
    first_name: '',
    last_name: '',
    email: '',
    is_aggreed: true,
  });

  const onChange = ({ key, value }: { key: string; value: string | boolean }) =>
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));

  const allowToSignup = useCallback(() => {
    const isFirstNameValid = userDetails?.first_name?.length > 0;
    const isLastNameValid = userDetails?.last_name?.length > 0;
    const isEmailValid = validations?.isEmailValid(userDetails?.email);
    const isAggreedTermsandConditions = userDetails?.is_aggreed;

    return (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isAggreedTermsandConditions
    );
  }, [userDetails]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: userDetails?.email,
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
    };

    try {
      const res = await signUpApi({ payload });
      if (res?.status === 200) {
        localStorage?.setItem('authToken', res?.data?.result?.[0]?.authToken);
        router.push('/auth/verify-email');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <h3 className='text-2xl font-medium'>Welcome back!</h3>
        <p className='text-base font-medium'>
          Enter your Credentials to access your account
        </p>
        <div className='flex flex-col gap-5 pt-11'>
          <Input
            name='first_name'
            label='First Name'
            value={userDetails?.first_name}
            onInputChange={(value: string) => {
              onChange({ key: 'first_name', value });
            }}
          />
          <Input
            name='last_name'
            label='Last Name'
            value={userDetails?.last_name}
            onInputChange={(value: string) => {
              onChange({ key: 'last_name', value });
            }}
          />
          <Input
            name='email'
            type='email'
            label='Email address'
            value={userDetails?.email}
            onInputChange={(value: string) => {
              onChange({ key: 'email', value });
            }}
          />
        </div>

        <div className='flex items-center gap-2.5 pb-14 pt-5'>
          <CheckBox
            className='h-3 w-3'
            value={userDetails?.is_aggreed}
            onChange={(value) => onChange({ key: 'is_aggreed', value })}
          />
          <p className='flex items-center gap-1.5 text-xs font-medium'>
            I agree to the
            <Link href={''} className='underline'>
              terms & policy
            </Link>
          </p>
        </div>

        <div className=''>
          <Button
            type='submit'
            varient='primary'
            className='h-8 w-full'
            disabled={!allowToSignup()}
          >
            Signup
          </Button>
        </div>
      </form>

      <Divider label='Or' />

      <div className='flex items-center justify-center gap-2.5 text-sm font-medium'>
        Have an account?{' '}
        <Link href={'/sign-in'} className='text-[#0F3DDE]'>
          Sign In
        </Link>
      </div>
    </div>
  );
}
