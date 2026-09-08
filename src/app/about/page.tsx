import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight">Tentang SMK Tahfizh Al-Fatih</h1>
          <p className="text-slate-600 mt-3">Yayasan Ayo Indonesia Mengaji / Al Fatih Islamic Center — Sekolah Swasta di Pekanbaru</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Profil Sekolah</h2>
              <p className="text-slate-600 leading-relaxed">SMK Tahfizh Al-Fatih berlokasi di Jl. Rasamala, Kompleks Beringin Indah, Kelurahan Sidomulyo Timur, Kecamatan Marpoyan Damai, Kota Pekanbaru, Provinsi Riau. Sebelah SPBU Soekarno-Hatta, sekitar 350 meter dari Rumah Sakit Sansani.</p>
              <p className="text-slate-600 leading-relaxed">Sekolah ini mengusung motto <strong>&quot;{siteConfig.motto}&quot;</strong> dan slogan <strong>&quot;{siteConfig.slogan}&quot;</strong>. Kurikulum memadukan Kurikulum Nasional, Fitrah Based Education, serta Tahfizh Al-Qur&apos;an & Kajian Agama.</p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border"><p className="text-xs text-slate-500">Instansi Pembina</p><p className="font-semibold text-sm">{siteConfig.foundation}</p></div>
                <div className="p-3 rounded-xl bg-slate-50 border"><p className="text-xs text-slate-500">Status</p><p className="font-semibold text-sm">{siteConfig.type}</p></div>
              </div>
              <Link href="/about/vision-mission"><Button variant="outline">Visi & Misi</Button></Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold">Identitas</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><strong>Nama:</strong> {siteConfig.name}</li>
                <li><strong>Alamat:</strong> {siteConfig.address}</li>
                <li><strong>Patokan:</strong> {siteConfig.landmark}</li>
                <li><strong>Motto:</strong> {siteConfig.motto}</li>
                <li><strong>Slogan:</strong> {siteConfig.slogan}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Model Kurikulum</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {[
              { title: "Kurikulum Nasional", desc: "Mengikuti standar nasional pendidikan Indonesia dengan penyesuaian kebutuhan industri." },
              { title: "Fitrah Based Education", desc: "Pendidikan yang mengasah fitrah anak sesuai bakat dan potensi alaminya." },
              { title: "Tahfizh Al-Qur'an & Kajian Agama", desc: "Pembiasaan menghafal, memahami, dan mengamalkan Al-Qur'an." },
            ].map(item=>(
              <Card key={item.title}><CardContent className="p-5"><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-slate-600 mt-1">{item.desc}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


