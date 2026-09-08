"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { newsService } from "@/lib/services/news-service";
import type { NewsItem } from "@/lib/types/index";
import { formatDate } from "@/lib/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import { SafeImage } from "@/components/SafeImage";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    newsService.getPublished().then(data=>{
      if(data.length===0){
        const defaults: NewsItem[] = [
          { id:"1", title:"Kegiatan Tahfizh Akbar 2026 Sukses Digelar", slug:"tahfizh-akbar-2026", excerpt:"Kegiatan tahfizh akbar diikuti seluruh siswa dan wali murid...", content:"Konten lengkap...", coverImage:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop", author:"Admin", status:"PUBLISHED", publishedAt: Date.now(), tags:["tahfizh"], featured:true, createdAt: Date.now(), updatedAt: Date.now() },
          { id:"2", title:"Siswa RPL Juara Lomba Web Design Provinsi", slug:"rpl-juara-web", excerpt:"Prestasi membanggakan dari jurusan RPL...", content:"Konten...", coverImage:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop", author:"Admin", status:"PUBLISHED", publishedAt: Date.now()-86400000, tags:["rpl","prestasi"], featured:false, createdAt: Date.now(), updatedAt: Date.now() },
          { id:"3", title:"Praktik Tata Boga: Siswa Sajikan Menu Internasional", slug:"tata-boga-praktik", excerpt:"Praktik dapur standar industri...", content:"Konten...", coverImage:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=400&fit=crop", author:"Admin", status:"PUBLISHED", publishedAt: Date.now()-172800000, tags:["tata-boga"], featured:false, createdAt: Date.now(), updatedAt: Date.now() },
        ];
        setNews(defaults);
      } else setNews(data);
      setLoading(false);
    });
  },[]);

  const filtered = news.filter(n=> n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase()));

  if(loading) return <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-4"><Skeleton className="h-64" /><Skeleton className="h-64" /><Skeleton className="h-64" /></div>;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Berita</h1>
        <Input placeholder="Cari berita..." value={search} onChange={e=>setSearch(e.target.value)} className="mt-4 max-w-md" />
        {filtered.length===0 ? <p className="text-center text-slate-500 py-12">Belum ada berita.</p> : (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {filtered.map(item=>(
              <Link key={item.id} href={`/news/${item.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition h-full">
                  <SafeImage src={item.coverImage} alt={item.title} fallbackCategory="news" className="h-48 w-full object-cover" />
                  <CardContent className="p-4">
                    {item.featured && <Badge className="mb-2 bg-amber-50 text-amber-700 border-amber-200">Featured</Badge>}
                    <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mt-1">{item.excerpt}</p>
                    <p className="text-xs text-slate-500 mt-2">{item.author} • {item.publishedAt ? formatDate(item.publishedAt) : ""}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


