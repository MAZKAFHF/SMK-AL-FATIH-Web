"use client";
import { useEffect, useState } from "react";
import { getApplicantSession } from "@/lib/auth/applicant-auth";
import { applicantService } from "@/lib/services/applicant-service";
import type { Applicant } from "@/lib/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";

export default function ProofPage(){
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  useEffect(()=>{
    const s=getApplicantSession();
    if(!s) return;
    applicantService.getApplicant(s.applicantId).then(setApplicant);
  },[]);
  if(!applicant) return <div className="mx-auto max-w-2xl px-4 py-10">Memuat...</div>;
  const verifyUrl = typeof window !== "undefined" ? `${window.location.origin}/admissions/status` : "/admissions/status";
  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-2xl px-4">
        <Card className="print:shadow-none">
          <CardContent className="p-8 text-center">
            <img src="/logo.png" alt="Logo" className="h-16 w-16 mx-auto object-contain bg-white rounded-xl border p-1" />
            <h1 className="text-xl font-bold mt-3">SMK Tahfizh Al-Fatih</h1>
            <p className="text-sm text-slate-600">Bukti Pendaftaran PPDB</p>
            <div className="mt-6 text-left space-y-2 text-sm border rounded-xl p-4 bg-white">
              <div className="flex justify-between"><span className="text-slate-500">No. Pendaftaran</span><span className="font-mono font-bold">{applicant.registrationNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Nama</span><span className="font-medium">{applicant.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Jurusan</span><span>{applicant.majorChoice1}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Program</span><span>{applicant.programChoice}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tanggal Daftar</span><span>{new Date(applicant.createdAt).toLocaleDateString("id-ID")}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="font-semibold">{applicant.status}</span></div>
            </div>
            <div className="mt-6 flex justify-center">
              <QRCodeCanvas value={verifyUrl + `?reg=${applicant.registrationNumber}`} size={140} />
            </div>
            <p className="text-xs text-slate-500 mt-2">Scan untuk verifikasi di {verifyUrl}</p>
            <Button className="mt-6 print:hidden" onClick={()=> window.print()}>Cetak</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


