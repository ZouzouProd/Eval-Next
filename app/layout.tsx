import { Inter } from "next/font/google";
import "./global.css";
import "@/styles/globals.css";
import { BookmarkSynchronizer } from "@/components/BookmarkSynchronizer";
import { Menu } from "@/components/Menu";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jobs = await getPrismicJobs();
  const availableJobIds = jobs.map((job) => job.id);

  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`flex flex-col min-h-dvh ${inter.className} bg-medium`}>
        <BookmarkSynchronizer availableJobIds={availableJobIds} />
        <Menu logoAlt="Next Formation" logoSrc="/Logo.png" />
        <div className="px-25 py-12.5 bg-medium">
          {children}
        </div>
      </body>
    </html>
  );
}
