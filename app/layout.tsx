import type { Metadata } from "next";
import "./globals.scss";
import {cookies, headers} from "next/headers";

export const metadata: Metadata = {
  title: "Jakub Sokol"
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode}>) {
  const langCookie = (await cookies()).get('lang')?.value || 'en';
  const langHeader = (await headers()).get('x-locale') || 'en';
  const lang = langCookie || langHeader;

  return (
      <html lang={lang}>
          <body className={`antialiased text-white`}>
            {children}
          </body>
      </html>
  );
}