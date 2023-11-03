
// Next
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/app') && !(await isAuthenticated(request))) {
    return NextResponse.redirect(new URL('/auth/log-in', request.url));
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get('id');

  if (!cookie) {
    return false;
  }

  try {
    const url = `http://localhost:5173/api/jwt`;
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: cookie.value,
    }
    const response = await fetch(url, init);
    return await response.json() as boolean;

  } catch (e) {
    console.error(`An error occurred while verifying the JWT in the middleware : ${e}`);
    return false;

  }
}
