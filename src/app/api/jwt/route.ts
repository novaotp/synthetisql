
"use server";

import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/utils/jwt";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const token = request.cookies.get('id')?.value;
    console.log("Token", token);

    if (!token) {
      return NextResponse.json(false);
    }

    const data = await verify(token);

    const success = (data.payload as any).userId !== undefined;

    return NextResponse.json({ success });
    
  } catch (e) {
    console.error(`Detected an error while authenticating a user : ${e}`);
    return NextResponse.json({ success: false });
  }
}
