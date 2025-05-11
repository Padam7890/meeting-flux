import http from "@/lib/http";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export function isPublicRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  );
}

export function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const cookieStore = cookies(); // ✅ no await here
    const refreshToken = (await cookieStore).get("refreshToken")?.value;
    if (!refreshToken) {
      console.warn("No refresh token found in cookies");
      return null;
    }
    const res = await axios.post(
      "http://localhost:3001/api/v1/auth/refresh",
      {},
      {
        withCredentials: true,
        headers: {
        Cookie: `refreshToken=${refreshToken}`, // ✅ manual set
        },
      }
    );
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
}
