import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, update, remove, onValue, off } from "firebase/database";
import type { Interview } from "@/lib/types/index";

const PATH="interviews";

export const interviewService={
  async create(data: Omit<Interview,"id"|"createdAt"|"updatedAt">):Promise<Interview>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `int_${Date.now()}`;
    const now=Date.now();
    const raw:Interview={id,...data, createdAt: now, updatedAt: now} as Interview;
    const item = Object.fromEntries(Object.entries(raw).filter(([,v])=> v!==undefined)) as Interview;
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getByApplicant(applicantId:string):Promise<Interview[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Interview>;
    return Object.values(d).filter(i=> i.applicantId===applicantId).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async getAll():Promise<Interview[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Interview>;
    return Object.values(d).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async update(id:string, updates:Partial<Interview>):Promise<void>{
    const db=getFirebaseDB();
    const cleaned = Object.fromEntries(Object.entries(updates).filter(([,v])=> v!==undefined)) as Partial<Interview>;
    await update(ref(db,`${PATH}/${id}`),{...cleaned, updatedAt: Date.now()});
  },
  async delete(id:string):Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db,`${PATH}/${id}`));
  },
  subscribeAll(cb:(data:Interview[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Interview>;
      cb(Object.values(d).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=>off(r,"value",l);
  },
  subscribeByApplicant(applicantId:string, cb:(data:Interview[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Interview>;
      cb(Object.values(d).filter(i=> i.applicantId===applicantId).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=>off(r,"value",l);
  }
};
