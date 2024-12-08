import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { locales, localePrefix } from "./navigation";


// Middleware for i18n (from next-intl)
const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  // Used when no locale matches
  defaultLocale: "ar",
});

export async function middleware(req) {
  // Access cookies from the request headers
  const user = req.cookies.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  // Define login-only and private paths
  const loginPaths = ["/auth", "/diploma-details/"]; // Public pages when not logged in
  const privatePaths = ["/course-player/", "/diploma/", "/learning-path"]; // Pages for logged-in users
  const isUserLoggedIn = Boolean(user);

  // If user is authenticated and trying to access login paths, redirect to homepage
  // if (
  //   isUserLoggedIn &&
  //   (loginPaths.some((path) => pathname.includes(path)) ||
  //     pathname == "/ar" ||
  //     pathname == "/en")
  // ) {
  //   return NextResponse.redirect(new URL("/learning-path", req.url));
  // }

  // If user is not logged in and trying to access private paths, redirect to login
  if (!isUserLoggedIn && privatePaths.some((path) => pathname.includes(path)) ||
    pathname == "/ar" ||
    pathname == "/en") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Run the intl middleware first to handle locales
  const response = intlMiddleware(req);

  return response || NextResponse.next();
}

// Configuration to match only internationalized paths
export const config = {
  matcher: [
    "/", // Root path
    "/(ar|en)/:path*", // Match localized paths
    "/course-player/:id*", // Match dynamic course player paths
    "/diploma/:id*", // Match dynamic diploma paths
    "/learning-path/:id*", // Ensure it captures dynamic segments for learning path
    "/auth", // Auth paths
    "/diploma-details/:id*", // Match dynamic diploma details paths
  ], // Include paths you want the middleware to apply to
};
