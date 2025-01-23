import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
