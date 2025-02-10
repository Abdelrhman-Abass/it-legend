import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
  localeDetection: false,
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images|sitemap.xml|robots.txt|googled02dc937f6d8947f.html).*)'
  ]
};




// Define domain-specific locales


