
"use server";

import { db } from "@/database";
import { verify } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchDiagram = async (id: number, jwt: string) => {
  try {
    const userId: number = ((await verify(jwt)).payload as any).userId;
    
    if (!userId) {
      redirect("/auth/login");
    }

    const client = await db.connect();

    const query = 'SELECT * FROM diagram WHERE id = $1 AND account_id = $2 LIMIT 1';
    const values = [id, userId]

    const { rows } = await client.query(query, values);
    client.release();

    const diagram = JSON.parse(rows[0].data);

    return diagram;

  } catch (err) {
    console.log("An error occurred while fetching the diagram: ", err);
    return null;

  }
}
