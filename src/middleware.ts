
// Next
import { type NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

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

  const url = `${request.url}/api/jwt`;
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: cookie.value }),
  }
  const response = await fetch(url, init);
  const { success } = await response.json();

  return success;
}
