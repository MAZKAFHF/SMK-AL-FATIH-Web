import { Card, CardContent } from "@/components/ui/card";

import { SafeImage } from "@/components/SafeImage";

export default function EntrepreneurshipPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Entrepreneurship & Kelas Bisnis Intensif</h1>
        <SafeImage src="/images/program-fallback.svg" alt="Kelas Bisnis SMK Al-Fatih" fallbackCategory="program" className="mt-4 rounded-2xl w-full h-[280px] object-cover border bg-white" />
        <Card className="mt-6"><CardContent className="p-6 space-y-3">
          <p className="text-slate-600">Program yang membekali siswa dengan jiwa wirausaha, literasi keuangan, dan keterampilan bisnis praktis.</p>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Business model canvas & lean startup</li>
            <li>Praktik jualan & bazaar sekolah</li>
            <li>Mentoring oleh praktisi</li>
            <li>Project bisnis nyata</li>
          </ul>
        </CardContent></Card>
      </div>
    </div>
  );
}


