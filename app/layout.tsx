import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingAssistant } from "@/components/ai/FloatingAssistant";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adnan Khan",
    "url": "https://adnanxdev.site",
    "jobTitle": "Full Stack Developer",
    "sameAs": [
      "https://github.com/webbyadnan",
      "https://www.linkedin.com/in/adnan-khan-b9034a31a/"
    ],
    "description": "Full Stack Developer specializing in Next.js, React, and modern web technologies."
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${caveat.variable} font-sans bg-background text-foreground antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingAssistant />
          <VisitorTracker />
        </div>
      </body>
    </html>
  );
}
