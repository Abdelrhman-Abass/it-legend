import { NextIntlClientProvider } from "next-intl";
import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Theme from "@/components/common/theme";
import { MouseMoveProvider } from "@/contexts/mouse-move-context";
import { getMessages } from "next-intl/server";
import "@/styles/index.scss";
import Client from "./Client";
import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation'

// import Script from "next/script";

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
  // const local = await getLocale(params);
  setRequestLocale(locale);

  const messages = await getMessages();

  const title =
    locale == "ar"
      ? "IT Legend | طريقك نحو النجاح"
      : "IT Legend | your way to success";
  const description =
    locale == "ar"
      ? "منصة تعليمية رائدة تقدم دورات احترافية في مجال تكنولوجيا المعلومات. نوفر لك تجربة تعلم متكاملة مع مدربين محترفين، ومحتوى عملي، وشهادات معتمدة لمساعدتك في بناء مستقبلك المهني في عالم التكنولوجيا."
      : "A leading educational platform offering professional IT courses. We provide a comprehensive learning experience with expert instructors, practical content, and certified certificates to help you build your career in the tech world.";


  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" type="image" href="/favicon.png" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {/* <meta
          name="keywords"
          content={locale == "ar" ? arKeywords : enKeywords}
        /> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <!-- twitter --> */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link
          rel="preload"
          href="/_next/static/css/app/[local]/page.css"
          as="style"
          type="text/css"
        />

        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700;800&display=swap"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={` ${locale == "ar" ? notoKufiArabic.variable : poppins.variable
          }`}
        cz-shortcut-listen="false"
      >
        {/* <Script
          src="/src/utils/publitio_player.min.js"
          strategy="lazyOnload" // The script will load after the page is fully loaded
        /> */}
        <ThemeProvider defaultTheme="light">
          <MouseMoveProvider>
            <NextIntlClientProvider messages={messages}>
              <Client>{children}</Client>
            </NextIntlClientProvider>
          </MouseMoveProvider>
          <Theme />
        </ThemeProvider>
        {/* <script src="https://player.vdocipher.com/v2/api.js"></script> */}
      </body>
    </html >
  );
}
