"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { facilityService } from "@/lib/services/facility-service";
import type { Facility } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { SafeImage } from "@/components/SafeImage";

export default function AdminFacilitiesPage(){
  const [list, setList] = useState<Facility[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Facility | null>(null);
  const [form, setForm] = useState({ name:"", description:"", imageUrl:"", category:"", order:0, published:true });
  const { toast } = useToast();
  const refresh = ()=> facilityService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=facilityService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.name || !form.description){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    if(editing){ await facilityService.update(editing.id, form); toast({title:"Diperbarui", type:"success"}); }
    else { await facilityService.create(form); toast({title:"Dibuat", type:"success"}); }
    setOpen(false); setEditing(null); setForm({ name:"", description:"", imageUrl:"", category:"", order:0, published:true }); refresh();
  };
  const handleEdit = (item:Facility)=>{ setEditing(item); setForm({ name:item.name, description:item.description, imageUrl:item.imageUrl, category:item.category, order:item.order, published:item.published }); setOpen(true); };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await facilityService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Fasilitas</h1><Button onClick={()=>{ setEditing(null); setForm({ name:"", description:"", imageUrl:"", category:"", order:0, published:true }); setOpen(true); }}>Tambah Fasilitas</Button></div>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {list.map(item=>(
          <Card key={item.id}><SafeImage src={item.imageUrl} alt={item.name} fallbackCategory="facility" className="h-32 w-full object-cover rounded-t-2xl" /><CardContent className="p-4"><h3 className="font-semibold">{item.name}</h3><p className="text-xs text-slate-500">{item.category} • order {item.order} • {item.published ? "Published":"Draft"}</p><p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.description}</p><div className="flex gap-2 mt-2"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div></CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>{editing?"Edit":"Tambah"} Fasilitas</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Nama</Label><Input value={form.name} onChange={e=> setForm({...form, name:e.target.value})} /></div>
            <div><Label>Deskripsi</Label><Textarea value={form.description} onChange={e=> setForm({...form, description:e.target.value})} /></div>
            <div><Label>Image URL</Label><Input value={form.imageUrl} onChange={e=> setForm({...form, imageUrl:e.target.value})} />{form.imageUrl && <SafeImage src={form.imageUrl} alt="Preview" fallbackCategory="facility" className="mt-2 h-32 w-full object-cover rounded-xl border" />}</div>
            <div className="grid grid-cols-2 gap-2"><div><Label>Kategori</Label><Input value={form.category} onChange={e=> setForm({...form, category:e.target.value})} /></div><div><Label>Order</Label><Input type="number" value={form.order} onChange={e=> setForm({...form, order: parseInt(e.target.value)||0})} /></div></div>
            <div className="flex gap-2 items-center"><input type="checkbox" checked={form.published} onChange={e=> setForm({...form, published:e.target.checked})} /><Label>Published</Label></div>
            <Button onClick={handleSave}>{editing?"Update":"Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


