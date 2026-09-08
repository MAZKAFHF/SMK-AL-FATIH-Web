"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { eventService } from "@/lib/services/event-service";
import type { EventItem } from "@/lib/types/index";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SafeImage } from "@/components/SafeImage";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    eventService.getAll().then(data=>{
      if(data.length===0){
        const defaults: EventItem[] = [
          { id:"1", title:"Sosialisasi PPDB 2026", description:"Sosialisasi penerimaan peserta didik baru untuk wali calon siswa.", date:"2026-01-15", startTime:"08:00", endTime:"11:00", location:"Aula Masjid Al-Fatih", image:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop", status:"PUBLISHED", createdAt: Date.now(), updatedAt: Date.now() },
          { id:"2", title:"Tes Seleksi & Wawancara", description:"Tes akademik dan wawancara calon peserta didik.", date:"2026-02-10", startTime:"08:00", endTime:"15:00", location:"Gedung Sekolah", image:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop", status:"PUBLISHED", createdAt: Date.now(), updatedAt: Date.now() },
          { id:"3", title:"Pengumuman Hasil Seleksi", description:"Pengumuman hasil seleksi PPDB.", date:"2026-02-20", startTime:"10:00", endTime:"12:00", location:"Website & Mading", image:"https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=400&fit=crop", status:"PUBLISHED", createdAt: Date.now(), updatedAt: Date.now() },
        ];
        setEvents(defaults);
      } else setEvents(data.filter(e=> e.status==="PUBLISHED"));
      setLoading(false);
    });
  },[]);

  if(loading) return <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-4"><Skeleton className="h-56" /><Skeleton className="h-56" /><Skeleton className="h-56" /></div>;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Agenda</h1>
        {events.length===0 ? <p className="text-center py-12 text-slate-500">Belum ada agenda.</p> : (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {events.map(ev=>(
              <Card key={ev.id} className="overflow-hidden"><SafeImage src={ev.image} alt={ev.title} fallbackCategory="event" className="h-44 w-full object-cover" /><CardContent className="p-4"><Badge>{ev.date}</Badge><h3 className="font-semibold mt-2">{ev.title}</h3><p className="text-sm text-slate-600 mt-1">{ev.description}</p><p className="text-xs text-slate-500 mt-2">{ev.startTime} - {ev.endTime} • {ev.location}</p></CardContent></Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


