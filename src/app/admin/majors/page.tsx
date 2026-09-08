"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { majorService } from "@/lib/services/major-service";
import type { Major } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

export default function AdminMajorsPage(){
  const [list, setList] = useState<Major[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Major | null>(null);
  const [form, setForm] = useState({ slug:"", name:"", shortName:"", description:"", imageUrl:"", published:true, order:0 });
  const { toast } = useToast();
  const refresh = ()=> majorService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=majorService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.name || !form.slug){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    if(editing){ await majorService.update(editing.id, form); toast({title:"Diperbarui", type:"success"}); }
    else { await majorService.create(form); toast({title:"Dibuat", type:"success"}); }
    setOpen(false); setEditing(null); setForm({ slug:"", name:"", shortName:"", description:"", imageUrl:"", published:true, order:0 }); refresh();
  };
  const handleEdit = (item:Major)=>{ setEditing(item); setForm({ slug:item.slug, name:item.name, shortName:item.shortName, description:item.description, imageUrl:item.imageUrl||"", published:item.published, order:item.order }); setOpen(true); };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await majorService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Jurusan</h1><Button onClick={()=>{ setEditing(null); setForm({ slug:"", name:"", shortName:"", description:"", imageUrl:"", published:true, order:list.length }); setOpen(true); }}>Tambah Jurusan</Button></div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {list.map(item=>(
          <Card key={item.id}><CardContent className="p-4"><h3 className="font-semibold">{item.name} ({item.shortName})</h3><p className="text-xs text-slate-500">{item.slug} • order {item.order} • {item.published ? "Published":"Draft"}</p><p className="text-sm text-slate-600 mt-1">{item.description}</p><div className="flex gap-2 mt-2"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div></CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>{editing?"Edit":"Tambah"} Jurusan</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Slug</Label><Input value={form.slug} onChange={e=> setForm({...form, slug:e.target.value})} placeholder="rpl" /></div>
            <div><Label>Nama</Label><Input value={form.name} onChange={e=> setForm({...form, name:e.target.value})} /></div>
            <div><Label>Short Name</Label><Input value={form.shortName} onChange={e=> setForm({...form, shortName:e.target.value})} /></div>
            <div><Label>Deskripsi</Label><Textarea value={form.description} onChange={e=> setForm({...form, description:e.target.value})} /></div>
            <div><Label>Image URL</Label><Input value={form.imageUrl} onChange={e=> setForm({...form, imageUrl:e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-2"><div><Label>Order</Label><Input type="number" value={form.order} onChange={e=> setForm({...form, order: parseInt(e.target.value)||0})} /></div><div className="flex items-center gap-2 mt-6"><input type="checkbox" checked={form.published} onChange={e=> setForm({...form, published:e.target.checked})} /><Label>Published</Label></div></div>
            <Button onClick={handleSave}>{editing?"Update":"Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


