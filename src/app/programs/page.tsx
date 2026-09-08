import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProgramsPage() {
  const programs = [
    { slug: "tahfizh", title: "Program Tahfizh Al-Qur'an", desc: "Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz", href: "/programs/tahfizh" },
    { slug: "entrepreneurship", title: "Entrepreneurship & Kelas Bisnis Intensif", desc: "Jiwa wirausaha dan keterampilan bisnis praktis", href: "/programs/entrepreneurship" },
    { slug: "pbl", title: "Project Based Learning", desc: "Pembelajaran berbasis proyek nyata", href: "/programs/pbl" },
    { slug: "asrama", title: "Asrama Profesional & Aman", desc: "Lingkungan asrama yang nyaman dan terkontrol", href: "/programs" },
    { slug: "international", title: "International Experience", desc: "Wawasan global untuk siswa", href: "/programs" },
  ];
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Program Unggulan</h1>
        <p className="text-slate-600 mt-2">Program yang dirancang untuk membentuk generasi Qur&apos;ani dan profesional.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {programs.map(p=>(
            <Card key={p.slug} className="hover:shadow-md transition"><CardContent className="p-6"><h3 className="font-bold">{p.title}</h3><p className="text-sm text-slate-600 mt-1">{p.desc}</p><Link href={p.href} className="inline-flex mt-4"><Button variant="outline" size="sm">Lihat Detail</Button></Link></CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}


