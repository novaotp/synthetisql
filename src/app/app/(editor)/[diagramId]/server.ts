
"use server";

// Next
import { redirect } from "next/navigation";

// Internal
import { db } from "@src/database";
import { verify } from "@utils/jwt";
import { Diagram } from "../../interfaces";

export const fetchDiagram = async (id: number, jwt: string): Promise<Diagram | null> => {
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

    const diagram: Diagram = {
      id: rows[0].id,
      title: rows[0].title,
      data: JSON.parse(rows[0].data),
      created_at: rows[0].created_at,
      updated_at: rows[0].updated_at
    }

    return diagram;

  } catch (err) {
    console.log("An error occurred while fetching the diagram: ", err);
    return null;

  }
}
