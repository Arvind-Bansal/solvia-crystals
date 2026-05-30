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
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents iOS input zooming which can hurt UX
};

export const metadata: Metadata = {
  title: "Solvia Crystals | Handcrafted Crystal Jewellery",
  description: "Handcrafted crystal bracelets designed with intention and elegance. Ethically sourced stones, 14k gold detailing, and timeless design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col selection:bg-brand-gold selection:text-[#0a0a0a]">
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#121212',
            color: '#F2F2F2',
            border: '1px solid rgba(255,255,255,0.1)',
          }
        }} />
        <NewsletterPopup />
      </body>
    </html>
  );
}
