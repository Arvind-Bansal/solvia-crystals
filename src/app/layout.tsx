import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solvia Crystals - Premium Crystal Bracelets",
  description: "Discover luxury crystal bracelets crafted for love, protection, and healing. Solvia Crystals brings elegance and spiritual energy to your everyday life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-black text-brand-silver">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
