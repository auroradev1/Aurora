import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Logo } from "@/components/layout/Logo";
import { Footer } from "@/components/layout/Footer";

const defaultNavItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "The Auroraverse", href: "#auroraverse" },
  { label: "Company", href: "#company" },
];

export const metadata: Metadata = {
  title: "Aurora",
  description: "Aurora landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
        />
      </head>
      <body className="antialiased flex min-h-screen flex-col font-sans">
        <Navbar
          navItems={defaultNavItems}
          ctaLabel="Request a Demo"
          ctaHref="#contact"
          logo={<Logo size={96} />}
        />
        <main className="flex-1 pt-[76px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
