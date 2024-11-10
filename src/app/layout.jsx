import { ThemeProvider } from "next-themes";
import "@/styles/index.scss";

export default async function RootLayout({ children} ) {

  return (
    <html>
      <head>
        <link rel="icon" type="image" href="/favicon.png" />
      </head>
      <body
      >
          <ThemeProvider defaultTheme="light">
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
