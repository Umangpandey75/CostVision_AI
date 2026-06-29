import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
 
export const metadata = {
  title: "CostVision AI — Free AI Spend Audit for Startups",
  description:
    "Find out if you're overpaying for AI tools. Get a free instant audit of your Cursor, Claude, ChatGPT, and Copilot spend — with specific recommendations to cut costs.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://costvision.ai"
  ),
  openGraph: {
    title: "CostVision AI — Free AI Spend Audit",
    description:
      "Most startups overpay for AI tools by 30–60%. Find out in 2 minutes.",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SpendWise AI Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CostVision AI — Free AI Spend Audit",
    description:
      "Most startups overpay for AI tools by 30–60%. Find out in 2 minutes.",
    images: ["/og-default.png"],
  },
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}