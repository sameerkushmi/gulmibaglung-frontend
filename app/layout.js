import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import CookieBanner from "@/components/CookieBanner/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gulmi Baglung Jewellers",
  description:
    "Gulmi Baglung Jewellers – A trusted name in fine jewellery, offering exquisite designs, high-quality gold, silver, and precious gems, combined with exceptional customer service in Gulmi.",
  icons: {
    icon: "/logo-with-abstract.png",
  },
  metadataBase: new URL("https://gulmibaglungjewellers.com"),
  openGraph: {
    title: "Gulmi Baglung Jewellers",
    description:
      "Gulmi Baglung Jewellers – A trusted name in fine jewellery, offering exquisite designs, high-quality gold, silver, and precious gems, combined with exceptional customer service in Gulmi.",
    url: "https://gulmibaglungjewellers.com",
    siteName: "Gulmi Baglung Jewellers",
    images: [
      {
        url: "https://gulmibaglungjewellers.com/logo-with-abstract.png",
        width: 1200,
        height: 630,
        alt: "Gulmi Baglung Jewellers Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Layout>{children}</Layout>
        <CookieBanner />
      </body>
    </html>
  );
}