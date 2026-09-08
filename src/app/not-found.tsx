import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-black text-slate-900">404</h1>
      <p className="text-xl font-semibold mt-2">Halaman Tidak Ditemukan</p>
      <p className="text-slate-600 mt-2 max-w-md">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link href="/" className="mt-6"><Button>Kembali ke Beranda</Button></Link>
    </div>
  );
}
