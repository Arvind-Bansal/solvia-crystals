import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { NewsletterPopup } from "@/components/marketing/NewsletterPopup";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F8F5EF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents iOS input zooming which can hurt UX
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://solviacrystals.com"),
  title: "Solvia Crystals | Handcrafted Crystal Jewellery",
  description: "Handcrafted crystal bracelets designed with care and consideration. Ethically sourced stones, considered design, and everyday wearability.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#F8F5EF] text-[#262626] min-h-screen flex flex-col selection:bg-brand-gold selection:text-[#262626]">
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#F8F5EF',
            color: '#262626',
            border: '1px solid rgba(38,38,38,0.1)',
          }
        }} />
        <NewsletterPopup />
      </body>
    </html>
  );
}
