import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lunar - Beautiful Screenshot Editor by Elevatroy",
  description:
    "Transform your screenshots into stunning visuals with Lunar, a free tool by Elevatroy - Your trusted SaaS & Web Development agency. Create professional-looking screenshots for your documentation, presentations, or social media posts.",
  applicationName: "Lunar by Elevatroy",
  keywords: [
    // Product Keywords
    "screenshot editor",
    "screenshot beautifier",
    "screenshot tool",
    "image editor",
    "screenshot enhancement",
    "screenshot design",
    // Features
    "custom shadows",
    "image frames",
    "background gradients",
    "image adjustments",
    "screenshot mockups",
    // Use Cases
    "documentation screenshots",
    "presentation visuals",
    "social media posts",
    "product demos",
    "tutorial images",
    // Brand Keywords
    "Elevatroy",
    "SaaS development",
    "web development agency",
    "free developer tools",
    "software development company",
  ].join(", "),
  authors: [
    {
      name: "Elevatroy",
      url: "https://elevatroy.com",
    },
  ],
  creator: "Elevatroy",
  publisher: "Elevatroy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lunar.elevatroy.com",
    siteName: "Lunar by Elevatroy",
    title: "Lunar - Beautiful Screenshot Editor by Elevatroy",
    description:
      "Free screenshot beautifier tool by Elevatroy, your trusted SaaS & Web Development partner. Transform your screenshots into professional visuals.",
    images: [
      {
        url: "/og-image.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Lunar by Elevatroy Screenshot Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunar - Beautiful Screenshot Editor by Elevatroy",
    description:
      "Transform your screenshots into stunning visuals with our free tool. By Elevatroy - Your SaaS & Web Development experts.",
    images: ["/twitter-image.png"], // Add your Twitter card image
    creator: "@elevatroy",
    site: "@elevatroy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className={`${poppins.className} `}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
