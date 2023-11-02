
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
import { signUp, type SignUpParams } from './server';

export const SignUp = (): JSX.Element => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data: SignUpParams = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    await signUp(data);

    router.push('/auth/log-in');
  }

  return (
    <Window>
      <Header title='Sign Up' />
      <Form onSubmit={handleOnSubmit}>
        <Input label='First Name' value={firstName} setValue={setFirstName} placeholder='Enter your first name here...' />
        <Input label='Last Name' value={lastName} setValue={setLastName} placeholder='Enter your last name here...' />
        <Input label='Email' value={email} setValue={setEmail} placeholder='Enter your email here...' type='email' />
        <Input label='Password' value={password} setValue={setPassword} placeholder='Enter your password here...' type='password' />
        <Button label='Create my account' />
        <AlternativeLink text='Already have an account ?' href='/auth/log-in' label='Log In' />
      </Form>
    </Window>
  )
}
