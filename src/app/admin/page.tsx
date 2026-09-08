"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { applicantService } from "@/lib/services/applicant-service";
import { newsService } from "@/lib/services/news-service";
import { eventService } from "@/lib/services/event-service";
import { galleryService } from "@/lib/services/gallery-service";
import { facilityService } from "@/lib/services/facility-service";
import { faqService } from "@/lib/services/faq-service";
import { announcementService } from "@/lib/services/announcement-service";
import { majorService } from "@/lib/services/major-service";
import { programService } from "@/lib/services/program-service";
import type { Applicant } from "@/lib/types/index";
import { Users, FileCheck, Clock, Video, CheckCircle, XCircle, Hourglass, Newspaper, Calendar, Image as ImageIcon, Building, HelpCircle, Megaphone, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage(){
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [stats, setStats] = useState({ total:0, submitted:0, review:0, interview:0, accepted:0, waiting:0, rejected:0, today:0 });
  const [recent, setRecent] = useState<Applicant[]>([]);
  const [contentStats, setContentStats] = useState({ news:0, events:0, gallery:0, facilities:0, faqs:0, announcements:0, majors:0, programs:0 });

  useEffect(()=>{
    const unsub = applicantService.subscribeAll((data)=>{
      setApplicants(data);
      const today = data.filter(a=> new Date(a.createdAt).toDateString() === new Date().toDateString()).length;
      setStats({
        total: data.length,
        submitted: data.filter(a=> a.status==="SUBMITTED").length,
        review: data.filter(a=> a.status==="UNDER_REVIEW").length,
        interview: data.filter(a=> a.status==="INTERVIEW").length,
        accepted: data.filter(a=> a.status==="ACCEPTED").length,
        waiting: data.filter(a=> a.status==="WAITING_LIST").length,
        rejected: data.filter(a=> a.status==="REJECTED").length,
        today,
      });
      setRecent(data.slice(0,5));
    });
    // content stats
    const fetchContent = async () => {
      const [news, events, gallery, facilities, faqs, announcements, majors, programs] = await Promise.all([
        newsService.getAll().catch(()=>[]),
        eventService.getAll().catch(()=>[]),
        galleryService.getAll().catch(()=>[]),
        facilityService.getAll().catch(()=>[]),
        faqService.getAll().catch(()=>[]),
        announcementService.getAll().catch(()=>[]),
        majorService.getAll().catch(()=>[]),
        programService.getAll().catch(()=>[]),
      ]);
      setContentStats({
        news: news.length,
        events: events.length,
        gallery: gallery.length,
        facilities: facilities.length,
        faqs: faqs.length,
        announcements: announcements.length,
        majors: majors.length,
        programs: programs.length,
      });
    };
    fetchContent();
    const unsubNews = newsService.subscribeAll((d)=> setContentStats(s=>({...s, news: d.length})));
    const unsubEvents = eventService.subscribeAll((d)=> setContentStats(s=>({...s, events: d.length})));
    const unsubGallery = galleryService.subscribeAll((d)=> setContentStats(s=>({...s, gallery: d.length})));
    const unsubFacilities = facilityService.subscribeAll((d)=> setContentStats(s=>({...s, facilities: d.length})));
    const unsubFaqs = faqService.subscribeAll((d)=> setContentStats(s=>({...s, faqs: d.length})));
    const unsubAnn = announcementService.subscribeAll((d)=> setContentStats(s=>({...s, announcements: d.length})));
    return ()=> { unsub(); unsubNews(); unsubEvents(); unsubGallery(); unsubFacilities(); unsubFaqs(); unsubAnn(); };
  },[]);

  const cards = [
    { label:"Total Pendaftar", value: stats.total, icon: Users, color:"bg-emerald-600" },
    { label:"Hari Ini", value: stats.today, icon: Clock, color:"bg-blue-600" },
    { label:"Terkirim", value: stats.submitted, icon: FileCheck, color:"bg-blue-500" },
    { label:"Ditinjau", value: stats.review, icon: Hourglass, color:"bg-amber-500" },
    { label:"Wawancara", value: stats.interview, icon: Video, color:"bg-purple-600" },
    { label:"Diterima", value: stats.accepted, icon: CheckCircle, color:"bg-emerald-600" },
    { label:"Cadangan", value: stats.waiting, icon: Clock, color:"bg-orange-500" },
    { label:"Ditolak", value: stats.rejected, icon: XCircle, color:"bg-red-600" },
  ];

  const majorStats = applicants.reduce((acc, cur)=>{
    const k = cur.majorChoice1 || "unknown";
    acc[k] = (acc[k]||0)+1;
    return acc;
  }, {} as Record<string, number>);

  const programStats = applicants.reduce((acc, cur)=>{
    const k = cur.programChoice || "unknown";
    acc[k] = (acc[k]||0)+1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {cards.map(c=>(
          <Card key={c.label}><CardContent className="p-4 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl ${c.color} flex items-center justify-center text-white`}><c.icon className="h-5 w-5" /></div>
            <div><p className="text-xs text-slate-500">{c.label}</p><p className="text-xl font-bold">{c.value}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card><CardHeader><CardTitle>Jurusan Paling Diminati</CardTitle></CardHeader><CardContent>
          {Object.keys(majorStats).length===0 ? <p className="text-sm text-slate-500">Belum ada data.</p> : (
            <ul className="space-y-2">
              {Object.entries(majorStats).sort((a,b)=> b[1]-a[1]).map(([k,v])=>(
                <li key={k} className="flex justify-between text-sm"><span>{k}</span><span className="font-semibold">{v}</span></li>
              ))}
            </ul>
          )}
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Program Paling Diminati</CardTitle></CardHeader><CardContent>
          {Object.keys(programStats).length===0 ? <p className="text-sm text-slate-500">Belum ada data.</p> : (
            <ul className="space-y-2">
              {Object.entries(programStats).map(([k,v])=>(
                <li key={k} className="flex justify-between text-sm"><span>{k}</span><span className="font-semibold">{v}</span></li>
              ))}
            </ul>
          )}
        </CardContent></Card>
      </div>

      <Card className="mt-6"><CardHeader><CardTitle>Konten & Pengumuman</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Berita", value: contentStats.news, href: "/admin/news", icon: Newspaper, color: "bg-blue-500" },
              { label: "Agenda", value: contentStats.events, href: "/admin/events", icon: Calendar, color: "bg-amber-500" },
              { label: "Galeri", value: contentStats.gallery, href: "/admin/gallery", icon: ImageIcon, color: "bg-purple-500" },
              { label: "Fasilitas", value: contentStats.facilities, href: "/admin/facilities", icon: Building, color: "bg-emerald-500" },
              { label: "FAQ", value: contentStats.faqs, href: "/admin/faqs", icon: HelpCircle, color: "bg-slate-600" },
              { label: "Pengumuman", value: contentStats.announcements, href: "/admin/announcements", icon: Megaphone, color: "bg-red-500" },
              { label: "Jurusan", value: contentStats.majors, href: "/admin/majors", icon: GraduationCap, color: "bg-indigo-500" },
              { label: "Program", value: contentStats.programs, href: "/admin/programs", icon: BookOpen, color: "bg-teal-500" },
            ].map((c) => (
              <Link key={c.label} href={c.href} className="flex items-center gap-3 p-3 rounded-xl border hover:bg-slate-50 hover:border-emerald-200 transition">
                <div className={`h-9 w-9 rounded-xl ${c.color} flex items-center justify-center text-white shrink-0`}><c.icon className="h-4 w-4" /></div>
                <div><p className="text-xs text-slate-500">{c.label}</p><p className="text-lg font-bold leading-none">{c.value}</p></div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Semua konten terhubung ke Firebase Realtime Database • Klik untuk kelola</p>
        </CardContent>
      </Card>

      <Card className="mt-6"><CardHeader><CardTitle>Pendaftar Terbaru</CardTitle></CardHeader>
        <CardContent>
          {recent.length===0 ? <p className="text-sm text-slate-500">Belum ada pendaftar.</p> : (
            <div className="space-y-2">
              {recent.map(a=>(
                <div key={a.id} className="flex justify-between items-center p-3 rounded-xl border">
                  <div><p className="font-medium text-sm">{a.name}</p><p className="text-xs text-slate-500">{a.registrationNumber} • {a.majorChoice1} • {a.status}</p></div>
                  <a href={`/admin/applicants/${a.id}`} className="text-sm text-emerald-600">Detail</a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminShell>
  );
}


