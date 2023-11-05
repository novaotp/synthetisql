
"use server";

import { db } from '@/database';
import { verify } from '@/utils/jwt';
import { cookies } from 'next/headers';

/** Creates a new diagram and returns its `id`, or `0` if it failed. */
export const newDiagram = async (): Promise<number> => {
  try {
    const token = cookies().get('id')?.value;

    if (!token) {
      return 0;
    }

    const userId = ((await verify(token)).payload as any).userId;

    if (!userId) {
      return 0;
    }

    const client = await db.connect();

    const now = new Date();
    const query = 'INSERT INTO diagram (account_id, data, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id';
    const values = [userId, "[]", now, now];

    const { rows } = await client.query(query, values);
    client.release();

    return rows[0].id;

  } catch (error) {
    console.log("An error occurred while creating a new diagram: ", error);
    return 0;
  }
}
