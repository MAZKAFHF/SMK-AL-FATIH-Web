import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, remove, update, onValue, off } from "firebase/database";
import type { Program } from "@/lib/types/index";

const PATH="programs";
export const programService={
  async create(data: Omit<Program,"id"|"createdAt"|"updatedAt">):Promise<Program>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `prog_${Date.now()}`;
    const now=Date.now();
    const item:Program={id,...data, createdAt: now, updatedAt: now};
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getAll():Promise<Program[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Program>;
    return Object.values(d).sort((a,b)=> a.order - b.order);
  },
  async update(id:string, updates:Partial<Program>):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{...updates, updatedAt: Date.now()});
  },
  async delete(id:string):Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db,`${PATH}/${id}`));
  },
  subscribeAll(cb:(data:Program[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Program>;
      cb(Object.values(d).sort((a,b)=> a.order - b.order));
    });
    return ()=>off(r,"value",l);
  }
};
