import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, remove, onValue, off, update } from "firebase/database";
import type { GalleryItem } from "@/lib/types/index";

const PATH = "gallery";

export const galleryService = {
  async create(data: Omit<GalleryItem,"id" | "createdAt">): Promise<GalleryItem> {
    const db = getFirebaseDB();
    const id = push(ref(db, PATH)).key || `gal_${Date.now()}`;
    const item: GalleryItem = { id, ...data, createdAt: Date.now() };
    await set(ref(db, `${PATH}/${id}`), item);
    return item;
  },
  async getAll(): Promise<GalleryItem[]> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, PATH));
    if(!snap.exists()) return [];
    const d = snap.val() as Record<string,GalleryItem>;
    return Object.values(d).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async update(id:string, updates: Partial<GalleryItem>): Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db, `${PATH}/${id}`), updates);
  },
  async delete(id:string): Promise<void>{
    const db=getFirebaseDB();
    await remove(ref(db, `${PATH}/${id}`));
  },
  subscribeAll(cb:(data:GalleryItem[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,GalleryItem>;
      cb(Object.values(d).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=>off(r,"value",l);
  }
};
