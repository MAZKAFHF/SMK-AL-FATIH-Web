"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { applicantService } from "@/lib/services/applicant-service";
import { documentService } from "@/lib/services/document-service";
import { interviewService } from "@/lib/services/interview-service";
import { notificationService } from "@/lib/services/notification-service";
import { auditService } from "@/lib/services/audit-service";
import type { Applicant, ApplicationDocument, Interview, ApplicantStatus } from "@/lib/types/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { getCurrentAdmin } from "@/lib/auth/local-auth";
import { formatDate } from "@/lib/utils/cn";

export default function ApplicantDetailPage(){
  const { id } = useParams<{id:string}>();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [docs, setDocs] = useState<ApplicationDocument[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [status, setStatus] = useState<ApplicantStatus>("DRAFT");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ApplicantStatus | null>(null);
  const [interviewForm, setInterviewForm] = useState({ date:"", time:"", location:"", interviewer:"", notes:"" });
  const [audit, setAudit] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(()=>{
    if(!id) return;
    applicantService.getApplicant(id as string).then(a=>{
      if(a){ setApplicant(a); setStatus(a.status); }
    });
    const unsubDoc = documentService.subscribeByApplicant(id as string, setDocs);
    const unsubInt = interviewService.subscribeByApplicant(id as string, setInterviews);
    // ensure docs exist
    documentService.ensureDefaults(id as string);
    return ()=> { unsubDoc(); unsubInt(); };
  },[id]);

  useEffect(()=>{
    if(!applicant) return;
    const unsub = applicantService.subscribeOne(applicant.id, (data)=>{
      if(data) { setApplicant(data); setStatus(data.status); }
    });
    return ()=> unsub();
  },[applicant?.id]);

  const handleStatusChange = async ()=>{
    if(!applicant || !pendingStatus) return;
    await applicantService.changeStatus(applicant.id, pendingStatus);
    const admin = getCurrentAdmin();
    await auditService.log({ actorId: admin?.username || "admin", actorType:"ADMIN", actorName: admin?.username || "admin", action:"STATUS_CHANGED", resource:"applicant", resourceId: applicant.id, details:`${applicant.status} -> ${pendingStatus}` });
    await notificationService.create({ recipientId: applicant.id, title:"Status Pendaftaran Diperbarui", message:`Status Anda diubah menjadi ${pendingStatus}`, type:"INFO" });
    toast({ title:"Berhasil", description:`Status diubah ke ${pendingStatus}`, type:"success" });
    setConfirmOpen(false);
    setPendingStatus(null);
  };

  const handleVerifyDoc = async (docId:string, newStatus:"VERIFIED"|"REJECTED", reason?:string)=>{
    await documentService.updateStatus(docId, newStatus, undefined, reason);
    toast({ title:"Berhasil", description:`Dokumen ${newStatus}`, type:"success" });
    const admin = getCurrentAdmin();
    await auditService.log({ actorId: admin?.username || "admin", actorType:"ADMIN", actorName: admin?.username || "admin", action:`DOCUMENT_${newStatus}`, resource:"applicationDocuments", resourceId: docId, details: reason || "" });
    if(applicant){
      await notificationService.create({ recipientId: applicant.id, title: newStatus==="VERIFIED" ? "Dokumen Terverifikasi" : "Dokumen Ditolak", message: newStatus==="VERIFIED" ? "Dokumen Anda telah diverifikasi" : `Dokumen ditolak: ${reason}`, type: newStatus==="VERIFIED" ? "SUCCESS":"ERROR" });
    }
  };

  const handleCreateInterview = async ()=>{
    if(!applicant) return;
    if(!interviewForm.date || !interviewForm.time || !interviewForm.location || !interviewForm.interviewer){
      toast({ title:"Error", description:"Lengkapi jadwal", type:"error" }); return;
    }
    const iv = await interviewService.create({ applicantId: applicant.id, date: interviewForm.date, time: interviewForm.time, location: interviewForm.location, interviewer: interviewForm.interviewer, notes: interviewForm.notes, status:"SCHEDULED" });
    await notificationService.create({ recipientId: applicant.id, title:"Jadwal Wawancara", message:`Wawancara pada ${iv.date} ${iv.time} di ${iv.location}`, type:"INFO" });
    const admin = getCurrentAdmin();
    await auditService.log({ actorId: admin?.username || "admin", actorType:"ADMIN", actorName: admin?.username || "admin", action:"CREATE_INTERVIEW", resource:"interviews", resourceId: iv.id });
    toast({ title:"Berhasil", description:"Jadwal wawancara dibuat", type:"success" });
    setInterviewForm({ date:"", time:"", location:"", interviewer:"", notes:"" });
  };

  if(!applicant) return <AdminShell><p>Memuat...</p></AdminShell>;

  return (
    <AdminShell>
      <div className="flex flex-wrap justify-between gap-3">
        <div><h1 className="text-2xl font-bold">{applicant.name}</h1><div className="text-sm font-mono text-slate-600 flex items-center gap-2">{applicant.registrationNumber} • <Badge status={applicant.status} /></div></div>
        <div className="flex gap-2">
          <Select value={status} onChange={e=> { const v=e.target.value as ApplicantStatus; setPendingStatus(v); setConfirmOpen(true); }}>
            <option value="DRAFT">DRAFT</option><option value="SUBMITTED">SUBMITTED</option><option value="UNDER_REVIEW">UNDER_REVIEW</option><option value="INTERVIEW">INTERVIEW</option><option value="ACCEPTED">ACCEPTED</option><option value="WAITING_LIST">WAITING_LIST</option><option value="REJECTED">REJECTED</option><option value="COMPLETED">COMPLETED</option>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data Peserta</TabsTrigger>
          <TabsTrigger value="parents">Orang Tua</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-4">
            <Card><CardHeader><CardTitle>Ringkasan</CardTitle></CardHeader><CardContent className="space-y-1 text-sm">
              <p><strong>Nama:</strong> {applicant.name}</p>
              <p><strong>NIK:</strong> {applicant.nik}</p>
              <p><strong>NISN:</strong> {applicant.nisn}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
              <p><strong>HP:</strong> {applicant.phone}</p>
              <p><strong>Asal Sekolah:</strong> {applicant.originSchool}</p>
              <p><strong>Jurusan:</strong> {applicant.majorChoice1} / {applicant.majorChoice2 || "-"}</p>
              <p><strong>Program:</strong> {applicant.programChoice}</p>
              <p><strong>Alamat:</strong> {applicant.address}, {applicant.village}, {applicant.district}, {applicant.city}, {applicant.province}</p>
            </CardContent></Card>
            <Card><CardHeader><CardTitle>Informasi Tambahan</CardTitle></CardHeader><CardContent className="space-y-1 text-sm">
              <p><strong>Motivasi:</strong> {applicant.motivation || "-"}</p>
              <p><strong>Pengalaman Tahfizh:</strong> {applicant.tahfizhExperience || "-"}</p>
              <p><strong>Hafalan:</strong> {applicant.hafalanCount || "-"}</p>
              <p><strong>Prestasi:</strong> {applicant.achievements || "-"}</p>
              <p><strong>Sumber Info:</strong> {applicant.infoSource || "-"}</p>
              <p><strong>Dibuat:</strong> {formatDate(applicant.createdAt)}</p>
              <p><strong>Update:</strong> {formatDate(applicant.updatedAt)}</p>
            </CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <Card><CardContent className="p-6 grid sm:grid-cols-2 gap-3 text-sm">
            <div><p className="text-slate-500">Nama</p><p>{applicant.name}</p></div>
            <div><p className="text-slate-500">NIK</p><p>{applicant.nik}</p></div>
            <div><p className="text-slate-500">NISN</p><p>{applicant.nisn}</p></div>
            <div><p className="text-slate-500">Tempat/Tgl Lahir</p><p>{applicant.birthPlace}, {applicant.birthDate}</p></div>
            <div><p className="text-slate-500">Gender</p><p>{applicant.gender}</p></div>
            <div><p className="text-slate-500">Agama</p><p>{applicant.religion}</p></div>
            <div className="sm:col-span-2"><p className="text-slate-500">Alamat</p><p>{applicant.address}</p></div>
            <div><p className="text-slate-500">Provinsi</p><p>{applicant.province}</p></div>
            <div><p className="text-slate-500">Kota</p><p>{applicant.city}</p></div>
            <div><p className="text-slate-500">Kecamatan</p><p>{applicant.district}</p></div>
            <div><p className="text-slate-500">Kelurahan</p><p>{applicant.village}</p></div>
            <div><p className="text-slate-500">Email</p><p>{applicant.email}</p></div>
            <div><p className="text-slate-500">HP</p><p>{applicant.phone}</p></div>
            <div><p className="text-slate-500">Asal Sekolah</p><p>{applicant.originSchool}</p></div>
            <div><p className="text-slate-500">Tahun Lulus</p><p>{applicant.graduationYear}</p></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="parents">
          <Card><CardContent className="p-6 grid sm:grid-cols-2 gap-3 text-sm">
            <div><p className="text-slate-500">Nama Ayah</p><p>{applicant.fatherName}</p></div>
            <div><p className="text-slate-500">Pekerjaan Ayah</p><p>{applicant.fatherJob}</p></div>
            <div><p className="text-slate-500">HP Ayah</p><p>{applicant.fatherPhone}</p></div>
            <div><p className="text-slate-500">Nama Ibu</p><p>{applicant.motherName}</p></div>
            <div><p className="text-slate-500">Pekerjaan Ibu</p><p>{applicant.motherJob}</p></div>
            <div><p className="text-slate-500">HP Ibu</p><p>{applicant.motherPhone}</p></div>
            <div><p className="text-slate-500">Wali</p><p>{applicant.guardianName || "-"}</p></div>
            <div><p className="text-slate-500">Hubungan</p><p>{applicant.guardianRelation || "-"}</p></div>
            <div><p className="text-slate-500">HP Wali</p><p>{applicant.guardianPhone || "-"}</p></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card><CardContent className="p-4 space-y-3">
            {docs.map(d=>(
              <div key={d.id} className="flex flex-col sm:flex-row justify-between gap-3 p-3 border rounded-xl">
                <div><p className="font-medium text-sm">{d.label} ({d.type})</p><p className="text-xs text-slate-500">File: {d.fileName || "Belum upload"} • {d.status}</p>{d.rejectedReason && <p className="text-xs text-red-600">Reason: {d.rejectedReason}</p>}</div>
                <div className="flex gap-2">
                  <Badge status={d.status} />
                  <Button size="sm" variant="outline" onClick={()=> handleVerifyDoc(d.id, "VERIFIED")}>Verifikasi</Button>
                  <Button size="sm" variant="outline" onClick={()=> {
                    const reason = prompt("Alasan ditolak:");
                    if(reason) handleVerifyDoc(d.id, "REJECTED", reason);
                  }}>Tolak</Button>
                </div>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="interview">
          <div className="space-y-4">
            <Card><CardHeader><CardTitle>Buat Jadwal Wawancara</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-3">
              <div><Label>Tanggal</Label><Input type="date" value={interviewForm.date} onChange={e=> setInterviewForm({...interviewForm, date:e.target.value})} /></div>
              <div><Label>Jam</Label><Input type="time" value={interviewForm.time} onChange={e=> setInterviewForm({...interviewForm, time:e.target.value})} /></div>
              <div><Label>Lokasi</Label><Input value={interviewForm.location} onChange={e=> setInterviewForm({...interviewForm, location:e.target.value})} placeholder="Ruang Interview" /></div>
              <div><Label>Pewawancara</Label><Input value={interviewForm.interviewer} onChange={e=> setInterviewForm({...interviewForm, interviewer:e.target.value})} /></div>
              <div className="sm:col-span-2"><Label>Catatan</Label><Textarea value={interviewForm.notes} onChange={e=> setInterviewForm({...interviewForm, notes:e.target.value})} /></div>
              <div className="sm:col-span-2"><Button onClick={handleCreateInterview}>Buat Jadwal</Button></div>
            </CardContent></Card>
            <Card><CardContent className="p-4 space-y-2">
              {interviews.length===0 ? <p className="text-sm text-slate-500">Belum ada wawancara.</p> : interviews.map(iv=>(
                <div key={iv.id} className="p-3 border rounded-xl flex justify-between">
                  <div><p className="font-medium text-sm">{iv.date} {iv.time}</p><p className="text-xs text-slate-600">{iv.location} • {iv.interviewer}</p><Badge status={iv.status} className="mt-1" /></div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={()=> interviewService.update(iv.id, {status:"COMPLETED"})}>Selesai</Button>
                    <Button size="sm" variant="outline" onClick={()=> interviewService.update(iv.id, {status:"CANCELLED"})}>Batal</Button>
                  </div>
                </div>
              ))}
            </CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card><CardContent className="p-6">
            <ol className="border-l ml-2 space-y-4">
              {[
                {label:"Registrasi Dibuat", date: applicant.createdAt, done:true},
                {label:"Data Lengkap", done: !!applicant.nik},
                {label:"Terkirim", date: applicant.submittedAt, done: !!applicant.submittedAt},
                {label:`Status: ${applicant.status}`, done:true},
              ].map((item,i)=>(
                <li key={i} className="ml-4 relative"><span className={`absolute -left-1.5 mt-1 h-3 w-3 rounded-full ${item.done ? "bg-emerald-600":"bg-slate-300"}`} /><p className="text-sm font-medium">{item.label}</p>{item.date && <p className="text-xs text-slate-500">{formatDate(item.date)}</p>}</li>
              ))}
            </ol>
          </CardContent></Card>
        </TabsContent>
      </Tabs>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent onClose={()=> setConfirmOpen(false)}>
          <DialogHeader><DialogTitle>Ubah Status?</DialogTitle><DialogDescription>Yakin mengubah status dari {applicant.status} ke {pendingStatus}?</DialogDescription></DialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={()=> setConfirmOpen(false)}>Batal</Button>
            <Button onClick={handleStatusChange}>Ya, Ubah</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}

