"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { programService } from "@/lib/services/program-service";
import type { Program } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

export default function AdminProgramsPage(){
  const [list, setList] = useState<Program[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [form, setForm] = useState({ slug:"", name:"", description:"", imageUrl:"", category:"", published:true, order:0 });
  const { toast } = useToast();
  const refresh = ()=> programService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=programService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.name || !form.slug){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    if(editing){ await programService.update(editing.id, form); toast({title:"Diperbarui", type:"success"}); }
    else { await programService.create(form); toast({title:"Dibuat", type:"success"}); }
    setOpen(false); setEditing(null); setForm({ slug:"", name:"", description:"", imageUrl:"", category:"", published:true, order:0 }); refresh();
  };
  const handleEdit = (item:Program)=>{ setEditing(item); setForm({ slug:item.slug, name:item.name, description:item.description, imageUrl:item.imageUrl||"", category:item.category||"", published:item.published, order:item.order }); setOpen(true); };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await programService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Program</h1><Button onClick={()=>{ setEditing(null); setForm({ slug:"", name:"", description:"", imageUrl:"", category:"", published:true, order:list.length }); setOpen(true); }}>Tambah Program</Button></div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {list.map(item=>(
          <Card key={item.id}><CardContent className="p-4"><h3 className="font-semibold">{item.name}</h3><p className="text-xs text-slate-500">{item.slug} • {item.category} • order {item.order}</p><p className="text-sm text-slate-600 mt-1">{item.description}</p><div className="flex gap-2 mt-2"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div></CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>{editing?"Edit":"Tambah"} Program</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Slug</Label><Input value={form.slug} onChange={e=> setForm({...form, slug:e.target.value})} /></div>
            <div><Label>Nama</Label><Input value={form.name} onChange={e=> setForm({...form, name:e.target.value})} /></div>
            <div><Label>Deskripsi</Label><Textarea value={form.description} onChange={e=> setForm({...form, description:e.target.value})} /></div>
            <div><Label>Image URL</Label><Input value={form.imageUrl} onChange={e=> setForm({...form, imageUrl:e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-2"><div><Label>Kategori</Label><Input value={form.category} onChange={e=> setForm({...form, category:e.target.value})} /></div><div><Label>Order</Label><Input type="number" value={form.order} onChange={e=> setForm({...form, order: parseInt(e.target.value)||0})} /></div></div>
            <div className="flex gap-2 items-center"><input type="checkbox" checked={form.published} onChange={e=> setForm({...form, published:e.target.checked})} /><Label>Published</Label></div>
            <Button onClick={handleSave}>{editing?"Update":"Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


