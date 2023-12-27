import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboardPath = path.startsWith('/accounts/dashboard');
  const isPublicPath = path === '/accounts/signIn' || path === '/accounts/signUp';
  const token = request.cookies.get(process.env.TOKEN_NAME!)?.value || '';

  if (isDashboardPath && !token) {
    // If trying to access /accounts/dashboard without a token, redirect to sign-in
    return NextResponse.redirect(new URL('/accounts/signIn', request.nextUrl));
  }

  if (isPublicPath && token) {
    // If trying to access private paths with a token, redirect to dashboard -> then it will redirect it to his accounts page
    return NextResponse.redirect(new URL(`/accounts/dashboard`, request.nextUrl));

  }
  if (!isPublicPath && !token) {
    // For any other path that is not public or dashboard, redirect to sign-in
    return NextResponse.redirect(new URL('/accounts/signIn', request.nextUrl));
  }
}


export const config = {
  matcher: [
    '/accounts/dashboard/:path*',
    '/accounts/signIn',
    '/accounts/signUp',
  ],
}