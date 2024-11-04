import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
 
export const metadata = {
    title: "IT Legend",
    description: "IT Legend",
  };
  
  export default async function RootLayout({ children, params: { local } }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}