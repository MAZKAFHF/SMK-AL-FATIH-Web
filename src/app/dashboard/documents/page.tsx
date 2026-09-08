"use client";
import { useEffect, useState } from "react";
import { getApplicantSession } from "@/lib/auth/applicant-auth";
import { documentService } from "@/lib/services/document-service";
import type { ApplicationDocument } from "@/lib/types/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function DocumentsPage() {
  const [docs, setDocs] = useState<ApplicationDocument[]>([]);
  const [applicantId, setApplicantId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(()=>{
    const s = getApplicantSession();
    if(!s) return;
    setApplicantId(s.applicantId);
    const unsub = documentService.subscribeByApplicant(s.applicantId, setDocs);
    documentService.ensureDefaults(s.applicantId);
    return ()=> unsub();
  },[]);

  const handleUpload = async (id:string, fileName:string) => {
    await documentService.simulateUpload(id, fileName);
    toast({ title:"Berhasil", description:"Dokumen ditandai terunggah (simulasi)", type:"success" });
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-2xl font-bold">Dokumen</h1>
        <p className="text-sm text-slate-600">Upload simulasi — binary tidak disimpan, hanya metadata.</p>
        <div className="space-y-3 mt-6">
          {docs.map(d=>(
            <Card key={d.id}><CardContent className="p-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
              <div><p className="font-medium text-sm">{d.label}</p><p className="text-xs text-slate-500">{d.type} • Status: {d.status}</p>{d.rejectedReason && <p className="text-xs text-red-600">Alasan ditolak: {d.rejectedReason}</p>}{d.fileName && <p className="text-xs">File: {d.fileName}</p>}</div>
              <div className="flex gap-2 items-center">
                <Badge status={d.status} />
                <Input type="file" className="w-48" onChange={e=>{
                  const f = e.target.files?.[0];
                  if(f) handleUpload(d.id, f.name);
                }} />
              </div>
            </CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}


