import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./_context/userContext";
import PositionProvider from "./_context/positionContext";

const fontSans = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "FLEA TAIPEI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={fontSans.className}>
        <UserProvider>
          <PositionProvider>
            {children}
          </PositionProvider>
        </UserProvider>
      </body>
    </html>
  );
}
