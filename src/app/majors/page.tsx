import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MajorsPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Jurusan</h1>
        <p className="text-slate-600 mt-2">Saat ini SMK Tahfizh Al-Fatih fokus pada jurusan unggulan berbasis teknologi.</p>
        <div className="grid md:grid-cols-1 gap-6 mt-6 max-w-2xl">
          <Card className="border-emerald-200 bg-emerald-50/50"><CardContent className="p-6"><h2 className="text-xl font-bold">Rekayasa Perangkat Lunak (RPL)</h2><p className="text-sm text-slate-600 mt-2">Pemrograman, pembuatan aplikasi, website, dan pengembangan perangkat lunak.</p><Link href="/majors/rpl"><Button className="mt-4">Lihat Detail</Button></Link></CardContent></Card>
        </div>
      </div>
    </div>
  );
}


