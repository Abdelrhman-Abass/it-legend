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
  const userId = req.cookies.get("user_id")?.value;

  const { pathname } = req.nextUrl;

  // Define login-only and private paths
  const loginPaths = ["/auth", "/diploma-details/"]; // Public pages when not logged in
  const privatePaths = ["/course-player/", "/diploma/", "/learning-path"]; // Pages for logged-in users
  const isUserLoggedIn = Boolean(userId);

  // If user is authenticated and trying to access login paths, redirect to homepage
  if (
    isUserLoggedIn &&
    (loginPaths.some((path) => pathname.includes(path)) ||
      pathname == "/ar" ||
      pathname == "/en")
  ) {
    return NextResponse.redirect(new URL("/learning-path", req.url));
  }

  // If user is not logged in and trying to access private paths, redirect to login
  // if (!isUserLoggedIn && privatePaths.some((path) => pathname.includes(path))) {
  //   return NextResponse.redirect(new URL("/auth", req.url));
  // }
  
  // Run the intl middleware first to handle locales
  const response = intlMiddleware(req);

  const validPaths = [
    "/",
    "/auth",
    "/diploma-details/:id*",
    "/course-player/:id*",
    "/diploma/:id*",
    "/learning-path/:id*",
    ...locales.map((locale) => `/${locale}`), // Include locale-specific root paths
  ];

  // Check if the requested path matches any valid paths
  const isValidPath = validPaths.some((path) => {
    // Use regex to check dynamic routes
    const regexPath = path.replace(/:\w+\*/, ".*").replace(/:\w+/, "[^/]+");
    return new RegExp(`^${regexPath}$`).test(pathname);
  });

  // If the path is not valid, rewrite to the 404 page
  if (!isValidPath) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
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
