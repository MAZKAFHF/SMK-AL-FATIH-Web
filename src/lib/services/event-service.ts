import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, update, push, remove, onValue, off } from "firebase/database";
import type { EventItem } from "@/lib/types/index";

const PATH = "events";

export const eventService = {
  async create(data: Omit<EventItem, "id" | "createdAt" | "updatedAt">): Promise<EventItem> {
    const db = getFirebaseDB();
    const id = push(ref(db, PATH)).key || `event_${Date.now()}`;
    const now = Date.now();
    const item: EventItem = { id, ...data, createdAt: now, updatedAt: now };
    await set(ref(db, `${PATH}/${id}`), item);
    return item;
  },
  async getAll(): Promise<EventItem[]> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, PATH));
    if (!snap.exists()) return [];
    const data = snap.val() as Record<string, EventItem>;
    return Object.values(data).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async getById(id: string): Promise<EventItem | null> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, `${PATH}/${id}`));
    return snap.exists() ? snap.val() as EventItem : null;
  },
  async update(id: string, updates: Partial<EventItem>): Promise<void> {
    const db = getFirebaseDB();
    await update(ref(db, `${PATH}/${id}`), { ...updates, updatedAt: Date.now() });
  },
  async delete(id: string): Promise<void> {
    const db = getFirebaseDB();
    await remove(ref(db, `${PATH}/${id}`));
  },
  subscribeAll(cb:(data:EventItem[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,EventItem>;
      cb(Object.values(d).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=>off(r,"value",l);
  }
};
