import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { isPublicRoute, isTokenExpired, redirectToLogin, refreshAccessToken } from './helper/middleware';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicRoute(pathname)) return NextResponse.next();

  const accessToken = req.cookies.get('access_token')?.value;
  if (!accessToken) return redirectToLogin(req);

  if (isTokenExpired(accessToken)) {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (!refreshToken) return redirectToLogin(req);

    const refreshed = await refreshAccessToken(refreshToken);
    if (!refreshed) return redirectToLogin(req);

    const response = NextResponse.next();
    response.cookies.set('access_token', refreshed, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}
