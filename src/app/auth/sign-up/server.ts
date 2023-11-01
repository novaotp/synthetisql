
"use server";

import { redirect } from 'next/navigation';
import { hash } from 'bcrypt';
import { db } from "@/database";

export interface SignUpParams {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const signUp = async (data: SignUpParams): Promise<void> => {
  try {
    const client = await db.connect();

    const query = 'INSERT INTO account (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)';
    const values = [data.firstName, data.lastName, data.email, await hash(data.password, 15)];

    await client.query(query, values);

    client.release();

    redirect('/auth/log-in');

  } catch (err) {
    console.error("Someting went wrong when signing up :", err);

  }
}
