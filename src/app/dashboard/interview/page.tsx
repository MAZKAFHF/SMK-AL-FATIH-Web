"use client";
import { useEffect, useState } from "react";
import { getApplicantSession } from "@/lib/auth/applicant-auth";
import { interviewService } from "@/lib/services/interview-service";
import type { Interview } from "@/lib/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InterviewPage() {
  const [list, setList] = useState<Interview[]>([]);
  useEffect(()=>{
    const s = getApplicantSession();
    if(!s) return;
    const unsub = interviewService.subscribeByApplicant(s.applicantId, setList);
    return ()=> unsub();
  },[]);
  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-2xl font-bold">Jadwal Wawancara</h1>
        {list.length===0 ? <p className="text-sm text-slate-500 mt-4">Belum ada jadwal.</p> : (
          <div className="space-y-3 mt-4">
            {list.map(iv=>(
              <Card key={iv.id}><CardContent className="p-4">
                <p className="font-semibold">{iv.date} • {iv.time}</p>
                <p className="text-sm text-slate-600">{iv.location} — Pewawancara: {iv.interviewer}</p>
                <Badge status={iv.status} className="mt-2" />
                {iv.notes && <p className="text-sm mt-2">Catatan: {iv.notes}</p>}
              </CardContent></Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


