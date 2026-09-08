"use client";
import { useEffect, useState, useMemo } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { applicantService } from "@/lib/services/applicant-service";
import type { Applicant, ApplicantStatus } from "@/lib/types/index";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { exportToCSV } from "@/lib/utils/cn";
import Link from "next/link";

export default function ApplicantsPage(){
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [majorFilter, setMajorFilter] = useState<string>("ALL");
  const [programFilter, setProgramFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(()=>{
    const unsub = applicantService.subscribeAll(setApplicants);
    return ()=> unsub();
  },[]);

  const filtered = useMemo(()=>{
    return applicants.filter(a=>{
      const s = search.toLowerCase();
      const matchSearch = !search || a.name.toLowerCase().includes(s) || a.registrationNumber.toLowerCase().includes(s) || a.nisn.includes(s) || a.email.toLowerCase().includes(s) || a.phone.includes(s);
      const matchStatus = statusFilter==="ALL" || a.status===statusFilter;
      const matchMajor = majorFilter==="ALL" || a.majorChoice1===majorFilter;
      const matchProgram = programFilter==="ALL" || a.programChoice===programFilter;
      return matchSearch && matchStatus && matchMajor && matchProgram;
    });
  },[applicants, search, statusFilter, majorFilter, programFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  const exportCSV = ()=>{
    const rows = filtered.map(a=>({
      Nama: a.name,
      NoPendaftaran: a.registrationNumber,
      Jurusan: a.majorChoice1,
      Program: a.programChoice,
      Status: a.status,
      Tanggal: new Date(a.createdAt).toLocaleDateString("id-ID"),
      Email: a.email,
      HP: a.phone,
    }));
    exportToCSV(`pendaftar-${new Date().toISOString().slice(0,10)}.csv`, rows as unknown as Record<string, unknown>[]);
  };

  return (
    <AdminShell>
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <h1 className="text-2xl font-bold">Pendaftar ({filtered.length})</h1>
        <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
      </div>

      <Card className="mt-4"><CardContent className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Input placeholder="Cari nama, no daftar, NISN, email, HP" value={search} onChange={e=>{ setSearch(e.target.value); setPage(1); }} />
        <Select value={statusFilter} onChange={e=>{ setStatusFilter(e.target.value); setPage(1); }}>
          <option value="ALL">Semua Status</option>
          <option value="DRAFT">DRAFT</option><option value="SUBMITTED">SUBMITTED</option><option value="UNDER_REVIEW">UNDER_REVIEW</option><option value="INTERVIEW">INTERVIEW</option><option value="ACCEPTED">ACCEPTED</option><option value="WAITING_LIST">WAITING_LIST</option><option value="REJECTED">REJECTED</option><option value="COMPLETED">COMPLETED</option>
        </Select>
        <Select value={majorFilter} onChange={e=>{ setMajorFilter(e.target.value); setPage(1); }}>
          <option value="ALL">Semua Jurusan</option><option value="rpl">RPL</option>
        </Select>
        <Select value={programFilter} onChange={e=>{ setProgramFilter(e.target.value); setPage(1); }}>
          <option value="ALL">Semua Program</option><option value="FULL_DAY">FULL_DAY</option><option value="BOARDING">BOARDING</option><option value="TAKHASSUS">TAKHASSUS</option>
        </Select>
      </CardContent></Card>

      {/* Desktop table */}
      <Card className="mt-4 hidden lg:block"><CardContent className="p-0">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left"><tr className="border-b">
              <th className="px-4 py-3">Nama</th><th className="px-4 py-3">No. Pendaftaran</th><th className="px-4 py-3">Jurusan</th><th className="px-4 py-3">Program</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3">Aksi</th>
            </tr></thead>
            <tbody>
              {paginated.length===0 ? <tr><td colSpan={7} className="text-center py-8 text-slate-500">Belum ada pendaftar.</td></tr> : paginated.map(a=>(
                <tr key={a.id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{a.registrationNumber}</td>
                  <td className="px-4 py-3">{a.majorChoice1}</td>
                  <td className="px-4 py-3">{a.programChoice}</td>
                  <td className="px-4 py-3"><Badge status={a.status} /></td>
                  <td className="px-4 py-3 text-xs">{new Date(a.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-3"><Link href={`/admin/applicants/${a.id}`} className="text-emerald-600 font-medium">Detail</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages>1 && (
          <div className="flex justify-between items-center p-4 border-t">
            <Button variant="outline" size="sm" disabled={page===1} onClick={()=> setPage(p=> p-1)}>Prev</Button>
            <span className="text-sm">Halaman {page} dari {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page===totalPages} onClick={()=> setPage(p=> p+1)}>Next</Button>
          </div>
        )}
      </CardContent></Card>

      {/* Mobile list */}
      <div className="lg:hidden mt-4 space-y-3">
        {paginated.length===0 ? <p className="text-center py-8 text-slate-500">Belum ada pendaftar.</p> : paginated.map(a=>(
          <Card key={a.id}><CardContent className="p-4">
            <div className="flex justify-between"><p className="font-semibold text-sm">{a.name}</p><Badge status={a.status} /></div>
            <p className="text-xs font-mono text-slate-600">{a.registrationNumber}</p>
            <p className="text-sm mt-1">{a.majorChoice1} • {a.programChoice}</p>
            <Link href={`/admin/applicants/${a.id}`} className="inline-flex mt-2 text-sm text-emerald-600">Lihat Detail →</Link>
          </CardContent></Card>
        ))}
        {totalPages>1 && (
          <div className="flex justify-between">
            <Button variant="outline" size="sm" disabled={page===1} onClick={()=> setPage(p=> p-1)}>Prev</Button>
            <span className="text-sm py-2"> {page}/{totalPages}</span>
            <Button variant="outline" size="sm" disabled={page===totalPages} onClick={()=> setPage(p=> p+1)}>Next</Button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}


