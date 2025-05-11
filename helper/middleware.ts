import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export function isPublicRoute(pathname: string): boolean {
    return (
      pathname.startsWith('/login') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname === '/favicon.ico'
    );
  }
  
 export  function redirectToLogin(req: NextRequest) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = '';
    return NextResponse.redirect(loginUrl);
  }
  
 export  function isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }
  
export  async function refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (!res.ok) return null;
      const data = await res.json();
      return data.accessToken;
    } catch {
      return null;
    }
  }
  