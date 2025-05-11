import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { isPublicRoute, isTokenExpired, redirectToLogin, refreshAccessToken } from './helper/middleware';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes to pass through without authentication
  if (isPublicRoute(pathname)) return NextResponse.next();

  // Check for the access token in cookies
  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) {
    // If there's no access token, attempt to refresh it
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) return redirectToLogin(req); // If no refresh token, redirect to login

    // Try to refresh the access token using the refresh token
    const refreshed = await refreshAccessToken();
    if (!refreshed) return redirectToLogin(req); // If refreshing fails, redirect to login

    const response = NextResponse.next();
    response.cookies.set('accessToken', refreshed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure flag only for production
      sameSite: 'lax',
      path: '/',
    });
    return response;
  }

  // Check if the access token is expired
  if (isTokenExpired(accessToken)) {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (!refreshToken) return redirectToLogin(req); // If no refresh token, redirect to login

    // Try to refresh the access token using the refresh token
    const refreshed = await refreshAccessToken();
    if (!refreshed) return redirectToLogin(req); // If refreshing fails, redirect to login

    const response = NextResponse.next();
    response.cookies.set('accessToken', refreshed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
    });
    return response;
  }

  return NextResponse.next(); // Proceed with the next middleware or request handler
}
