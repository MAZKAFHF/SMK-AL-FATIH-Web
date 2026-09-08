import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, remove, update, onValue, off } from "firebase/database";
import type { Facility } from "@/lib/types/index";

const PATH = "facilities";

export const facilityService = {
  async create(data: Omit<Facility,"id"|"createdAt"|"updatedAt">): Promise<Facility>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `fac_${Date.now()}`;
    const now=Date.now();
    const item: Facility={id, ...data, createdAt: now, updatedAt: now};
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getAll(): Promise<Facility[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Facility>;
    return Object.values(d).sort((a,b)=> a.order - b.order);
  },
  async getPublished(): Promise<Facility[]>{
    const all=await this.getAll();
    return all.filter(f=> f.published);
  },
  async update(id:string, updates:Partial<Facility>):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{...updates, updatedAt: Date.now()});
  },
  async delete(id:string):Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db,`${PATH}/${id}`));
  },
  subscribeAll(cb:(data:Facility[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Facility>;
      cb(Object.values(d).sort((a,b)=> a.order - b.order));
    });
    return ()=>off(r,"value",l);
  }
};
