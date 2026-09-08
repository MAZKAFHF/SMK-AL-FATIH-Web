"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { auditService } from "@/lib/services/audit-service";
import type { AuditLog } from "@/lib/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/cn";

export default function AuditLogsPage(){
  const [list, setList] = useState<AuditLog[]>([]);
  useEffect(()=>{ auditService.getAll().then(setList); },[]);
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold">Audit Log</h1>
      <div className="space-y-2 mt-4">
        {list.length===0 ? <p className="text-sm text-slate-500">Belum ada log.</p> : list.map(log=>(
          <Card key={log.id}><CardContent className="p-3">
            <p className="text-sm font-medium">{log.action} • {log.resource}/{log.resourceId}</p><p className="text-xs text-slate-600">{log.actorName} ({log.actorType}) • {formatDate(log.timestamp)}</p>{log.details && <p className="text-xs text-slate-500">{log.details}</p>}
          </CardContent></Card>
        ))}
      </div>
    </AdminShell>
  );
}


