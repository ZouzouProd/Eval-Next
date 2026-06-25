import { Inter } from "next/font/google";
import "./global.css";
import "@/styles/globals.css";
import { Menu } from "@/components/Menu";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`flex flex-col min-h-dvh ${inter.className}`}>
        <Menu logoAlt="Next Formation" logoSrc="/logo.png" />
        {children}
      </body>
    </html>
  );
}
