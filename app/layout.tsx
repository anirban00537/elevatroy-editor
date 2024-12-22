import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moiful - Turn Screenshots into Stunning Social Posts",
  description:
    "Make your online posts stand out with Moiful. Easily create eye-catching social media content from your screenshots.",
  applicationName: "Moiful - Social Post Creator",
  authors: [
    {
      name: "Anirban Roy",
      url: "https://twitter.com/anirban00537",
    },
  ],
  keywords:
    "Beautiful screenshots, screenshot editor, Beautiful screenshots online free,screenshot editor ai,screenshot online, edit screenshot online, screenshot design,screenshot editor online free, screenshot editor online, screen shot editing, Beautiful screenshots app, Beautiful screenshots online, Screenshot mockup generator, Capture beautiful screenshots, Create stunning screenshots, Edit beautiful screenshots, Free online screenshot editor, Best screenshot editor, Screenshot design tool, Visual screenshot editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} `}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
