
'use client';

// React + Next
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal

/// -- Components -- ///
import {
  Input,
  AlternativeLink,
  Button,
  Form,
  Header,
  Window
} from '../_components';
import { LogInParams, logIn } from './server';

export const LogIn = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data: LogInParams = {
      email: email,
      password: password
    }

    const { success, message } = await logIn(data);

    if (!success) {
      alert(message);
      return;
    }

    router.push('/app/dashboard')
  }

  return (
    <Window>
      <Header title='Log In' />
      <Form onSubmit={handleOnSubmit}>
        <Input label='Email' value={email} setValue={setEmail} placeholder='Enter your email here...' type='email' />
        <Input label='Password' value={password} setValue={setPassword} placeholder='Enter your password here...' type='password' />
        <Button label='Log In' />
        <AlternativeLink text={'Don\'t have an account yet ?'} href='/auth/sign-up' label='Create one now' />
      </Form>
    </Window>
  )
}
