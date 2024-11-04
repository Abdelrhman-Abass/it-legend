import { NextIntlClientProvider } from "next-intl";
import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Theme from "@/components/common/theme";
import { MouseMoveProvider } from "@/contexts/mouse-move-context";
import { getMessages } from "next-intl/server";
import "@/styles/index.scss";
import Client from "./Client";
// import Script from "next/script";

export const metadata = {
  title: "IT Legend",
  description: "IT Legend",
};

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

export default async function RootLayout({ children, params: { local } }) {
  const messages = await getMessages();

  return (
    <html lang={local} dir={local === "ar" ? "rtl" : "ltr"}>
      <link rel="icon" type="image" href="/favicon.png" />
      <body
        className={`${notoKufiArabic.variable} ${poppins.variable}`}
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
        <script src="https://player.vdocipher.com/v2/api.js"></script>
      </body>
    </html>
  );
}
