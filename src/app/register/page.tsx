"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/applicant-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { applicantService } from "@/lib/services/applicant-service";
import { documentService } from "@/lib/services/document-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";
import { getFirebaseDB } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export default function RegisterPage() {
  const { register, handleSubmit, formState:{errors} } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      // check duplicate email
      const db = getFirebaseDB();
      const snap = await get(ref(db, "applicants"));
      if(snap.exists()){
        const vals = Object.values(snap.val() as Record<string, {email:string}>);
        if(vals.some(v=> v.email===data.email)){
          toast({ title:"Gagal", description:"Email sudah terdaftar", type:"error" });
          setLoading(false);
          return;
        }
      }
      const applicant = await applicantService.createApplicant({
        name: data.name,
        email: data.email,
        password: data.password,
        nik: "",
        nisn: "",
        birthPlace: "",
        birthDate: "",
        gender: "LAKI_LAKI",
        religion: "",
        address: "",
        province: "",
        city: "",
        district: "",
        village: "",
        phone: "",
        originSchool: "",
        graduationYear: "",
        fatherName: "",
        fatherJob: "",
        fatherPhone: "",
        motherName: "",
        motherJob: "",
        motherPhone: "",
        majorChoice1: "rpl",
        programChoice: "FULL_DAY",
      });
      await documentService.ensureDefaults(applicant.id);
      toast({ title:"Berhasil", description:`Akun dibuat. No. Pendaftaran: ${applicant.registrationNumber}`, type:"success" });
      router.push("/login");
    } catch(e){
      console.error(e);
      toast({ title:"Error", description:"Gagal membuat akun", type:"error" });
    } finally { setLoading(false); }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-[70vh]">
      <div className="mx-auto max-w-md px-4">
        <Card>
          <CardHeader><CardTitle>Daftar Akun Peserta PPDB</CardTitle><CardDescription>Buat akun untuk mendaftar di SMK Tahfizh Al-Fatih</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div><Label>Nama Lengkap</Label><Input {...register("name")} placeholder="Ahmad Fauzi" />{errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}</div>
              <div><Label>Email</Label><Input {...register("email")} placeholder="ahmad@email.com" />{errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}</div>
              <div><Label>Password</Label><Input type="password" {...register("password")} />{errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}</div>
              <div><Label>Konfirmasi Password</Label><Input type="password" {...register("confirmPassword")} />{errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}</div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Memproses..." : "Daftar"}</Button>
              <p className="text-sm text-center text-slate-600">Sudah punya akun? <Link href="/login" className="text-emerald-600 font-medium">Masuk</Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


