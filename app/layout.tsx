import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Adnan Khan - Full Stack Web Developer",
    template: "%s | Adnan Khan",
  },
  description: "Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies. Based in Swat, Pakistan.",
  keywords: ["Full Stack Developer", "Web Developer", "Next.js", "React", "Node.js", "Tailwind CSS", "Supabase", "Swat Pakistan"],
  authors: [{ name: "Adnan Khan", url: "https://adnankhan.dev" }],
  creator: "Adnan Khan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Adnan Khan - Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies.",
    siteName: "Adnan Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adnan Khan - Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies.",
    creator: "@adnankhan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
