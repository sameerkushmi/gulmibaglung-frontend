import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";
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
  description: "Gulmi Baglung Jewellers – A trusted name in fine jewellery, offering exquisite designs, high-quality gold, silver, and precious gems, combined with exceptional customer service in Gulmi.",
  icons: {
    icon: "/logo-with-abstract.png", // Favicon path
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo-with-abstract.png" />
      </Head>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <Layout>
            {children}
          </Layout>
          <CookieBanner />
        </body>
      </html>
    </>
  );
}
