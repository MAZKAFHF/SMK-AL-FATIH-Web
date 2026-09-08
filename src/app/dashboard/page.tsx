"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getApplicantSession } from "@/lib/auth/applicant-auth";
import { applicantService } from "@/lib/services/applicant-service";
import { interviewService } from "@/lib/services/interview-service";
import { documentService } from "@/lib/services/document-service";
import { notificationService } from "@/lib/services/notification-service";
import { announcementService } from "@/lib/services/announcement-service";
import type { Applicant, Interview, ApplicationDocument, Notification, Announcement } from "@/lib/types/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/cn";

export default function DashboardPage() {
  const router = useRouter();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [docs, setDocs] = useState<ApplicationDocument[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const session = getApplicantSession();
    if(!session){
      router.replace("/login");
      return;
    }
    const id = session.applicantId;
    applicantService.getApplicant(id).then(a=>{
      setApplicant(a);
      if(a) documentService.ensureDefaults(a.id);
    });
    const unsubInt = interviewService.subscribeByApplicant(id, setInterviews);
    const unsubDoc = documentService.subscribeByApplicant(id, setDocs);
    const unsubNotif = notificationService.subscribeByRecipient(id, setNotifications);
    announcementService.getPublished().then(setAnnouncements);
    setLoading(false);
    return ()=>{
      unsubInt(); unsubDoc(); unsubNotif();
    };
  },[router]);

  useEffect(()=>{
    if(!applicant) return;
    const unsub = applicantService.subscribeOne(applicant.id, (data)=>{
      if(data) setApplicant(data);
    });
    return ()=> unsub();
  },[applicant?.id]);

  if(loading || !applicant) return <div className="mx-auto max-w-5xl px-4 py-10">Memuat...</div>;

  const progressMap: Record<string, number> = {
    DRAFT: 20,
    SUBMITTED: 40,
    UNDER_REVIEW: 60,
    INTERVIEW: 80,
    ACCEPTED: 100,
    REJECTED: 100,
    WAITING_LIST: 90,
    COMPLETED: 100,
  };
  const progress = progressMap[applicant.status] || 10;

  const timeline = [
    { key:"created", label:"Registrasi Dibuat", done: true, date: applicant.createdAt },
    { key:"completed", label:"Data Lengkap", done: applicant.nik && applicant.nisn ? true : false },
    { key:"submitted", label:"Terkirim", done: ["SUBMITTED","UNDER_REVIEW","INTERVIEW","ACCEPTED","REJECTED","WAITING_LIST","COMPLETED"].includes(applicant.status), date: applicant.submittedAt },
    { key:"review", label:"Ditinjau", done: ["UNDER_REVIEW","INTERVIEW","ACCEPTED","REJECTED","WAITING_LIST","COMPLETED"].includes(applicant.status) },
    { key:"interview", label:"Wawancara", done: ["INTERVIEW","ACCEPTED","REJECTED","WAITING_LIST","COMPLETED"].includes(applicant.status) },
    { key:"final", label: applicant.status==="ACCEPTED" ? "Diterima" : applicant.status==="REJECTED" ? "Ditolak" : "Keputusan", done: ["ACCEPTED","REJECTED","WAITING_LIST","COMPLETED"].includes(applicant.status) },
  ];

  const isLocked = applicant.isLocked;

  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Peserta</h1>
            <p className="text-slate-600">Selamat datang, {applicant.name} • <span className="font-mono text-sm">{applicant.registrationNumber}</span></p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/form"><Button variant="outline">Edit Data</Button></Link>
            <Link href="/dashboard/registration-proof"><Button>Cetak Bukti</Button></Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Ringkas Pendaftaran</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div><p className="text-slate-500">Nama</p><p className="font-medium">{applicant.name}</p></div>
                <div><p className="text-slate-500">No. Pendaftaran</p><p className="font-mono font-medium">{applicant.registrationNumber}</p></div>
                <div><p className="text-slate-500">Jurusan Pilihan 1</p><p className="font-medium">{applicant.majorChoice1 || "-"}</p></div>
                <div><p className="text-slate-500">Jurusan Pilihan 2</p><p className="font-medium">{applicant.majorChoice2 || "-"}</p></div>
                <div><p className="text-slate-500">Program</p><p className="font-medium">{applicant.programChoice}</p></div>
                <div><p className="text-slate-500">Status</p><Badge status={applicant.status} /></div>
              </div>
              <div className="pt-3">
                <div className="flex justify-between text-sm mb-1"><span>Progress</span><span>{progress}%</span></div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 transition-all" style={{width:`${progress}%`}} /></div>
              </div>
              {isLocked && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">Data telah dikirim dan sedang diproses. Hubungi admin jika perlu perubahan.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent>
              <ol className="relative border-l border-slate-200 ml-2 space-y-4">
                {timeline.map(item=>(
                  <li key={item.key} className="ml-4">
                    <span className={`absolute -left-1.5 mt-1 h-3 w-3 rounded-full ${item.done ? "bg-emerald-600" : "bg-slate-300"}`} />
                    <p className={`text-sm ${item.done ? "font-medium" : "text-slate-500"}`}>{item.label}</p>
                    {item.date && <p className="text-xs text-slate-500">{formatDate(item.date)}</p>}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader><CardTitle>Dokumen</CardTitle></CardHeader>
            <CardContent>
              {docs.length===0 ? <p className="text-sm text-slate-500">Belum ada dokumen.</p> : (
                <ul className="space-y-2">
                  {docs.map(d=>(
                    <li key={d.id} className="flex justify-between items-center p-2 rounded-xl border">
                      <div><p className="text-sm font-medium">{d.label}</p><p className="text-xs text-slate-500">{d.type} • {d.fileName || "Belum upload"}</p></div>
                      <Badge status={d.status} />
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/dashboard/documents" className="inline-flex mt-3"><Button variant="outline" size="sm">Kelola Dokumen</Button></Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Wawancara</CardTitle></CardHeader>
            <CardContent>
              {interviews.length===0 ? <p className="text-sm text-slate-500">Belum ada jadwal wawancara.</p> : (
                <ul className="space-y-2">
                  {interviews.map(iv=>(
                    <li key={iv.id} className="p-3 rounded-xl border">
                      <p className="text-sm font-medium">{iv.date} • {iv.time}</p>
                      <p className="text-xs text-slate-600">{iv.location} • Pewawancara: {iv.interviewer}</p>
                      <Badge status={iv.status} className="mt-1" />
                      {iv.notes && <p className="text-xs mt-1">{iv.notes}</p>}
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/dashboard/interview"><Button variant="outline" size="sm" className="mt-3">Lihat Detail</Button></Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader><CardTitle>Pengumuman</CardTitle></CardHeader>
            <CardContent>
              {announcements.length===0 ? <p className="text-sm text-slate-500">Belum ada pengumuman.</p> : (
                <ul className="space-y-2">
                  {announcements.slice(0,3).map(a=>(
                    <li key={a.id} className="p-3 rounded-xl border">
                      <p className="font-medium text-sm">{a.title}</p><p className="text-sm text-slate-600">{a.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notifikasi</CardTitle></CardHeader>
            <CardContent>
              {notifications.length===0 ? <p className="text-sm text-slate-500">Belum ada notifikasi.</p> : (
                <ul className="space-y-2">
                  {notifications.slice(0,5).map(n=>(
                    <li key={n.id} className={`p-3 rounded-xl border ${n.read ? "bg-white" : "bg-emerald-50 border-emerald-200"}`}>
                      <p className="font-medium text-sm">{n.title}</p><p className="text-sm text-slate-600">{n.message}</p><p className="text-xs text-slate-500">{formatDate(n.createdAt)}</p>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/dashboard/notifications"><Button variant="outline" size="sm" className="mt-3">Lihat Semua</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


