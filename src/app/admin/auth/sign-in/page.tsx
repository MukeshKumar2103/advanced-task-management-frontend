'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import components from '@/components';
import helpers from '@/helpers';

// types
interface userDetailsTypes {
  email: string;
  password: string;
  is_remember: boolean;
}

// destructuring
const { Input, CheckBox, Button, Divider } = components;
const { validations } = helpers;

export default function SignIn() {
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
    const isPasswordValid = userDetails?.password?.length > 0;
    const isAggreedTermsandConditions = userDetails?.is_remember;

    return isEmailValid && isPasswordValid && isAggreedTermsandConditions;
  }, [userDetails]);

  return (
    <div className=''>
      <form>
        <h3 className='mb-11 text-2xl font-medium'>Get Started Now</h3>
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
          <Input
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
            className='h-8 w-full'
            disabled={allowToLogin()}
          >
            Login
          </Button>
        </div>
      </form>

      <Divider label='Or' />

      <div className='flex items-center justify-center gap-2.5 text-sm font-medium'>
        Don’t have an account?{' '}
        <Link href={'/sign-up'} className='text-[#0F3DDE]'>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
