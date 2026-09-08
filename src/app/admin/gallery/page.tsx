"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { galleryService } from "@/lib/services/gallery-service";
import type { GalleryItem } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { SafeImage } from "@/components/SafeImage";

export default function AdminGalleryPage(){
  const [list, setList] = useState<GalleryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ imageUrl:"", caption:"", category:"Umum" });
  const { toast } = useToast();
  const refresh = ()=> galleryService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=galleryService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.imageUrl || !form.caption){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    await galleryService.create(form); toast({title:"Ditambahkan", type:"success"}); setOpen(false); setForm({ imageUrl:"", caption:"", category:"Umum" }); refresh();
  };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await galleryService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Galeri</h1><Button onClick={()=> setOpen(true)}>Tambah Foto</Button></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {list.length===0 ? <p className="text-sm text-slate-500">Belum ada foto.</p> : list.map(item=>(
          <Card key={item.id} className="overflow-hidden"><SafeImage src={item.imageUrl} alt={item.caption} fallbackCategory="gallery" className="h-36 w-full object-cover" /><CardContent className="p-3"><p className="font-medium text-sm">{item.caption}</p><p className="text-xs text-slate-500">{item.category}</p><Button size="sm" variant="outline" className="mt-2" onClick={()=> handleDelete(item.id)}>Hapus</Button></CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>Tambah Foto</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Image URL</Label><Input value={form.imageUrl} onChange={e=> setForm({...form, imageUrl:e.target.value})} placeholder="https://..." />{form.imageUrl && <SafeImage src={form.imageUrl} alt="Preview" fallbackCategory="gallery" className="mt-2 h-32 w-full object-cover rounded-xl border" />}</div>
            <div><Label>Caption</Label><Input value={form.caption} onChange={e=> setForm({...form, caption:e.target.value})} /></div>
            <div><Label>Kategori</Label><Input value={form.category} onChange={e=> setForm({...form, category:e.target.value})} /></div>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


