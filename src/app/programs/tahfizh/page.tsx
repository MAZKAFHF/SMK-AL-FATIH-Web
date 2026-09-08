import { Card, CardContent } from "@/components/ui/card";

import { SafeImage } from "@/components/SafeImage";

export default function TahfizhPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Program Tahfizh Al-Qur&apos;an</h1>
        <SafeImage src="/images/tahfizh.jpg" alt="Siswa tahfizh Al-Quran SMK Al-Fatih" fallbackCategory="program" className="mt-4 rounded-2xl w-full h-[280px] object-cover border bg-white" />
        <p className="text-slate-600 mt-4">Target hafalan bertahap sesuai program pilihan.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { name: "Full Day School", target: "3 Juz", desc: "Siswa pulang pergi, target hafalan 3 juz selama masa studi." },
            { name: "Boarding School", target: "10 Juz", desc: "Asrama, target hafalan 10 juz dengan pembinaan intensif." },
            { name: "Takhassus", target: "30 Juz", desc: "Program khusus hafalan 30 juz bagi yang ingin fokus menjadi hafizh." },
          ].map(item=>(
            <Card key={item.name}><CardContent className="p-6 text-center"><p className="text-3xl font-black text-emerald-600">{item.target}</p><h3 className="font-bold mt-1">{item.name}</h3><p className="text-sm text-slate-600 mt-1">{item.desc}</p></CardContent></Card>
          ))}
        </div>
        <Card className="mt-6"><CardContent className="p-6"><h3 className="font-bold">Metode</h3><p className="text-sm text-slate-600 mt-2">Talaqqi, murajaah harian, ziyadah, dan evaluasi pekanan oleh musyrif berpengalaman. Dilengkapi kajian agama dan pembinaan akhlak.</p></CardContent></Card>
      </div>
    </div>
  );
}


