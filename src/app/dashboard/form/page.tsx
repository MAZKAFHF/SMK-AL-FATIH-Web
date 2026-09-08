"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema, type ApplicantFormValues } from "@/lib/schemas/applicant-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplicantSession } from "@/lib/auth/applicant-auth";
import { applicantService } from "@/lib/services/applicant-service";
import { auditService } from "@/lib/services/audit-service";
import { notificationService } from "@/lib/services/notification-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import type { Applicant } from "@/lib/types/index";

export default function ApplicantFormPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState:{errors} } = useForm<ApplicantFormValues>({
    resolver: zodResolver(applicantSchema),
  });

  useEffect(()=>{
    const s = getApplicantSession();
    if(!s){ router.replace("/login"); return; }
    applicantService.getApplicant(s.applicantId).then(data=>{
      if(!data){ toast({title:"Error", description:"Data tidak ditemukan", type:"error"}); return; }
      setApplicant(data);
      reset({
        name: data.name,
        nik: data.nik,
        nisn: data.nisn,
        birthPlace: data.birthPlace,
        birthDate: data.birthDate,
        gender: data.gender as "LAKI_LAKI" | "PEREMPUAN",
        religion: data.religion,
        address: data.address,
        province: data.province,
        city: data.city,
        district: data.district,
        village: data.village,
        phone: data.phone,
        email: data.email,
        originSchool: data.originSchool,
        graduationYear: data.graduationYear,
        fatherName: data.fatherName,
        fatherJob: data.fatherJob,
        fatherPhone: data.fatherPhone,
        motherName: data.motherName,
        motherJob: data.motherJob,
        motherPhone: data.motherPhone,
        guardianName: data.guardianName || "",
        guardianRelation: data.guardianRelation || "",
        guardianPhone: data.guardianPhone || "",
        majorChoice1: data.majorChoice1 || "rpl",
        majorChoice2: data.majorChoice2 || "",
        programChoice: data.programChoice as "FULL_DAY" | "BOARDING" | "TAKHASSUS",
        motivation: data.motivation || "",
        tahfizhExperience: data.tahfizhExperience || "",
        hafalanCount: data.hafalanCount || "",
        achievements: data.achievements || "",
        infoSource: data.infoSource || "",
      });
      setLoading(false);
    });
  },[router, reset, toast]);

  const onSave = async (data: ApplicantFormValues) => {
    if(!applicant) return;
    if(applicant.isLocked){
      toast({title:"Terkunci", description:"Data telah dikirim, tidak dapat diubah. Hubungi admin.", type:"error"});
      return;
    }
    setSubmitting(true);
    try {
      await applicantService.updateApplicant(applicant.id, { ...data });
      await auditService.log({ actorId: applicant.id, actorType:"APPLICANT", actorName: applicant.name, action:"UPDATE_DATA", resource:"applicant", resourceId: applicant.id, details:"Update biodata" });
      toast({title:"Tersimpan", description:"Data berhasil disimpan", type:"success"});
      const updated = await applicantService.getApplicant(applicant.id);
      if(updated) setApplicant(updated);
    } catch(e){
      toast({title:"Gagal", description:"Gagal menyimpan", type:"error"});
    } finally { setSubmitting(false); }
  };

  const onSubmit = async () => {
    if(!applicant) return;
    if(!applicant.nik || !applicant.nisn){
      toast({title:"Lengkapi data", description:"Lengkapi biodata sebelum submit", type:"error"});
      return;
    }
    setSubmitting(true);
    try {
      await applicantService.submitApplication(applicant.id);
      await notificationService.create({ recipientId:"admin", title:"Pendaftar Baru Submit", message:`${applicant.name} (${applicant.registrationNumber}) telah submit`, type:"INFO", link:`/admin/applicants/${applicant.id}` });
      await notificationService.create({ recipientId: applicant.id, title:"Pendaftaran Terkirim", message:"Pendaftaran Anda telah terkirim dan akan diverifikasi", type:"SUCCESS" });
      await auditService.log({ actorId: applicant.id, actorType:"APPLICANT", actorName: applicant.name, action:"SUBMIT_APPLICATION", resource:"applicant", resourceId: applicant.id });
      toast({title:"Berhasil", description:"Pendaftaran telah dikirim", type:"success"});
      router.push("/dashboard");
    } catch(e){
      toast({title:"Gagal", description:"Gagal submit", type:"error"});
    } finally { setSubmitting(false); }
  };

  if(loading) return <div className="mx-auto max-w-3xl px-4 py-10">Memuat...</div>;
  if(!applicant) return null;

  const locked = applicant.isLocked;

  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Formulir PPDB</h1>
        <p className="text-slate-600 text-sm">No. Pendaftaran: <span className="font-mono">{applicant.registrationNumber}</span> • Status: {applicant.status}</p>
        {locked && <p className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">Data telah dikirim dan sedang diproses.</p>}
        <form onSubmit={handleSubmit(onSave)} className="mt-6 space-y-6">
          <Card><CardHeader><CardTitle>Data Peserta</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-4">
            <div><Label>Nama Lengkap*</Label><Input {...register("name")} disabled={locked} />{errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}</div>
            <div><Label>NIK*</Label><Input {...register("nik")} disabled={locked} />{errors.nik && <p className="text-xs text-red-600">{errors.nik.message}</p>}</div>
            <div><Label>NISN*</Label><Input {...register("nisn")} disabled={locked} />{errors.nisn && <p className="text-xs text-red-600">{errors.nisn.message}</p>}</div>
            <div><Label>Tempat Lahir*</Label><Input {...register("birthPlace")} disabled={locked} />{errors.birthPlace && <p className="text-xs text-red-600">{errors.birthPlace.message}</p>}</div>
            <div><Label>Tanggal Lahir*</Label><Input type="date" {...register("birthDate")} disabled={locked} />{errors.birthDate && <p className="text-xs text-red-600">{errors.birthDate.message}</p>}</div>
            <div><Label>Jenis Kelamin*</Label><Select {...register("gender")} disabled={locked}><option value="LAKI_LAKI">Laki-laki</option><option value="PEREMPUAN">Perempuan</option></Select>{errors.gender && <p className="text-xs text-red-600">{errors.gender.message}</p>}</div>
            <div><Label>Agama*</Label><Input {...register("religion")} disabled={locked} placeholder="Islam" />{errors.religion && <p className="text-xs text-red-600">{errors.religion.message}</p>}</div>
            <div><Label>No HP*</Label><Input {...register("phone")} disabled={locked} />{errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}</div>
            <div><Label>Email*</Label><Input {...register("email")} disabled={locked} />{errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}</div>
            <div><Label>Asal Sekolah*</Label><Input {...register("originSchool")} disabled={locked} />{errors.originSchool && <p className="text-xs text-red-600">{errors.originSchool.message}</p>}</div>
            <div><Label>Tahun Lulus*</Label><Input {...register("graduationYear")} disabled={locked} />{errors.graduationYear && <p className="text-xs text-red-600">{errors.graduationYear.message}</p>}</div>
            <div className="sm:col-span-2"><Label>Alamat*</Label><Textarea {...register("address")} disabled={locked} />{errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}</div>
            <div><Label>Provinsi*</Label><Input {...register("province")} disabled={locked} />{errors.province && <p className="text-xs text-red-600">{errors.province.message}</p>}</div>
            <div><Label>Kota*</Label><Input {...register("city")} disabled={locked} />{errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}</div>
            <div><Label>Kecamatan*</Label><Input {...register("district")} disabled={locked} />{errors.district && <p className="text-xs text-red-600">{errors.district.message}</p>}</div>
            <div><Label>Kelurahan*</Label><Input {...register("village")} disabled={locked} />{errors.village && <p className="text-xs text-red-600">{errors.village.message}</p>}</div>
          </CardContent></Card>

          <Card><CardHeader><CardTitle>Data Orang Tua</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-4">
            <div><Label>Nama Ayah*</Label><Input {...register("fatherName")} disabled={locked} />{errors.fatherName && <p className="text-xs text-red-600">{errors.fatherName.message}</p>}</div>
            <div><Label>Pekerjaan Ayah*</Label><Input {...register("fatherJob")} disabled={locked} />{errors.fatherJob && <p className="text-xs text-red-600">{errors.fatherJob.message}</p>}</div>
            <div><Label>HP Ayah*</Label><Input {...register("fatherPhone")} disabled={locked} />{errors.fatherPhone && <p className="text-xs text-red-600">{errors.fatherPhone.message}</p>}</div>
            <div><Label>Nama Ibu*</Label><Input {...register("motherName")} disabled={locked} />{errors.motherName && <p className="text-xs text-red-600">{errors.motherName.message}</p>}</div>
            <div><Label>Pekerjaan Ibu*</Label><Input {...register("motherJob")} disabled={locked} />{errors.motherJob && <p className="text-xs text-red-600">{errors.motherJob.message}</p>}</div>
            <div><Label>HP Ibu*</Label><Input {...register("motherPhone")} disabled={locked} />{errors.motherPhone && <p className="text-xs text-red-600">{errors.motherPhone.message}</p>}</div>
            <div><Label>Nama Wali (opsional)</Label><Input {...register("guardianName")} disabled={locked} /></div>
            <div><Label>Hubungan Wali</Label><Input {...register("guardianRelation")} disabled={locked} /></div>
            <div><Label>HP Wali</Label><Input {...register("guardianPhone")} disabled={locked} /></div>
          </CardContent></Card>

          <Card><CardHeader><CardTitle>Pilihan PPDB</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-4">
            <div><Label>Jurusan Pilihan 1*</Label><Select {...register("majorChoice1")} disabled={locked}><option value="rpl">RPL - Rekayasa Perangkat Lunak</option></Select>{errors.majorChoice1 && <p className="text-xs text-red-600">{errors.majorChoice1.message}</p>}</div>
            <div><Label>Jurusan Pilihan 2</Label><Select {...register("majorChoice2")} disabled={locked}><option value="">-- Tidak ada pilihan kedua --</option><option value="rpl">RPL</option></Select></div>
            <div><Label>Program*</Label><Select {...register("programChoice")} disabled={locked}><option value="FULL_DAY">Full Day (3 Juz)</option><option value="BOARDING">Boarding (10 Juz)</option><option value="TAKHASSUS">Takhassus (30 Juz)</option></Select>{errors.programChoice && <p className="text-xs text-red-600">{errors.programChoice.message}</p>}</div>
          </CardContent></Card>

          <Card><CardHeader><CardTitle>Informasi Tambahan</CardTitle></CardHeader><CardContent className="space-y-4">
            <div><Label>Motivasi Masuk Sekolah</Label><Textarea {...register("motivation")} disabled={locked} /></div>
            <div><Label>Pengalaman Tahfizh</Label><Textarea {...register("tahfizhExperience")} disabled={locked} /></div>
            <div><Label>Jumlah Hafalan</Label><Input {...register("hafalanCount")} disabled={locked} placeholder="misal 1 juz" /></div>
            <div><Label>Prestasi</Label><Textarea {...register("achievements")} disabled={locked} /></div>
            <div><Label>Sumber Informasi Sekolah</Label><Input {...register("infoSource")} disabled={locked} placeholder="Instagram, teman, dll" /></div>
          </CardContent></Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting || locked}>{submitting ? "Menyimpan..." : "Simpan Draft"}</Button>
            <Button type="button" variant="secondary" disabled={submitting || locked} onClick={handleSubmit(async (data)=>{
              await onSave(data);
              await onSubmit();
            })}>Simpan & Submit</Button>
            <Button type="button" variant="outline" onClick={()=> router.push("/dashboard")}>Kembali</Button>
          </div>
        </form>
      </div>
    </div>
  );
}


