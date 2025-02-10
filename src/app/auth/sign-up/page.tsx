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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  is_aggreed: boolean;
}

// destructuring
const { globalComponents } = components;

const { Input, CheckBox, Button, Divider, InputPassword } = globalComponents;
const { validations } = helpers;

export default function SignUp() {
  const router = useRouter();

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [userDetails, setUserDetails] = useState<userDetailsTypes>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    is_aggreed: true,
  });

  const onChange = ({ key, value }: { key: string; value: string | boolean }) =>
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));

  const allowToSignup = useCallback(() => {
    const isFirstNameValid = userDetails?.firstName?.length > 0;
    const isEmailValid = validations?.isEmailValid(userDetails?.email);
    const isPasswordValid = validations?.isPasswordValid(userDetails?.password);
    const isAggreedTermsandConditions = userDetails?.is_aggreed;

    return (
      isFirstNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isAggreedTermsandConditions
    );
  }, [userDetails]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSigningUp(true);
    const payload = {
      email: userDetails?.email,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      password: userDetails?.password,
    };

    try {
      const res = await signUpApi({ payload });
      if (res?.status === 200) router.push('/auth/sign-in');
    } catch (error) {
      console.warn(error);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className='w-full flex-1'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-2xl font-medium'>Welcome to Uptask</h3>
        {/* <p className='text-base font-medium'>
          Enter your Credentials to access your account
        </p> */}
        <div className='flex w-full flex-1 flex-col gap-5 pt-11'>
          <div className='flex w-full flex-1 flex-col items-center justify-between gap-5 xl:flex-row'>
            <Input
              name='first_name'
              label='First Name'
              placeholder='Enter first Name'
              value={userDetails?.firstName}
              onInputChange={(value: string) => {
                onChange({ key: 'firstName', value });
              }}
              autoFocus
            />
            <Input
              name='last_name'
              label='Last Name'
              placeholder='Enter last Name'
              value={userDetails?.lastName}
              onInputChange={(value: string) => {
                onChange({ key: 'lastName', value });
              }}
            />
          </div>
          <Input
            name='email'
            type='email'
            label='Email address'
            placeholder='Enter email'
            value={userDetails?.email}
            onInputChange={(value: string) => {
              onChange({ key: 'email', value });
            }}
          />
          <InputPassword
            name='password'
            label='Password'
            placeholder='Enter password'
            value={userDetails?.password}
            onInputChange={(value: string) => {
              onChange({ key: 'password', value });
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
            className=''
            disabled={!allowToSignup()}
          >
            {isSigningUp ? 'Loading..' : 'Signup'}
          </Button>
        </div>
      </form>

      <Divider label='Or' />

      <div className='flex items-center justify-center gap-2.5 text-sm font-medium'>
        Have an account?{' '}
        <Link href={'/auth/sign-in'} className='text-[#0F3DDE]'>
          Sign In
        </Link>
      </div>
    </div>
  );
}
