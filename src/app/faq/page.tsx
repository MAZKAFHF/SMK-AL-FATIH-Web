"use client";
import { useEffect, useState } from "react";
import { faqService } from "@/lib/services/faq-service";
import type { FAQ } from "@/lib/types/index";
import { Skeleton } from "@/components/ui/skeleton";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(()=>{
    faqService.getAll().then(data=>{
      if(data.length===0){
        const defaults: FAQ[] = [
          { id:"1", question:"Apa saja jurusan yang tersedia?", answer:"RPL dan Tata Boga.", category:"Umum", order:1, published:true, createdAt: Date.now(), updatedAt: Date.now() },
          { id:"2", question:"Berapa biaya pendaftaran?", answer:"Informasi biaya dapat dilihat di halaman PPDB atau hubungi admin.", category:"PPDB", order:2, published:true, createdAt: Date.now(), updatedAt: Date.now() },
          { id:"3", question:"Apakah ada asrama?", answer:"Ya, tersedia asrama profesional & aman untuk Boarding dan Takhassus.", category:"Fasilitas", order:3, published:true, createdAt: Date.now(), updatedAt: Date.now() },
          { id:"4", question:"Bagaimana cara cek status pendaftaran?", answer:"Masuk ke /admissions/status dan masukkan nomor pendaftaran.", category:"PPDB", order:4, published:true, createdAt: Date.now(), updatedAt: Date.now() },
          { id:"5", question:"Target hafalan berapa?", answer:"Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz.", category:"Program", order:5, published:true, createdAt: Date.now(), updatedAt: Date.now() },
        ];
        setFaqs(defaults);
      } else setFaqs(data.filter(f=>f.published));
      setLoading(false);
    });
  },[]);

  if(loading) return <div className="mx-auto max-w-3xl px-4 py-10 space-y-3"><Skeleton className="h-16" /><Skeleton className="h-16" /><Skeleton className="h-16" /></div>;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">FAQ</h1>
        <div className="space-y-3 mt-6">
          {faqs.map(f=>(
            <div key={f.id} className="bg-white rounded-2xl border">
              <button onClick={()=> setOpen(open===f.id ? null : f.id)} className="w-full text-left p-4 flex justify-between items-center">
                <span className="font-semibold text-sm">{f.question}</span><span className={`transition ${open===f.id ? "rotate-180": ""}`}>⌄</span>
              </button>
              {open===f.id && <div className="px-4 pb-4 text-sm text-slate-600">{f.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


