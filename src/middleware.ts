import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname === "/") {
  //   let cookie = request.cookies.getAll();

  //   return NextResponse.redirect(new URL("/main", request.url));
  // }
  
  return NextResponse.next();
}
