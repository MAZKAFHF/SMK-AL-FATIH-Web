"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { settingsService } from "@/lib/services/settings-service";
import type { SiteSettings } from "@/lib/types/index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

export default function AdminSettingsPage(){
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(()=>{ settingsService.get().then(s=>{ setSettings(s); setLoading(false); }); },[]);

  const handleSave = async ()=>{
    if(!settings) return;
    await settingsService.update(settings);
    toast({title:"Berhasil", description:"Pengaturan disimpan", type:"success"});
  };

  if(loading || !settings) return <AdminShell><p>Memuat...</p></AdminShell>;

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold">Pengaturan</h1>
      <div className="grid gap-6 mt-4">
        <Card><CardHeader><CardTitle>Identitas Sekolah</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-3">
          <div><Label>Nama Sekolah</Label><Input value={settings.schoolName} onChange={e=> setSettings({...settings, schoolName:e.target.value})} /></div>
          <div><Label>Email</Label><Input value={settings.email} onChange={e=> setSettings({...settings, email:e.target.value})} /></div>
          <div><Label>Telepon</Label><Input value={settings.phone} onChange={e=> setSettings({...settings, phone:e.target.value})} /></div>
          <div><Label>Alamat</Label><Input value={settings.address} onChange={e=> setSettings({...settings, address:e.target.value})} /></div>
          <div><Label>Logo URL</Label><Input value={settings.logoUrl || ""} onChange={e=> setSettings({...settings, logoUrl:e.target.value})} /></div>
          <div><Label>Hero Title</Label><Input value={settings.heroTitle || ""} onChange={e=> setSettings({...settings, heroTitle:e.target.value})} /></div>
          <div className="sm:col-span-2"><Label>Hero Subtitle</Label><Input value={settings.heroSubtitle || ""} onChange={e=> setSettings({...settings, heroSubtitle:e.target.value})} /></div>
        </CardContent></Card>

        <Card><CardHeader><CardTitle>PPDB</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-3">
          <div className="flex gap-2 items-center"><input type="checkbox" checked={settings.ppdbOpen} onChange={e=> setSettings({...settings, ppdbOpen:e.target.checked})} /><Label>PPDB Dibuka</Label></div>
          <div><Label>Tanggal Buka</Label><Input type="date" value={settings.ppdbStartDate || ""} onChange={e=> setSettings({...settings, ppdbStartDate:e.target.value})} /></div>
          <div><Label>Tanggal Tutup</Label><Input type="date" value={settings.ppdbEndDate || ""} onChange={e=> setSettings({...settings, ppdbEndDate:e.target.value})} /></div>
          <div><Label>Kuota</Label><Input value={settings.quota || ""} onChange={e=> setSettings({...settings, quota:e.target.value})} /></div>
        </CardContent></Card>

        <Card><CardHeader><CardTitle>Media Sosial</CardTitle></CardHeader><CardContent className="grid sm:grid-cols-2 gap-3">
          <div><Label>Instagram</Label><Input value={settings.socials.instagram || ""} onChange={e=> setSettings({...settings, socials:{...settings.socials, instagram:e.target.value}})} /></div>
          <div><Label>Youtube</Label><Input value={settings.socials.youtube || ""} onChange={e=> setSettings({...settings, socials:{...settings.socials, youtube:e.target.value}})} /></div>
          <div><Label>Facebook</Label><Input value={settings.socials.facebook || ""} onChange={e=> setSettings({...settings, socials:{...settings.socials, facebook:e.target.value}})} /></div>
        </CardContent></Card>

        <Button onClick={handleSave}>Simpan Pengaturan</Button>
      </div>
    </AdminShell>
  );
}


