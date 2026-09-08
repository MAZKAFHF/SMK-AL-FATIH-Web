import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, remove, update, onValue, off } from "firebase/database";
import type { FAQ } from "@/lib/types/index";

const PATH="faqs";
export const faqService={
  async create(data: Omit<FAQ,"id"|"createdAt"|"updatedAt">):Promise<FAQ>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `faq_${Date.now()}`;
    const now=Date.now();
    const item:FAQ={id, ...data, createdAt: now, updatedAt: now};
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getAll(): Promise<FAQ[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,FAQ>;
    return Object.values(d).sort((a,b)=> a.order - b.order);
  },
  async update(id:string, updates:Partial<FAQ>):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{...updates, updatedAt: Date.now()});
  },
  async delete(id:string):Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db,`${PATH}/${id}`));
  },
  subscribeAll(cb:(data:FAQ[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,FAQ>;
      cb(Object.values(d).sort((a,b)=> a.order - b.order));
    });
    return ()=>off(r,"value",l);
  }
};
