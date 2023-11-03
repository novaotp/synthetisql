
// Next
import { type NextRequest, NextResponse } from "next/server";
import { verify } from "./utils/jwt";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/app') && !(await isAuthenticated(request))) {
    return NextResponse.redirect(new URL('/auth/log-in', request.url));
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('id')?.value;

  if (!token) {
    return false;
  }

  try {
    const data = await verify(token);

    const success = (data.payload as any).userId !== undefined;

    return success;

  } catch (e) {
    console.error(`An error occurred while verifying the JWT in the middleware : ${e}`);
    return false;

  }
}
