"use client";
import { useEffect, useState } from "react";
import { galleryService } from "@/lib/services/gallery-service";
import type { GalleryItem } from "@/lib/types/index";
import { Skeleton } from "@/components/ui/skeleton";
import { SafeImage } from "@/components/SafeImage";
import { getSafeImageUrl } from "@/lib/utils/image";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(()=> {
    galleryService.getAll().then(data=>{
      if(data.length===0){
        const defaults: GalleryItem[] = Array.from({length:8}).map((_,i)=>({
          id: String(i),
          imageUrl: `https://images.unsplash.com/photo-${[
            "1497633762265-9d179a990aa6",
            "1523240795612-9a054b0db644",
            "1503676260728-1c00da094a0b",
            "1588072432836-e10032774350",
            "1516979187457-637abb4f9353",
            "1524178232363-1fb2b075b655",
            "1427504494785-3a9ca7044f45",
            "1541339907198-e08756dedf3f"
          ][i]}?w=600&h=600&fit=crop`,
          caption: ["Kegiatan Tahfizh","Praktik RPL","Kelas Tata Boga","Olahraga Berkuda","Asrama","Laboratorium","Memanah","Kegiatan Sekolah"][i],
          category: ["Tahfizh","RPL","Tata Boga","Olahraga","Asrama","Fasilitas","Olahraga","Umum"][i],
          createdAt: Date.now()
        }));
        setItems(defaults);
      } else setItems(data);
      setLoading(false);
    });
  },[]);

  const categories = ["Semua", ...Array.from(new Set(items.map(i=>i.category)))];
  const filtered = filter==="Semua" ? items : items.filter(i=> i.category===filter);

  if(loading) return <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-3"><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /></div>;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Galeri</h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map(c=>(
            <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-1.5 rounded-full text-sm border ${filter===c ? "bg-emerald-600 text-white border-emerald-600" : "bg-white hover:bg-slate-50"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {filtered.map(item=>(
            <div key={item.id} className="group cursor-pointer" onClick={()=> setLightbox(getSafeImageUrl(item.imageUrl, "gallery"))}>
              <SafeImage src={item.imageUrl} alt={item.caption} fallbackCategory="gallery" className="rounded-2xl h-48 w-full object-cover group-hover:opacity-90 transition" />
              <p className="text-sm font-medium mt-2">{item.caption}</p><p className="text-xs text-slate-500">{item.category}</p>
            </div>
          ))}
        </div>
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={()=>setLightbox(null)}>
            <SafeImage src={lightbox} alt="Preview galeri" fallbackCategory="gallery" className="max-w-3xl max-h-[80vh] rounded-2xl object-contain bg-white" />
          </div>
        )}
      </div>
    </div>
  );
}


