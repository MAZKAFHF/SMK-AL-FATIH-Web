import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMK Tahfizh Al-Fatih | Berilmu, Berakhlak, Berprestasi",
  description: "SMK Tahfizh Al-Fatih Pekanbaru - Bersama Al-Qur'an Membangun Generasi Unggul. Jurusan RPL & Tata Boga, Program Tahfizh, Entrepreneurship, PBL.",
  metadataBase: new URL("https://smkalfatih.sch.id"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "SMK Tahfizh Al-Fatih",
    description: "Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}


