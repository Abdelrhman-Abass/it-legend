import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: false,
});
export function middleware(req: NextRequest) {
  // Access cookies from the request headers
  const user = req.cookies.get("userDataRefresh")?.value;
  const isUserLoggedIn = Boolean(user);

  // Extract URL and pathname
  const url = new URL(req.url);
  let pathname = url.pathname; // Example: "/ar/course-player"
  
  // Extract locale manually from pathname
  const localeMatch = pathname.match(/^\/(ar|en)\b/);
  const locale = localeMatch ? localeMatch[1] : "ar"; // Default to Arabic if not found

  // Remove locale from pathname to get the "base" path
  pathname = pathname.replace(/^\/(ar|en)/, "");

 

  // Define public (login) and private (restricted) paths
  const loginPaths = [ "/diploma-details", "/", "/courses", "/cart"];
  const privatePaths = ["/course-player", "/diploma", "/learn-path"];

  // 🚀 If logged in & on a login page OR at `/ar` or `/en`, redirect to localized "learn-path"
  if (isUserLoggedIn && (loginPaths.includes(pathname) || pathname === "")) {
    return NextResponse.redirect(new URL(`/${locale}/learn-path`, req.url));
  }

  // 🚀 If NOT logged in & trying to access a private page, redirect to localized "auth"
  if (!isUserLoggedIn && privatePaths.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}/auth`, req.url));
  }

  // 🌍 Apply Next-Intl Middleware for locale handling
  return intlMiddleware(req) || NextResponse.next();
}

// 📌 Apply middleware to relevant routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images|sitemap.xml|robots.txt|googled02dc937f6d8947f.html).*)'
  ]
};




// Define domain-specific locales


