import { NextResponse } from "next/server";
import { verifyToken } from "@/app/utility/JWT";

export async function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }

  req.user = decoded;

  return NextResponse.next();
}

// Apply middleware only to protected API routes
export const config = {
  matcher: ["/api/protected/:path*"],
};
