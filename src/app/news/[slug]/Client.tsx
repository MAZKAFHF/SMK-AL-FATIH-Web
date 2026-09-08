"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { newsService } from "@/lib/services/news-service";
import type { NewsItem } from "@/lib/types/index";
import { formatDate } from "@/lib/utils/cn";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/SafeImage";

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(!slug) return;
    newsService.getBySlug(slug as string).then(data=>{
      if(!data){
        // fallback mock if not found but check published fetch
        newsService.getPublished().then(list=>{
          const found = list.find(n=> n.slug===slug);
          setItem(found || null);
          setLoading(false);
        });
      } else {
        setItem(data);
        setLoading(false);
      }
    });
    // if slug is mock, provide fallback without DB
    if(slug==="tahfizh-akbar-2026" || slug==="rpl-juara-web" || slug==="tata-boga-praktik"){
      // already handled but ensure
    }
  },[slug]);

  // fallback for demo when DB empty
  useEffect(()=>{
    if(!loading && !item && typeof slug==="string"){
      const mocks: Record<string, NewsItem> = {
        "tahfizh-akbar-2026": { id:"1", title:"Kegiatan Tahfizh Akbar 2026 Sukses Digelar", slug:"tahfizh-akbar-2026", excerpt:"Kegiatan tahfizh akbar...", content:"Acara Tahfizh Akbar 2026 diikuti seluruh siswa, guru, dan wali murid. Kegiatan ini menjadi momentum untuk memotivasi siswa dalam menghafal Al-Qur'an. /n/nAcara diisi dengan murajaah bersama, tausiyah, dan motivasi dari ustadz. Siswa terbaik mendapat penghargaan.", coverImage:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop", author:"Admin", status:"PUBLISHED", publishedAt: Date.now(), tags:["tahfizh"], featured:true, createdAt: Date.now(), updatedAt: Date.now() },
        "rpl-juara-web": { id:"2", title:"Siswa RPL Juara Lomba Web Design Provinsi", slug:"rpl-juara-web", excerpt:"Prestasi membanggakan...", content:"Siswa RPL berhasil meraih juara 1 lomba web design tingkat provinsi. Karya mereka berupa aplikasi manajemen tahfizh.", coverImage:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop", author:"Admin", status:"PUBLISHED", publishedAt: Date.now(), tags:["rpl"], featured:false, createdAt: Date.now(), updatedAt: Date.now() },
        "tata-boga-praktik": { id:"3", title:"Praktik Tata Boga: Siswa Sajikan Menu Internasional", slug:"tata-boga-praktik", excerpt:"Praktik dapur standar industri...", content:"Siswa Tata Boga praktik menyajikan menu internasional dengan standar industri. Dapur dilengkapi peralatan profesional.", coverImage:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=600&fit=crop", author:"Admin", status:"PUBLISHED", publishedAt: Date.now(), tags:["tata-boga"], featured:false, createdAt: Date.now(), updatedAt: Date.now() },
      };
      if(mocks[slug as string]) setItem(mocks[slug as string]);
    }
  },[loading, item, slug]);

  if(loading) return <div className="mx-auto max-w-3xl px-4 py-10 animate-pulse"><div className="h-64 bg-slate-100 rounded-2xl" /></div>;
  if(!item) return <div className="mx-auto max-w-3xl px-4 py-10 text-center"><p>Berita tidak ditemukan.</p><Link href="/news"><Button className="mt-4">Kembali</Button></Link></div>;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="text-sm text-emerald-600">← Kembali ke Berita</Link>
        <SafeImage src={item.coverImage} alt={item.title} fallbackCategory="news" className="mt-4 rounded-2xl w-full h-[380px] object-cover" />
        <h1 className="text-3xl font-bold mt-6">{item.title}</h1>
        <p className="text-sm text-slate-500 mt-2">{item.author} • {item.publishedAt ? formatDate(item.publishedAt) : ""} • {item.tags.join(", ")}</p>
        <Card className="mt-6"><CardContent className="p-6 prose max-w-none text-slate-700 whitespace-pre-wrap">{item.content}</CardContent></Card>
      </div>
    </div>
  );
}

