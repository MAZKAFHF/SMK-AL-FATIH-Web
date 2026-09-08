"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { faqService } from "@/lib/services/faq-service";
import type { FAQ } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

export default function AdminFAQPage(){
  const [list, setList] = useState<FAQ[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ question:"", answer:"", category:"Umum", order:0, published:true });
  const { toast } = useToast();
  const refresh = ()=> faqService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub=faqService.subscribeAll(setList); return ()=>unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.question || !form.answer){ toast({title:"Error", description:"Lengkapi", type:"error"}); return; }
    if(editing){ await faqService.update(editing.id, form); toast({title:"Diperbarui", type:"success"}); }
    else { await faqService.create(form); toast({title:"Dibuat", type:"success"}); }
    setOpen(false); setEditing(null); setForm({ question:"", answer:"", category:"Umum", order:0, published:true }); refresh();
  };
  const handleEdit = (item:FAQ)=>{ setEditing(item); setForm({ question:item.question, answer:item.answer, category:item.category, order:item.order, published:item.published }); setOpen(true); };
  const handleDelete = async (id:string)=>{ if(!confirm("Hapus?")) return; await faqService.delete(id); refresh(); };

  return (
    <AdminShell>
      <div className="flex justify-between"><h1 className="text-2xl font-bold">FAQ</h1><Button onClick={()=>{ setEditing(null); setForm({ question:"", answer:"", category:"Umum", order:0, published:true }); setOpen(true); }}>Tambah FAQ</Button></div>
      <div className="space-y-3 mt-4">
        {list.map(item=>(
          <Card key={item.id}><CardContent className="p-4 flex justify-between">
            <div><p className="font-semibold text-sm">{item.question}</p><p className="text-sm text-slate-600">{item.answer}</p><p className="text-xs text-slate-500">{item.category} • order {item.order} • {item.published ? "Published":"Draft"}</p></div>
            <div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div>
          </CardContent></Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={()=> setOpen(false)}><DialogHeader><DialogTitle>{editing?"Edit":"Tambah"} FAQ</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Pertanyaan</Label><Input value={form.question} onChange={e=> setForm({...form, question:e.target.value})} /></div>
            <div><Label>Jawaban</Label><Textarea value={form.answer} onChange={e=> setForm({...form, answer:e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-2"><div><Label>Kategori</Label><Input value={form.category} onChange={e=> setForm({...form, category:e.target.value})} /></div><div><Label>Order</Label><Input type="number" value={form.order} onChange={e=> setForm({...form, order: parseInt(e.target.value)||0})} /></div></div>
            <div className="flex gap-2 items-center"><input type="checkbox" checked={form.published} onChange={e=> setForm({...form, published:e.target.checked})} /><Label>Published</Label></div>
            <Button onClick={handleSave}>{editing?"Update":"Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


