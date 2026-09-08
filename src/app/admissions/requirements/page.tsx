import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RequirementsPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Syarat Pendaftaran PPDB</h1>
        <Card className="mt-6"><CardContent className="p-6">
          <h2 className="font-bold">Persyaratan Umum</h2>
          <ul className="list-disc pl-5 text-sm text-slate-600 mt-2 space-y-1">
            <li>Lulusan SMP/MTs sederajat</li>
            <li>Usia maksimal 21 tahun</li>
            <li>Berakhlak baik & siap mengikuti program tahfizh</li>
            <li>Mengisi form pendaftaran online</li>
          </ul>
          <h2 className="font-bold mt-6">Dokumen yang Diperlukan</h2>
          <ul className="list-disc pl-5 text-sm text-slate-600 mt-2 space-y-1">
            <li>Kartu Keluarga (KK)</li>
            <li>Akta Kelahiran</li>
            <li>Rapor semester terakhir</li>
            <li>Pas Foto</li>
            <li>Ijazah / SKL (jika sudah ada)</li>
            <li>KTP Orang Tua/Wali</li>
          </ul>
          <h2 className="font-bold mt-6">Alur Pendaftaran</h2>
          <ol className="list-decimal pl-5 text-sm text-slate-600 mt-2 space-y-1">
            <li>Buat akun di /register</li>
            <li>Login dan lengkapi data diri & orang tua</li>
            <li>Pilih jurusan & program</li>
            <li>Isi informasi tambahan & upload dokumen (simulasi)</li>
            <li>Review & Submit</li>
            <li>Dapatkan nomor pendaftaran & cetak bukti</li>
            <li>Tunggu verifikasi & jadwal wawancara</li>
          </ol>
          <h2 className="font-bold mt-6">Program & Jurusan</h2>
          <p className="text-sm text-slate-600 mt-1">Jurusan: RPL, Tata Boga. Program: Full Day (3 Juz), Boarding (10 Juz), Takhassus (30 Juz).</p>
          <div className="flex gap-3 mt-6">
            <Link href="/register"><Button>Daftar Sekarang</Button></Link>
            <Link href="/faq"><Button variant="outline">Lihat FAQ</Button></Link>
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}


