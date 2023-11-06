
'use client';

// React + Next
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

// Internal
import { LogInParams, logIn } from './server';

/// -- Components -- ///
import {
  Input,
  AlternativeLink,
  Submit,
  Form,
  Header,
  Window
} from '../_components';

export const LogIn = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const params: LogInParams = {
      email: email,
      password: password
    }

    const { message, data } = await logIn(params);

    if (message !== undefined) {
      alert(message);
      return;
    }

    setCookie("id", data.token, { expires: new Date(data.payload.exp! * 1000) });

    router.push('/app');
  }

  return (
    <Window>
      <Header title='Log In' />
      <Form onSubmit={handleOnSubmit}>
        <Input label='Email' value={email} setValue={setEmail} placeholder='Enter your email here...' type='email' />
        <Input label='Password' value={password} setValue={setPassword} placeholder='Enter your password here...' type='password' />
        <Submit label='Log In' />
      </Form>
      <AlternativeLink text={'Don\'t have an account yet ?'} href='/auth/sign-up' label='Create one now' />
    </Window>
  )
}
