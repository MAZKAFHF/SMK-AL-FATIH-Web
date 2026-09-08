import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, remove, update, onValue, off } from "firebase/database";
import type { Major } from "@/lib/types/index";

const PATH="majors";
export const majorService={
  async create(data: Omit<Major,"id"|"createdAt"|"updatedAt">):Promise<Major>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `major_${Date.now()}`;
    const now=Date.now();
    const item:Major={id,...data, createdAt: now, updatedAt: now};
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getAll():Promise<Major[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Major>;
    return Object.values(d).sort((a,b)=> a.order - b.order);
  },
  async update(id:string, updates:Partial<Major>):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{...updates, updatedAt: Date.now()});
  },
  async delete(id:string):Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db,`${PATH}/${id}`));
  },
  subscribeAll(cb:(data:Major[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Major>;
      cb(Object.values(d).sort((a,b)=> a.order - b.order));
    });
    return ()=>off(r,"value",l);
  }
};
