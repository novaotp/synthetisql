
"use server";

// BCrypt
import { compare } from 'bcrypt';

// Internal
import { db } from "@src/database";
import { sign, verify } from '@utils/jwt';

export interface LogInParams {
  email: string,
  password: string,
}

export const logIn = async (data: LogInParams) => {
  try {
    const client = await db.connect();

    const query = 'SELECT * FROM account WHERE email = $1 LIMIT 1;';
    const values = [data.email];

    const { rows } = await client.query(query, values);
    const user = rows[0];

    if (!user || !(await compare(data.password, user.password))) {
      if (!user) {
        return { message: "This user doesn't exist", data: undefined };
      }

      return { message: "The passwords don't match", data: undefined };
    }

    client.release();

    const token = await sign({ userId: user.id });
    const payload = await verify(token);

    return { message: undefined, data: { payload, token } };

  } catch (err) {
    console.error("Someting went wrong when logging in :", err);

    return { message: "Internal Server Error", data: undefined };

  }
}
