import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeTransitionProvider } from "@/components/ui/theme-transition";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CommandPalette } from "@/components/ui/command-palette";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Adnan Khan — Full Stack Developer",
    template: "%s | Adnan Khan",
  },
  description: "Full Stack Developer specializing in Next.js, React, Node.js, and modern web technologies. Based in Swat, Pakistan.",
  keywords: ["Full Stack Developer", "Web Developer", "Next.js", "React", "Node.js", "SaaS", "Swat Pakistan"],
  authors: [{ name: "Adnan Khan", url: "https://adnankhan.dev" }],
  creator: "Adnan Khan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Adnan Khan — Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, and modern web technologies.",
    siteName: "Adnan Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adnan Khan — Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, and modern web technologies.",
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
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${spaceMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeTransitionProvider>
            <CustomCursor />
            <ScrollProgress />
            <CommandPalette />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
