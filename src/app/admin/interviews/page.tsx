"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { interviewService } from "@/lib/services/interview-service";
import { applicantService } from "@/lib/services/applicant-service";
import type { Interview } from "@/lib/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export default function AdminInterviewsPage(){
  const [list, setList] = useState<Interview[]>([]);
  const [filter, setFilter] = useState("ALL");
  useEffect(()=>{ const unsub=interviewService.subscribeAll(setList); return ()=>unsub(); },[]);
  const filtered = filter==="ALL" ? list : list.filter(i=> i.status===filter);
  return (
    <AdminShell>
      <div className="flex justify-between items-center"><h1 className="text-2xl font-bold">Wawancara</h1><Select value={filter} onChange={e=> setFilter(e.target.value)}><option value="ALL">Semua</option><option value="SCHEDULED">SCHEDULED</option><option value="COMPLETED">COMPLETED</option><option value="CANCELLED">CANCELLED</option></Select></div>
      <div className="space-y-3 mt-4">
        {filtered.length===0 ? <p className="text-sm text-slate-500">Belum ada jadwal.</p> : filtered.map(iv=>(
          <Card key={iv.id}><CardContent className="p-4 flex justify-between">
            <div><p className="font-medium text-sm">{iv.applicantId} • {iv.date} {iv.time}</p><p className="text-sm text-slate-600">{iv.location} • {iv.interviewer}</p><Badge status={iv.status} className="mt-1" /></div>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={()=> interviewService.update(iv.id, {status:"COMPLETED"})}>Selesai</Button>
              <Button size="sm" variant="outline" onClick={()=> interviewService.update(iv.id, {status:"CANCELLED"})}>Batal</Button>
              <Button size="sm" variant="outline" onClick={()=> interviewService.delete(iv.id)}>Hapus</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </AdminShell>
  );
}


