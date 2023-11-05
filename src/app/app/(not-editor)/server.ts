
"use server";

import { db } from '@/database';
import { verify } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { Diagram } from '../interfaces';

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
    const query = 'INSERT INTO diagram (account_id, title, data, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    const values = [userId, "New Diagram", "[]", now, now];

    const { rows } = await client.query(query, values);
    client.release();

    return rows[0].id;

  } catch (error) {
    console.log("An error occurred while creating a new diagram: ", error);
    return 0;
  }
}

export const fetchAllDiagrams = async (): Promise<Diagram[] | undefined> => {
  try {
    const token = cookies().get('id')?.value;

    if (!token) {
      return undefined;
    }

    const userId: number = ((await verify(token)).payload as any).userId;

    if (!userId) {
      return undefined;
    }

    const client = await db.connect();

    const query = 'SELECT * FROM diagram WHERE account_id = $1';
    const values = [userId];

    const { rows } = await client.query(query, values);
    client.release();

    const diagrams: Diagram[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      data: JSON.parse(row.data),
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    return diagrams;

  } catch (error) {
    console.log("An error occurred while creating a new diagram: ", error);
    return undefined;
  }
}
