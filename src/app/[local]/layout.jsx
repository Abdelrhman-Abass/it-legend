import { NextIntlClientProvider } from "next-intl";
import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Theme from "@/components/common/theme";
import { MouseMoveProvider } from "@/contexts/mouse-move-context";
import { getMessages } from "next-intl/server";
import "@/styles/index.scss";
import Client from "./Client";
import { notFound } from 'next/navigation';

import Script from "next/script";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--notoKufiArabic-font-family",
  display: "swap", // Ensures fonts are loaded in a non-blocking way
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--poppins-font-family",
  display: "swap", // Ensures fonts are loaded in a non-blocking way
});

const locales = ["en", "ar"];

// async function getLocale(params) {
//   const local = await params?.local;
//   if (!locales.includes(local)) {
//     notFound();
//   }
//   return local;
// }

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  const title =
    locale == "ar"
      ? "IT Legend | منصة تعليمية للبرمجة والتكنولوجيا"
      : "IT Legend | Programming & Technology Learning Platform";
  
  const description =
    locale == "ar"
      ? "منصة تعليمية رائدة تقدم دورات احترافية في البرمجة وتطوير المواقع وتطبيقات الموبايل والذكاء الاصطناعي. تعلم من خبراء الصناعة واحصل على شهادات معتمدة لتطوير مهاراتك المهنية."
      : "A leading educational platform offering professional courses in programming, web development, mobile applications, and artificial intelligence. Learn from industry experts and get certified to advance your career skills.";

  const keywords = locale === "ar"
    ? "دورات برمجة, تعلم البرمجة, تطوير المواقع, تطبيقات موبايل, الذكاء الاصطناعي, تعلم البرمجة بالعربية"
    : "programming courses, learn programming, web development, mobile applications, artificial intelligence, coding certification";

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" type="image" href="/favicon.png" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/favicon.png" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/favicon.png" />
      </head>
    
      <body
        className={` ${locale == "ar" ? notoKufiArabic.variable : poppins.variable}`}
        cz-shortcut-listen="false"
      >
        <ThemeProvider defaultTheme="light">
          <MouseMoveProvider>
            <NextIntlClientProvider messages={messages}>
              <Client>{children}</Client>
            </NextIntlClientProvider>
          </MouseMoveProvider>
          <Theme />
        </ThemeProvider>

        {/* Load the Vdocipher Player script after the page is fully loaded */}
        <Script
          src="https://player.vdocipher.com/v2/api.js"
          strategy="lazyOnload" // This will load the script after the page is fully loaded
        />
      </body>
    </html>
  );
}
