import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eatable",
  description:
    "Eatable is an online platform that enables people with food hypersensitivity to be able to find restaurants and meals that are compatible with their specific dietary restrictions.",
  icons: {
    icon: [
      {
        url: "/assets/logo.png",
        href: "/assets/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black min-h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-md mx-auto bg-white h-screen overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
