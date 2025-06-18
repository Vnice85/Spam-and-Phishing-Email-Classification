import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { autoRefreshToken } from "@/utils/auth";
import BackgroundProcess from "@/components/BackgroundProcess";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Mail Classifier",
  description: "Giao diện phân loại email",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <BackgroundProcess />
        {children}
      </body>
    </html>
  );
}