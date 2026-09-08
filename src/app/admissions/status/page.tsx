"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { applicantService } from "@/lib/services/applicant-service";
import type { Applicant } from "@/lib/types/index";

export default function PublicStatusPage() {
  const [reg, setReg] = useState("");
  const [result, setResult] = useState<Applicant | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setNotFound(false);
    setResult(null);
    const data = await applicantService.getByRegistrationNumber(reg.trim());
    if (!data) setNotFound(true);
    else setResult(data);
    setLoading(false);
  };

  return (
    <div className="py-10">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-center">Cek Status Pendaftaran</h1>
        <p className="text-center text-slate-600 mt-2">Masukkan nomor pendaftaran Anda (contoh: AF-2026-0001)</p>
        <Card className="mt-6"><CardContent className="p-6 space-y-4">
          <div className="flex gap-2">
            <Input placeholder="AF-2026-****" value={reg} onChange={e=>setReg(e.target.value)} />
            <Button onClick={handleCheck} disabled={loading || !reg.trim()}>{loading ? "Mencari..." : "Cek"}</Button>
          </div>
          {notFound && <p className="text-sm text-red-600">Nomor pendaftaran tidak ditemukan.</p>}
          {result && (
            <div className="border rounded-xl p-4 space-y-2 bg-slate-50">
              <p className="text-sm"><strong>Nama:</strong> {result.name.split(" ").slice(0,2).join(" ")}***</p>
              <p className="text-sm"><strong>No. Pendaftaran:</strong> {result.registrationNumber}</p>
              <p className="text-sm"><strong>Jurusan:</strong> {result.majorChoice1}</p>
              <p className="text-sm"><strong>Program:</strong> {result.programChoice}</p>
              <p className="text-sm flex gap-2 items-center"><strong>Status:</strong> <Badge status={result.status} /></p>
              <p className="text-xs text-slate-500">Untuk detail lengkap, login sebagai peserta.</p>
            </div>
          )}
        </CardContent></Card>
      </div>
    </div>
  );
}


