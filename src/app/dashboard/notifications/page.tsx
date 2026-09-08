"use client";
import { useEffect, useState } from "react";
import { getApplicantSession } from "@/lib/auth/applicant-auth";
import { notificationService } from "@/lib/services/notification-service";
import type { Notification } from "@/lib/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/cn";

export default function NotificationsPage(){
  const [list, setList] = useState<Notification[]>([]);
  const [id, setId] = useState<string | null>(null);
  useEffect(()=>{
    const s=getApplicantSession();
    if(!s) return;
    setId(s.applicantId);
    const unsub = notificationService.subscribeByRecipient(s.applicantId, setList);
    return ()=> unsub();
  },[]);
  const markAll = async ()=>{
    if(!id) return;
    await notificationService.markAllRead(id);
  };
  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex justify-between items-center"><h1 className="text-2xl font-bold">Notifikasi</h1><Button variant="outline" size="sm" onClick={markAll}>Tandai sudah dibaca</Button></div>
        <div className="space-y-2 mt-4">
          {list.length===0 ? <p className="text-sm text-slate-500">Belum ada notifikasi.</p> : list.map(n=>(
            <Card key={n.id} className={n.read ? "" : "border-emerald-200 bg-emerald-50/50"}><CardContent className="p-4 flex justify-between gap-3">
              <div><p className="font-medium text-sm">{n.title}</p><p className="text-sm text-slate-600">{n.message}</p><p className="text-xs text-slate-500">{formatDate(n.createdAt)}</p></div>
              {!n.read && <Button size="sm" variant="outline" onClick={()=> notificationService.markRead(n.id)}>Baca</Button>}
            </CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  );
}


