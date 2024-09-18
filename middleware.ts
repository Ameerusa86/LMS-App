import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const url = req.nextUrl.clone(); // Clone the current request URL
  const { pathname } = req.nextUrl;

  // Redirect to the login page if user is not authenticated
  if (!req.auth?.user) {
    // Redirect to the login page if accessing the dashboard
    if (pathname.startsWith("/admin/dashboard")) {
      url.pathname = "/auth/signin"; // Specify your login page path
      return NextResponse.redirect(url);
    }
  }

  // Check if the user is not an admin and trying to access the dashboard
  if (
    req.auth?.user &&
    req.auth.user.isAdmin !== true &&
    pathname.startsWith("/admin/dashboard")
  ) {
    url.pathname = "/no-access"; // Redirect to the custom no access page
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and an admin, continue with the request
  return NextResponse.next();
});
