"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { facilityService } from "@/lib/services/facility-service";
import type { Facility } from "@/lib/types/index";
import { facilitiesConfig } from "@/config/site";
import { Skeleton } from "@/components/ui/skeleton";
import { SafeImage } from "@/components/SafeImage";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    facilityService.getAll().then(data=>{
      if(data.length===0){
        const imageMap: Record<string, string> = {
          "Masjid Al-Fatih Islamic Center": "/images/facility-masjid.jpg",
          "Laboratorium Komputer": "/images/facility-lab.jpg",
          "Dapur Standar Industri": "/images/facility-kitchen.jpg",
          "Gedung sekolah modern": "/images/facility-gedung.jpg",
          "Ruang belajar ber-AC": "/images/facility-kelas.jpg",
          "Kolam renang": "/images/facility-pool.jpg",
          "Area memanah": "/images/facility-memanah.jpg",
          "Fasilitas berkuda": "/images/facility-berkuda.jpg",
          "Satpam 24 jam": "/images/facility-satpam.jpg",
          "CCTV": "/images/facility-cctv.jpg",
          "Katering makanan sehat dan bergizi": "/images/facility-katering.jpg",
        };
        // show default
        setFacilities(facilitiesConfig.map((f,i)=>({
          id: String(i),
          name: f.name,
          description: `${f.name} - fasilitas unggulan SMK Tahfizh Al-Fatih`,
          imageUrl: imageMap[f.name] || "/images/facility-fallback.svg",
          category: f.category,
          order: i,
          published: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })) as Facility[]);
      } else {
        setFacilities(data.filter(f=>f.published));
      }
      setLoading(false);
    });
  }, []);

  if(loading) return <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-4"><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /></div>;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Fasilitas</h1>
        <p className="text-slate-600 mt-2">Fasilitas modern untuk mendukung pembelajaran dan pengembangan karakter.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {facilities.map(f=>(
            <Card key={f.id} className="overflow-hidden hover:shadow-md transition"><SafeImage src={f.imageUrl} alt={`${f.name} SMK Tahfizh Al-Fatih`} fallbackCategory="facility" className="h-40 w-full object-cover" /><CardContent className="p-4"><p className="text-xs text-emerald-600 font-medium">{f.category}</p><h3 className="font-semibold">{f.name}</h3><p className="text-sm text-slate-600 mt-1 line-clamp-2">{f.description}</p></CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}


