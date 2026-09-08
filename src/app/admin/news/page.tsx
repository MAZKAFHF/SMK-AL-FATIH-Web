"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { newsService } from "@/lib/services/news-service";
import type { NewsItem } from "@/lib/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { slugify } from "@/lib/utils/cn";
import { SafeImage } from "@/components/SafeImage";

export default function AdminNewsPage(){
  const [list, setList] = useState<NewsItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState({ title:"", slug:"", excerpt:"", content:"", coverImage:"", author:"Admin", status:"DRAFT" as NewsItem["status"], tags:"", featured:false });
  const { toast } = useToast();

  const refresh = ()=> newsService.getAll().then(setList);
  useEffect(()=>{ refresh(); const unsub = newsService.subscribeAll(setList); return ()=> unsub(); },[]);

  const handleSave = async ()=>{
    if(!form.title || !form.excerpt || !form.content || !form.coverImage){ toast({title:"Error", description:"Lengkapi form", type:"error"}); return; }
    const slug = form.slug || slugify(form.title);
    if(editing){
      await newsService.update(editing.id, { title: form.title, slug, excerpt: form.excerpt, content: form.content, coverImage: form.coverImage, author: form.author, status: form.status, tags: form.tags.split(",").map(s=>s.trim()).filter(Boolean), featured: form.featured });
      toast({title:"Berhasil", description:"Berita diperbarui", type:"success"});
    } else {
      await newsService.create({ title: form.title, slug, excerpt: form.excerpt, content: form.content, coverImage: form.coverImage, author: form.author, status: form.status, tags: form.tags.split(",").map(s=>s.trim()).filter(Boolean), featured: form.featured });
      toast({title:"Berhasil", description:"Berita dibuat", type:"success"});
    }
    setOpen(false); setEditing(null); setForm({ title:"", slug:"", excerpt:"", content:"", coverImage:"", author:"Admin", status:"DRAFT", tags:"", featured:false }); refresh();
  };

  const handleEdit = (item: NewsItem)=>{
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, excerpt: item.excerpt, content: item.content, coverImage: item.coverImage, author: item.author, status: item.status, tags: item.tags.join(", "), featured: item.featured });
    setOpen(true);
  };
  const handleDelete = async (id:string)=>{
    if(!confirm("Hapus berita?")) return;
    await newsService.delete(id); toast({title:"Dihapus", type:"success"}); refresh();
  };

  return (
    <AdminShell>
      <div className="flex justify-between items-center"><h1 className="text-2xl font-bold">Berita</h1><Button onClick={()=>{ setEditing(null); setForm({ title:"", slug:"", excerpt:"", content:"", coverImage:"", author:"Admin", status:"DRAFT", tags:"", featured:false }); setOpen(true); }}>Tambah Berita</Button></div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {list.length===0 ? <p className="text-sm text-slate-500">Belum ada berita.</p> : list.map(item=>(
          <Card key={item.id}><CardContent className="p-4">
            <SafeImage src={item.coverImage} alt={item.title} fallbackCategory="news" className="h-36 w-full object-cover rounded-xl mb-3" />
            <h3 className="font-semibold line-clamp-2">{item.title}</h3><p className="text-xs text-slate-500">{item.slug} • {item.author}</p><Badge status={item.status} className="mt-2" />
            <p className="text-sm text-slate-600 line-clamp-2 mt-1">{item.excerpt}</p>
            <div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=> handleEdit(item)}>Edit</Button><Button size="sm" variant="outline" onClick={()=> handleDelete(item.id)}>Hapus</Button></div>
          </CardContent></Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" onClose={()=> setOpen(false)}>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Tambah"} Berita</DialogTitle></DialogHeader>
          <div className="grid gap-3 max-h-[70vh] overflow-auto pr-1">
            <div><Label>Judul</Label><Input value={form.title} onChange={e=> setForm({...form, title:e.target.value, slug: editing ? form.slug : slugify(e.target.value)})} /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={e=> setForm({...form, slug:e.target.value})} /></div>
            <div><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={e=> setForm({...form, excerpt:e.target.value})} /></div>
            <div><Label>Konten</Label><Textarea value={form.content} onChange={e=> setForm({...form, content:e.target.value})} className="min-h-[120px]" /></div>
            <div><Label>Cover Image URL</Label><Input value={form.coverImage} onChange={e=> setForm({...form, coverImage:e.target.value})} placeholder="https://..." />{form.coverImage && <SafeImage src={form.coverImage} alt="Preview" fallbackCategory="news" className="mt-2 h-32 w-full object-cover rounded-xl border" />}</div>
            <div><Label>Author</Label><Input value={form.author} onChange={e=> setForm({...form, author:e.target.value})} /></div>
            <div><Label>Status</Label><Select value={form.status} onChange={e=> setForm({...form, status:e.target.value as NewsItem["status"]})}><option value="DRAFT">DRAFT</option><option value="PUBLISHED">PUBLISHED</option><option value="ARCHIVED">ARCHIVED</option></Select></div>
            <div><Label>Tags (koma)</Label><Input value={form.tags} onChange={e=> setForm({...form, tags:e.target.value})} /></div>
            <div className="flex gap-2 items-center"><input type="checkbox" checked={form.featured} onChange={e=> setForm({...form, featured:e.target.checked})} /><Label>Featured</Label></div>
            <Button onClick={handleSave}>{editing ? "Update" : "Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}


