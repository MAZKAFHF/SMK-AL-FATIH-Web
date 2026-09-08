import { Card, CardContent } from "@/components/ui/card";

import { SafeImage } from "@/components/SafeImage";

export default function PBLPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Project Based Learning</h1>
        <SafeImage src="/images/program-fallback.svg" alt="Project Based Learning SMK Al-Fatih" fallbackCategory="program" className="mt-4 rounded-2xl w-full h-[280px] object-cover border bg-white" />
        <Card className="mt-6"><CardContent className="p-6">
          <p className="text-slate-600">Pembelajaran berbasis proyek nyata untuk mengasah problem solving, kolaborasi, dan kreativitas.</p>
          <ul className="list-disc pl-5 text-sm text-slate-600 mt-3 space-y-1">
            <li>Proyek lintas mata pelajaran</li>
            <li>Presentasi & pameran karya</li>
            <li>Penilaian otentik</li>
          </ul>
        </CardContent></Card>
      </div>
    </div>
  );
}


