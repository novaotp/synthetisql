
"use server";

import { hash } from 'bcrypt';
import { db } from "@src/database";

export interface SignUpParams {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const signUp = async ({ firstName, lastName, email, password }: SignUpParams): Promise<void> => {
  try {
    const client = await db.connect();

    const now = new Date();
    const query = 'INSERT INTO account (first_name, last_name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [firstName, lastName, email, await hash(password, 15), now, now];

    await client.query(query, values);

    client.release();

  } catch (err) {
    console.error("Someting went wrong when signing up :", err);

  }
}
