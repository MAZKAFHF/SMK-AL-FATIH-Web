import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, update, onValue, off } from "firebase/database";
import type { Notification } from "@/lib/types/index";

const PATH="notifications";

export const notificationService={
  async create(data: Omit<Notification,"id"|"createdAt"|"read">):Promise<Notification>{
    const db=getFirebaseDB();
    const id=push(ref(db,PATH)).key || `notif_${Date.now()}`;
    const item:Notification={id,...data, read:false, createdAt: Date.now()};
    await set(ref(db,`${PATH}/${id}`),item);
    return item;
  },
  async getByRecipient(recipientId:string):Promise<Notification[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Notification>;
    return Object.values(d).filter(n=> n.recipientId===recipientId).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async getAll():Promise<Notification[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const d=snap.val() as Record<string,Notification>;
    return Object.values(d).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async markRead(id:string):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{read:true});
  },
  async markAllRead(recipientId:string):Promise<void>{
    const list=await this.getByRecipient(recipientId);
    const db=getFirebaseDB();
    for(const n of list){
      if(!n.read) await update(ref(db,`${PATH}/${n.id}`),{read:true});
    }
  },
  subscribeByRecipient(recipientId:string, cb:(data:Notification[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const d=snap.val() as Record<string,Notification>;
      cb(Object.values(d).filter(n=> n.recipientId===recipientId).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=>off(r,"value",l);
  }
};
