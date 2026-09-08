"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { eventService } from "@/lib/services/event-service";
import type { EventItem } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { SafeImage } from "@/components/SafeImage";

export default function AdminEventsPage(){
  const [list, setList] = useState<EventItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState({ title:"", description:"", date:"", startTime:"", endTime:"", location:"", image:"", status:"DRAFT" as EventItem["status"] });
  const { toast } = useToast();
  const refresh = ()=> eventService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=eventService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.title || !form.date){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    if(editing){ await eventService.update(editing.id, form); toast({title:"Diperbarui", type:"success"}); }
    else { await eventService.create(form); toast({title:"Dibuat", type:"success"}); }
    setOpen(false); setEditing(null); setForm({ title:"", description:"", date:"", startTime:"", endTime:"", location:"", image:"", status:"DRAFT" }); refresh();
  };
  const handleEdit = (item:EventItem)=>{ setEditing(item); setForm({ title:item.title, description:item.description, date:item.date, startTime:item.startTime, endTime:item.endTime, location:item.location, image:item.image, status:item.status }); setOpen(true); };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await eventService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Agenda</h1><Button onClick={()=>{ setEditing(null); setForm({ title:"", description:"", date:"", startTime:"", endTime:"", location:"", image:"", status:"DRAFT" }); setOpen(true); }}>Tambah Agenda</Button></div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {list.length===0 ? <p className="text-sm text-slate-500">Belum ada agenda.</p> : list.map(item=>(
          <Card key={item.id}><CardContent className="p-4">
            <SafeImage src={item.image} alt={item.title} fallbackCategory="event" className="h-32 w-full object-cover rounded-xl mb-2" />
            <h3 className="font-semibold">{item.title}</h3><p className="text-xs text-slate-500">{item.date} {item.startTime}-{item.endTime} • {item.location}</p><Badge status={item.status} className="mt-1" />
            <p className="text-sm text-slate-600 mt-1">{item.description}</p>
            <div className="flex gap-2 mt-2"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div>
          </CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>{editing?"Edit":"Tambah"} Agenda</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Judul</Label><Input value={form.title} onChange={e=> setForm({...form, title:e.target.value})} /></div>
            <div><Label>Deskripsi</Label><Textarea value={form.description} onChange={e=> setForm({...form, description:e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-2"><div><Label>Tanggal</Label><Input type="date" value={form.date} onChange={e=> setForm({...form, date:e.target.value})} /></div><div><Label>Lokasi</Label><Input value={form.location} onChange={e=> setForm({...form, location:e.target.value})} /></div></div>
            <div className="grid grid-cols-2 gap-2"><div><Label>Jam Mulai</Label><Input type="time" value={form.startTime} onChange={e=> setForm({...form, startTime:e.target.value})} /></div><div><Label>Jam Selesai</Label><Input type="time" value={form.endTime} onChange={e=> setForm({...form, endTime:e.target.value})} /></div></div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={e=> setForm({...form, image:e.target.value})} />{form.image && <SafeImage src={form.image} alt="Preview" fallbackCategory="event" className="mt-2 h-32 w-full object-cover rounded-xl border" />}</div>
            <div><Label>Status</Label><Select value={form.status} onChange={e=> setForm({...form, status:e.target.value as EventItem["status"]})}><option value="DRAFT">DRAFT</option><option value="PUBLISHED">PUBLISHED</option><option value="ARCHIVED">ARCHIVED</option></Select></div>
            <Button onClick={handleSave}>{editing?"Update":"Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


