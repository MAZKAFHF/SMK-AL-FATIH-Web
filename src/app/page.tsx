import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig, majorsConfig, facilitiesConfig } from "@/config/site";
import { ArrowRight, Award, BookOpen, Building2, Users, GraduationCap, ShieldCheck, Utensils, Code2, Heart, Building, Waves, Target, MapPin, Calendar, Newspaper, Sparkles, BookMarked, Lightbulb, Home as HomeIcon, Globe } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { LiveStats } from "@/components/LiveStats";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm border border-white/20">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                PPDB 2026/2027 Telah Dibuka
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight">
                SMK <span className="text-amber-400">TAHFIZH</span><br />AL-FATIH
              </h1>
              <p className="text-xl font-medium text-emerald-100 italic">
                &quot;Berilmu, Berakhlak, Berprestasi,<br />Siap Membangun Peradaban Bangsa.&quot;
              </p>
              <p className="text-sm text-emerald-100/80 border-l-2 border-amber-400 pl-4">
                {siteConfig.slogan} — Yayasan Ayo Indonesia Mengaji<br />
                Jl. Rasamala, Pekanbaru — Sebelah SPBU Soekarno-Hatta
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/register"><Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white shadow-xl">Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                <Link href="/programs"><Button size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white hover:text-emerald-900">Lihat Program</Button></Link>
                <Link href="/contact"><Button size="lg" variant="ghost" className="text-white hover:bg-white/10">Hubungi Sekolah</Button></Link>
              </div>
              <div className="flex gap-6 pt-4 text-sm">
                <div><p className="text-2xl font-bold">3</p><p className="text-emerald-200">Program Tahfizh</p></div>
                <div className="h-10 w-px bg-white/20" />
                <div><p className="text-2xl font-bold">1</p><p className="text-emerald-200">Jurusan</p></div>
                <div className="h-10 w-px bg-white/20" />
                <div><p className="text-2xl font-bold">11+</p><p className="text-emerald-200">Fasilitas</p></div>
                <div className="h-10 w-px bg-white/20 hidden sm:block" />
                <div className="hidden sm:block"><p className="text-lg font-bold flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /><LiveStats /></p><p className="text-emerald-200 text-xs">Live Database</p></div>
              </div>
            </div>
            <div className="relative lg:h-[520px] flex items-center justify-center">
              <div className="relative bg-white rounded-[2rem] p-3 shadow-xl w-full max-w-[560px]">
                <SafeImage src="/images/hero.jpg" alt="Gedung SMK Tahfizh Al-Fatih Pekanbaru" fallbackCategory="hero" className="rounded-[1.5rem] w-full h-[400px] lg:h-[460px] object-cover bg-emerald-50" />
                <div className="absolute -bottom-4 -left-4 lg:bottom-2 lg:left-2 bg-white rounded-2xl p-4 shadow-lg border flex gap-3 items-center text-slate-900">
                  <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white"><Award className="h-6 w-6" /></div>
                  <div><p className="font-bold text-sm leading-none">Akreditasi Baik</p><p className="text-xs text-slate-500 mt-1">Berstandar Nasional</p></div>
                </div>
                <div className="absolute -top-3 -right-3 lg:-top-2 lg:-right-2 bg-amber-500 text-white rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-[11px] opacity-90 tracking-wide uppercase">Target Hafalan</p><p className="font-black text-sm leading-none mt-1">Hingga 30 Juz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge status="PUBLISHED" className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-200">Tentang Sekolah</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Membangun Generasi Qur&apos;ani, Profesional & Berakhlak</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">SMK Tahfizh Al-Fatih di bawah Yayasan Ayo Indonesia Mengaji / Al Fatih Islamic Center adalah sekolah swasta di Pekanbaru yang mengintegrasikan Kurikulum Nasional, Fitrah Based Education, dan Tahfizh Al-Qur&apos;an & Kajian Agama.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, title: "Kurikulum Nasional", desc: "Standar nasional terintegrasi" },
                  { icon: Heart, title: "Fitrah Based Education", desc: "Pendidikan berbasis fitrah" },
                  { icon: BookMarked, title: "Tahfizh & Kajian Agama", desc: "Al-Qur'an & keislaman" },
                  { icon: Lightbulb, title: "Entrepreneurship", desc: "Jiwa wirausaha" },
                ].map(item=>(
                  <div key={item.title} className="flex gap-3 p-3 rounded-xl border bg-slate-50/50">
                    <item.icon className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div><p className="font-semibold text-sm">{item.title}</p><p className="text-xs text-slate-500">{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex mt-6"><Button variant="outline">Selengkapnya <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SafeImage src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=500&fit=crop" alt="Kegiatan" className="rounded-2xl h-72 w-full object-cover" />
              <div className="space-y-4">
                <SafeImage src="https://images.unsplash.com/photo-1509062522246-3755977927d?w=400&h=300&fit=crop" alt="Lab" className="rounded-2xl h-36 w-full object-cover" />
                <div className="bg-emerald-600 rounded-2xl p-5 text-white">
                  <p className="text-3xl font-black">350m</p><p className="text-sm opacity-90">dari RS Sansani, sebelah SPBU Soekarno-Hatta</p>
                </div>
                <SafeImage src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop" alt="Masjid" className="rounded-2xl h-32 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold">Keunggulan Kami</h2>
            <p className="text-slate-600 mt-3">Pendidikan holistik yang memadukan ilmu, iman, dan keterampilan masa depan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookMarked, title: "Tahfizh Terstruktur", desc: "Target 3, 10, hingga 30 Juz" },
              { icon: Building2, title: "Fasilitas Lengkap", desc: "Masjid, lab, kolam, berkuda" },
              { icon: ShieldCheck, title: "Lingkungan Aman", desc: "Satpam 24 jam & CCTV" },
              { icon: GraduationCap, title: "Guru Profesional", desc: "Berkompeten & amanah" },
            ].map(item=>(
              <Card key={item.title} className="hover:shadow-lg transition"><CardContent className="p-6"><item.icon className="h-8 w-8 text-emerald-600 mb-3" /><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-slate-500 mt-1">{item.desc}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jurusan */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div><Badge className="mb-3">Jurusan</Badge><h2 className="text-3xl font-bold">Fokus Keahlian Unggulan</h2></div>
            <Link href="/majors"><Button variant="outline">Lihat Jurusan</Button></Link>
          </div>
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
            <Card className="overflow-hidden group hover:shadow-xl transition border-emerald-100">
              <div className="h-56 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                <Code2 className="h-24 w-24 text-white/20" />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-white text-xs border border-white/20">Teknologi • Akreditasi Baik</div>
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">Unggulan</div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">Rekayasa Perangkat Lunak (RPL)</h3>
                <p className="text-sm text-slate-600 mt-2">Pemrograman, pembuatan aplikasi, website, dan pengembangan perangkat lunak. Fokus pada industri digital dan kebutuhan masa depan.</p>
                <Link href="/majors/rpl" className="inline-flex mt-4 text-emerald-600 font-medium text-sm hover:gap-2 gap-1.5 transition-all">Pelajari Detail <ArrowRight className="h-4 w-4" /></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Tahfizh */}
      <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm border border-white/20"><BookMarked className="h-4 w-4 text-amber-400" /> Program Tahfizh Al-Qur&apos;an</div>
              <h2 className="text-3xl font-bold mt-4">Menuju Generasi Hafizh Qur&apos;an</h2>
              <p className="text-emerald-100 mt-3">Program tahfizh terstruktur dengan target bertahap, dibimbing ustadz berpengalaman.</p>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { title: "Full Day School", juz: "3 Juz", desc: "Target hafalan" },
                  { title: "Boarding School", juz: "10 Juz", desc: "Asrama profesional" },
                  { title: "Takhassus", juz: "30 Juz", desc: "Intensif hafalan" },
                ].map(p=>(
                  <div key={p.title} className="bg-white text-slate-900 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-emerald-600">{p.juz}</p><p className="font-semibold text-sm">{p.title}</p><p className="text-xs text-slate-500">{p.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/programs/tahfizh" className="inline-flex mt-6"><Button className="bg-amber-500 hover:bg-amber-600">Detail Program</Button></Link>
            </div>
            <SafeImage src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=500&fit=crop" alt="Tahfizh" className="rounded-3xl w-full h-[420px] object-cover" />
          </div>
        </div>
      </section>

      {/* Entrepreneurship & PBL */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center text-white mb-4"><Lightbulb className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">Entrepreneurship & Kelas Bisnis Intensif</h3>
            <p className="text-sm text-slate-600 mt-2">Membekali siswa dengan jiwa wirausaha, manajemen bisnis, dan praktik langsung.</p>
            <Link href="/programs/entrepreneurship"><Button variant="outline" className="mt-4">Pelajari</Button></Link>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white mb-4"><Target className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">Project Based Learning</h3>
            <p className="text-sm text-slate-600 mt-2">Pembelajaran berbasis proyek nyata untuk keterampilan abad 21.</p>
            <Link href="/programs/pbl"><Button variant="outline" className="mt-4">Pelajari</Button></Link>
          </Card>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8"><Badge className="mb-2">Fasilitas</Badge><h2 className="text-3xl font-bold">Fasilitas Modern & Lengkap</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilitiesConfig.map(f=>(
              <div key={f.name} className="bg-white rounded-2xl p-4 border flex gap-3 items-start hover:shadow-md transition">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0"><Building className="h-5 w-5" /></div>
                <div><p className="font-semibold text-sm">{f.name}</p><p className="text-xs text-slate-500">{f.category}</p></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6"><Link href="/facilities"><Button>Lihat Detail Fasilitas</Button></Link></div>
        </div>
      </section>

      {/* Kehidupan Sekolah */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <SafeImage src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=500&fit=crop" alt="Kehidupan" className="rounded-3xl w-full h-[400px] object-cover" />
            <div>
              <h2 className="text-3xl font-bold">Kehidupan Sekolah yang Berkah</h2>
              <p className="text-slate-600 mt-3">Asrama profesional & aman, internasional experience, kolam renang, memanah, berkuda — membangun karakter tangguh dan berakhlak.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Asrama Profesional & Aman","International Experience","Ekstrakurikuler Memanah & Berkuda","Katering Sehat & Bergizi","Lingkungan Islami"].map(x=>(
                  <li key={x} className="flex gap-2"><span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div><h2 className="text-3xl font-bold">Galeri</h2><p className="text-slate-400">Momen terbaik di SMK Tahfizh Al-Fatih</p></div>
            <Link href="/gallery"><Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900">Lihat Galeri</Button></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=400&fit=crop",
            ].map((src,i)=>(
              <SafeImage key={i} src={src} alt="Galeri" className="rounded-2xl h-48 w-full object-cover hover:scale-[1.02] transition" />
            ))}
          </div>
        </div>
      </section>

      {/* Berita & Agenda Preview - will be replaced via client fetch but static for now */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold flex items-center gap-2"><Newspaper className="h-6 w-6 text-emerald-600" />Berita Terbaru</h2><Link href="/news" className="text-sm text-emerald-600 font-medium">Lihat Semua</Link></div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[1,2].map(i=>(
                <Card key={i} className="overflow-hidden hover:shadow-md transition">
                  <SafeImage src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=300&fit=crop`} alt="Berita" className="h-40 w-full object-cover" />
                  <CardContent className="p-4"><Badge className="mb-2">Berita</Badge><h3 className="font-semibold line-clamp-2">Kegiatan Tahfizh Akbar SMK Al-Fatih 2026</h3><p className="text-xs text-slate-500 mt-1">12 Jan 2026 • Admin</p></CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold flex items-center gap-2"><Calendar className="h-6 w-6 text-amber-600" />Agenda</h2><Link href="/events" className="text-sm text-emerald-600 font-medium">Lihat Semua</Link></div>
            <div className="space-y-3">
              {[1,2,3].map(i=>(
                <Card key={i} className="p-4 flex gap-3">
                  <div className="h-14 w-14 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center flex-shrink-0"><span className="text-xs">JAN</span><span className="font-bold leading-none">{10+i}</span></div>
                  <div><p className="font-semibold text-sm">Sosialisasi PPDB 2026</p><p className="text-xs text-slate-500">08:00 • Aula Masjid Al-Fatih</p></div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold">FAQ</h2><p className="text-slate-600">Pertanyaan yang sering diajukan</p></div>
          <div className="space-y-3">
            {[
              { q: "Apa saja jurusan yang tersedia?", a: "Saat ini fokus pada RPL (Rekayasa Perangkat Lunak) — jurusan unggulan berbasis teknologi." },
              { q: "Berapa target hafalan?", a: "Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz." },
              { q: "Apakah ada asrama?", a: "Ya, asrama profesional & aman tersedia untuk program Boarding & Takhassus." },
              { q: "Bagaimana cara mendaftar PPDB?", a: "Klik Daftar Sekarang, buat akun, isi form, unggah dokumen, submit, dan cek status." },
            ].map(item=>(
              <details key={item.q} className="bg-white rounded-2xl border p-4 group open:shadow-sm">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{item.q}<span className="text-slate-400 group-open:rotate-180 transition">⌄</span></summary>
                <p className="text-sm text-slate-600 mt-2">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-6"><Link href="/faq"><Button variant="outline">Lihat Semua FAQ</Button></Link></div>
        </div>
      </section>

      {/* CTA PPDB */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.04]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs border border-white/20 mb-4"><span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /><LiveStats /> • Update realtime</div>
          <Sparkles className="h-10 w-10 mx-auto text-amber-300 mb-4" />
          <h2 className="text-3xl lg:text-4xl font-black">PPDB 2026/2027 Telah Dibuka!</h2>
          <p className="text-emerald-100 mt-3">Bergabunglah bersama SMK Tahfizh Al-Fatih — Berilmu, Berakhlak, Berprestasi.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/register"><Button size="lg" className="bg-white text-emerald-700 hover:bg-slate-100">Daftar Sekarang</Button></Link>
            <Link href="/admissions/status"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-700 bg-white/10">Cek Status Pendaftaran</Button></Link>
          </div>
        </div>
      </section>

      {/* Lokasi */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2"><MapPin className="h-7 w-7 text-emerald-600" />Lokasi Sekolah</h2>
            <p className="text-slate-600 mt-3">{siteConfig.address}</p>
            <p className="text-sm text-amber-600 mt-1">{siteConfig.landmark}</p>
            <div className="mt-4 flex gap-2">
              <a href="https://maps.google.com/?q=Gedung+SMPIT+Tahfizh+Al+Fatih+Pekanbaru+Jl+Rasamala+Kompleks+Beringin+Indah" target="_blank" className="inline-flex"><Button>Lihat di Google Maps</Button></a>
              <Link href="/contact"><Button variant="outline">Kontak</Button></Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border h-[320px] bg-slate-100 flex items-center justify-center">
            <iframe
              src="https://maps.google.com/maps?q=Gedung%20SMPIT%20Tahfizh%20Al%20Fatih%20Pekanbaru%20Jl%20Rasamala%20Kompleks%20Beringin%20Indah&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Gedung SMPIT Tahfizh Al Fatih Pekanbaru"
            />
          </div>
        </div>
      </section>
    </div>
  );
}



