'use client';

import React, { FormEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import components from '@/components';
import helpers from '@/helpers';
import { signInApi } from '@/api/auth';

// types
interface userDetailsTypes {
  email: string;
  password: string;
  is_remember: boolean;
}

// destructuring
const { globalComponents } = components;

const { Input, InputPassword, CheckBox, Button, Divider } = globalComponents;
const { validations } = helpers;

export default function SignIn() {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<userDetailsTypes>({
    email: '',
    password: '',
    is_remember: true,
  });

  const onChange = ({ key, value }: { key: string; value: string | boolean }) =>
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));

  const allowToLogin = useCallback(() => {
    const isEmailValid = validations?.isEmailValid(userDetails?.email);
    const isPasswordValid = validations?.isPasswordValid(userDetails?.password);
    const isAggreedTermsandConditions = userDetails?.is_remember;

    return isEmailValid && isPasswordValid && isAggreedTermsandConditions;
  }, [userDetails]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: userDetails?.email,
      password: userDetails?.password,
    };

    try {
      const res = await signInApi({ payload });
      if (res?.status === 200) {
        const { authToken, user } = res?.data?.result?.[0];
        localStorage?.setItem('authToken', authToken);
        localStorage?.setItem('user', JSON.stringify(user));
        router.push(`/${user?.id}/home`);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <h3 className='mb-11 text-2xl font-medium'>Welcome back!</h3>
        <div className='flex flex-col gap-5'>
          <Input
            name='email'
            type='email'
            label='Email address'
            value={userDetails?.email}
            onInputChange={(value: string) => {
              onChange({ key: 'email', value });
            }}
          />
          <InputPassword
            name='password'
            label='Password'
            value={userDetails?.password}
            onInputChange={(value: string) => {
              onChange({ key: 'password', value });
            }}
          />
        </div>

        <div className='flex items-center gap-2.5 pb-14 pt-5'>
          <CheckBox
            className='h-3 w-3'
            value={userDetails?.is_remember}
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
            varient='primary'
            type='submit'
            className=''
            disabled={!allowToLogin()}
          >
            Login
          </Button>
        </div>
      </form>

      <Divider label='Or' />

      <div className='flex items-center justify-center gap-2.5 text-sm font-medium'>
        Don’t have an account?{' '}
        <Link href={'/auth/sign-up'} className='text-[#0F3DDE]'>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
