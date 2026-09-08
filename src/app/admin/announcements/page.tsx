"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { announcementService } from "@/lib/services/announcement-service";
import type { Announcement } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

export default function AdminAnnouncementsPage(){
  const [list, setList] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title:"", message:"", audience:"ALL" as Announcement["audience"], targetApplicantId:"", published:true });
  const { toast } = useToast();
  const refresh = ()=> announcementService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=announcementService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.title || !form.message){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    if(editing){ await announcementService.update(editing.id, form); toast({title:"Diperbarui", type:"success"}); }
    else { await announcementService.create(form); toast({title:"Dibuat", type:"success"}); }
    setOpen(false); setEditing(null); setForm({ title:"", message:"", audience:"ALL", targetApplicantId:"", published:true }); refresh();
  };
  const handleEdit = (item:Announcement)=>{ setEditing(item); setForm({ title:item.title, message:item.message, audience:item.audience, targetApplicantId:item.targetApplicantId||"", published:item.published }); setOpen(true); };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await announcementService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Pengumuman</h1><Button onClick={()=>{ setEditing(null); setForm({ title:"", message:"", audience:"ALL", targetApplicantId:"", published:true }); setOpen(true); }}>Tambah Pengumuman</Button></div>
      <div className="space-y-3 mt-4">
        {list.length===0 ? <p className="text-sm text-slate-500">Belum ada pengumuman.</p> : list.map(item=>(
          <Card key={item.id}><CardContent className="p-4 flex justify-between">
            <div><p className="font-semibold">{item.title}</p><p className="text-sm text-slate-600">{item.message}</p><p className="text-xs text-slate-500">{item.audience} {item.targetApplicantId && `• ${item.targetApplicantId}` } • {item.published ? "Published":"Draft"}</p></div>
            <div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div>
          </CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>{editing?"Edit":"Tambah"} Pengumuman</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Judul</Label><Input value={form.title} onChange={e=> setForm({...form, title:e.target.value})} /></div>
            <div><Label>Pesan</Label><Textarea value={form.message} onChange={e=> setForm({...form, message:e.target.value})} /></div>
            <div><Label>Audience</Label><Select value={form.audience} onChange={e=> setForm({...form, audience:e.target.value as Announcement["audience"]})}><option value="ALL">ALL</option><option value="APPLICANTS">APPLICANTS</option><option value="SPECIFIC_APPLICANT">SPECIFIC_APPLICANT</option></Select></div>
            {form.audience==="SPECIFIC_APPLICANT" && <div><Label>Target Applicant ID</Label><Input value={form.targetApplicantId} onChange={e=> setForm({...form, targetApplicantId:e.target.value})} placeholder="applicantId" /></div>}
            <div className="flex gap-2 items-center"><input type="checkbox" checked={form.published} onChange={e=> setForm({...form, published:e.target.checked})} /><Label>Published</Label></div>
            <Button onClick={handleSave}>{editing?"Update":"Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


