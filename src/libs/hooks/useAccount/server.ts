
"use server";

import { db } from "@/database";
import { verify } from "@/utils/jwt";
import { Account } from "./interfaces";

export const fetchAccountData = async (token: string) => {
  try {
    const userId = ((await verify(token)).payload as any).userId;
    const client = await db.connect();

    const query = 'SELECT * FROM account WHERE id = $1 LIMIT 1';
    const values = [userId];

    const { rows } = await client.query(query, values);
    client.release();

    const user = rows[0];

    if (!user) {
      return null;
    }

    const account: Account = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };

    return account;
  } catch (err) {
    console.error("Error while fetching account data: ", err);
    return null;
  }
};
