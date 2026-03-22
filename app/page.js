import Home from "@/components/Home/Home";

export const metadata = {
  title: "Gulmi Baglung Jewellers | Luxury Gold & Diamond Jewelry in Nepal",
  description:
    "Gulmi Baglung Jewellers offers premium handcrafted gold and diamond jewelry in Nepal. Explore rings, necklaces, bracelets, earrings, and wedding jewelry crafted with trust, tradition, and timeless elegance.",

  keywords: [
    "Gulmi Baglung Jewellers",
    "Luxury jewelry Nepal",
    "Gold jewelry Nepal",
    "Diamond rings Nepal",
    "Wedding jewelry Nepal",
    "Handcrafted jewelry",
    "Gold necklaces",
    "Gold bracelets",
    "Gold earrings",
    "Nepali jewelry brand",
    "Certified gold jewelry",
    "Luxury jewellery store"
  ],

  openGraph: {
    title: "Gulmi Baglung Jewellers | Timeless Luxury Jewelry",
    description:
      "Discover handcrafted luxury gold and diamond jewelry made in Nepal. Trusted for weddings, investments, and timeless elegance.",
    url: "https://gulmibaglungjewellers.com",
    siteName: "Gulmi Baglung Jewellers",
    images: [
      {
        url: "/images/logo/arc_logo.png",
        width: 1200,
        height: 630,
        alt: "Luxury Gold and Diamond Jewelry by Gulmi Baglung Jewellers",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gulmi Baglung Jewellers | Luxury Jewelry Store",
    description:
      "Premium handcrafted gold & diamond jewelry. Trusted quality, elegant design, and timeless craftsmanship.",
    url: "/images/logo/arc_logo.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <Home />;
}
