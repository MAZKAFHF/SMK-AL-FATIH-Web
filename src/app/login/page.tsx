"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/applicant-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { applicantAuth } from "@/lib/auth/applicant-auth";
import { loginAdmin } from "@/lib/auth/local-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit, formState:{errors} } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    // coba login sebagai admin terlebih dahulu (gabungan)
    const adminRes = loginAdmin(data.email.trim(), data.password.trim());
    if (adminRes.success) {
      setLoading(false);
      toast({ title:"Berhasil login", description:"Selamat datang Admin", type:"success" });
      router.push("/admin");
      return;
    }
    const res = await applicantAuth.login(data.email, data.password);
    setLoading(false);
    if(res.success){
      toast({ title:"Berhasil login", description:`Selamat datang ${res.session?.name}`, type:"success" });
      router.push("/dashboard");
    } else {
      toast({ title:"Gagal login", description: res.error, type:"error" });
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-[70vh]">
      <div className="mx-auto max-w-md px-4">
        <Card>
          <CardHeader><CardTitle>Masuk</CardTitle><CardDescription>Masuk sebagai peserta PPDB atau admin sekolah</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div><Label>Email / Username</Label><Input {...register("email")} placeholder="email atau username" />{errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}</div>
              <div><Label>Password</Label><Input type="password" {...register("password")} />{errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}</div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</Button>
              <p className="text-sm text-center text-slate-600">Belum punya akun? <Link href="/register" className="text-emerald-600 font-medium">Daftar PPDB</Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


