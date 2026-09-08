import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, update, remove, onValue, off } from "firebase/database";
import type { Announcement } from "@/lib/types/index";

const PATH="announcements";

export const announcementService={
  async create(data: Omit<Announcement,"id"|"createdAt"|"updatedAt">):Promise<Announcement>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `ann_${Date.now()}`;
    const now=Date.now();
    const item:Announcement={id,...data, createdAt: now, updatedAt: now};
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getAll():Promise<Announcement[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Announcement>;
    return Object.values(d).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async getPublished():Promise<Announcement[]>{
    const all=await this.getAll();
    return all.filter(a=> a.published);
  },
  async update(id:string, updates:Partial<Announcement>):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{...updates, updatedAt: Date.now()});
  },
  async delete(id:string):Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db,`${PATH}/${id}`));
  },
  subscribeAll(cb:(data:Announcement[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Announcement>;
      cb(Object.values(d).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=>off(r,"value",l);
  }
};
