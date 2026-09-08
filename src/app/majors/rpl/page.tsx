import { Card, CardContent } from "@/components/ui/card";
import { SafeImage } from "@/components/SafeImage";

export default function RPLPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Rekayasa Perangkat Lunak (RPL)</h1>
        <SafeImage src="/images/rpl.jpg" alt="Laboratorium RPL SMK Tahfizh Al-Fatih - siswa praktik komputer" fallbackCategory="major" className="mt-6 rounded-2xl w-full h-[280px] object-cover border bg-white" />
        <Card className="mt-6"><CardContent className="p-6 space-y-3">
          <p className="text-slate-600">Jurusan yang fokus pada pemrograman, pembuatan aplikasi, website, dan pengembangan perangkat lunak.</p>
          <h3 className="font-semibold">Kompetensi:</h3>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Pemrograman Web & Mobile</li>
            <li>Basis Data & Backend</li>
            <li>UI/UX Design</li>
            <li>Project Based Learning - Buat aplikasi nyata</li>
          </ul>
        </CardContent></Card>
      </div>
    </div>
  );
}


