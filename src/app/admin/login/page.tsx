"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { loginAdmin } from "@/lib/auth/local-auth";
import { useToast } from "@/components/ui/toast";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginAdmin(username, password);
    if (res.success) {
      toast({ title: "Berhasil", description: "Login admin berhasil", type: "success" });
      router.push("/admin");
    } else {
      toast({ title: "Gagal", description: res.error, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Login Admin</CardTitle><CardDescription>SMK Tahfizh Al-Fatih — Gunakan kredensial lokal</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={handle} className="space-y-4">
            <div><Label>Username / Email</Label><Input value={username} onChange={e=> setUsername(e.target.value)} placeholder="admin atau admin@smkalfatih.local" /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="••••••••" /></div>
            <Button type="submit" className="w-full">Masuk</Button>
            <p className="text-xs text-center text-slate-500">Gunakan akun yang telah diberikan • <a href="/login" className="text-emerald-600 hover:underline">login terpadu di sini juga bisa</a></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


