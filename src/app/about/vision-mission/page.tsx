import { Card, CardContent } from "@/components/ui/card";

export default function VisionMissionPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Visi & Misi</h1>
        <Card className="mt-6"><CardContent className="p-6">
          <h2 className="text-xl font-bold text-emerald-700">Visi</h2>
          <p className="mt-2 text-slate-700 italic">&quot;Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.&quot;</p>
          <h2 className="text-xl font-bold text-emerald-700 mt-6">Misi</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc pl-5">
            <li>Menyelenggarakan pendidikan berbasis Al-Qur&apos;an dan fitrah.</li>
            <li>Membentuk generasi unggul yang berilmu dan berakhlak.</li>
            <li>Mengembangkan keterampilan vokasi sesuai kebutuhan industri (RPL & Tata Boga).</li>
            <li>Menumbuhkan jiwa entrepreneurship dan kemandirian.</li>
            <li>Menciptakan lingkungan belajar Islami, modern, dan profesional.</li>
          </ul>
        </CardContent></Card>
        <Card className="mt-6"><CardContent className="p-6">
          <h2 className="font-bold">Slogan</h2>
          <p className="text-emerald-700 font-semibold mt-1">Bersama Al-Qur&apos;an Membangun Generasi Unggul</p>
        </CardContent></Card>
      </div>
    </div>
  );
}


