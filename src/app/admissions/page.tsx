import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdmissionsPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-700 to-teal-700 rounded-3xl p-8 lg:p-12 text-white">
          <h1 className="text-3xl lg:text-4xl font-black">PPDB SMK Tahfizh Al-Fatih</h1>
          <p className="text-emerald-100 mt-3 max-w-2xl">Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027. Bergabung bersama generasi Qur&apos;ani, berilmu, berakhlak, dan berprestasi.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/register"><Button size="lg" className="bg-amber-500 hover:bg-amber-600">Daftar Sekarang</Button></Link>
            <Link href="/admissions/status"><Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-700">Cek Status</Button></Link>
            <Link href="/admissions/requirements"><Button size="lg" variant="ghost" className="text-white hover:bg-white/10">Syarat & Alur</Button></Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card><CardContent className="p-6"><h3 className="font-bold">Jurusan</h3><p className="text-sm text-slate-600 mt-1">RPL & Tata Boga dengan kurikulum industri.</p><Link href="/majors" className="text-sm text-emerald-600 font-medium mt-3 inline-block">Lihat →</Link></CardContent></Card>
          <Card><CardContent className="p-6"><h3 className="font-bold">Program</h3><p className="text-sm text-slate-600 mt-1">Tahfizh 3/10/30 Juz, Boarding & Full Day.</p><Link href="/programs" className="text-sm text-emerald-600 font-medium mt-3 inline-block">Lihat →</Link></CardContent></Card>
          <Card><CardContent className="p-6"><h3 className="font-bold">Alur</h3><p className="text-sm text-slate-600 mt-1">Daftar → Isi Form → Submit → Verifikasi → Wawancara → Pengumuman.</p><Link href="/admissions/requirements" className="text-sm text-emerald-600 font-medium mt-3 inline-block">Lihat →</Link></CardContent></Card>
        </div>

        <Card className="mt-8"><CardContent className="p-6">
          <h2 className="text-xl font-bold">Timeline PPDB</h2>
          <ol className="mt-4 space-y-3 text-sm">
            {[
              "Pembukaan Pendaftaran: Januari 2026",
              "Pengisian Form & Upload Dokumen",
              "Verifikasi Dokumen oleh Admin",
              "Wawancara Calon Siswa & Orang Tua",
              "Pengumuman Hasil Seleksi",
              "Daftar Ulang"
            ].map((t,i)=>(<li key={i} className="flex gap-3"><span className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0">{i+1}</span>{t}</li>))}
          </ol>
        </CardContent></Card>
      </div>
    </div>
  );
}


