import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push } from "firebase/database";
import type { AuditLog } from "@/lib/types/index";

const PATH="auditLogs";

export const auditService={
  async log(entry: Omit<AuditLog,"id"|"timestamp">):Promise<void>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `audit_${Date.now()}`;
    const item:AuditLog={id,...entry, timestamp: Date.now()};
    await set(ref(db,`${PATH}/${id}`),item);
  },
  async getAll():Promise<AuditLog[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,AuditLog>;
    return Object.values(d).sort((a,b)=> b.timestamp - a.timestamp);
  }
};
