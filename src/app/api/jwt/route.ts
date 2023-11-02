
import { NextRequest, NextResponse } from "next/server";
import { JWT } from "@/utils/jwt";

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("POST request :", request);
  const { token } = await request.json();

  try {
    const data = await JWT.verify(token);

    const success = (data.payload as any).userId !== undefined;

    return NextResponse.json({ success });
    
  } catch (e) {
    console.error(`Detected an error while authenticating a user : ${e}`);
    return NextResponse.json({ success: false });
  }
}
