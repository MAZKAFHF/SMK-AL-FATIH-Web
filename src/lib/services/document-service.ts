import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, push, update, onValue, off } from "firebase/database";
import type { ApplicationDocument, DocumentStatus } from "@/lib/types/index";

const PATH="applicationDocuments";

export const documentService={
  async ensureDefaults(applicantId:string): Promise<void>{
    const existing = await this.getByApplicant(applicantId);
    if(existing.length>0) return;
    const docs: Array<{type: ApplicationDocument["type"], label:string}> = [
      {type:"KK", label:"Kartu Keluarga"},
      {type:"AKTA", label:"Akta Kelahiran"},
      {type:"RAPOR", label:"Rapor"},
      {type:"FOTO", label:"Pas Foto"},
      {type:"IJAZAH", label:"Ijazah / SKL"},
      {type:"KTP_ORTU", label:"KTP Orang Tua"},
    ];
    const db=getFirebaseDB();
    for(const d of docs){
      const id=push(ref(db,PATH)).key || `doc_${Date.now()}_${d.type}`;
      const item: ApplicationDocument={
        id, applicantId, type:d.type, label:d.label, status:"PENDING", createdAt: Date.now(), updatedAt: Date.now()
      };
      await set(ref(db,`${PATH}/${id}`),item);
    }
  },
  async getByApplicant(applicantId:string): Promise<ApplicationDocument[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const data=snap.val() as Record<string,ApplicationDocument>;
    return Object.values(data).filter(d=> d.applicantId===applicantId);
  },
  async getAll(): Promise<ApplicationDocument[]>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return [];
    const data=snap.val() as Record<string,ApplicationDocument>;
    return Object.values(data);
  },
  async updateStatus(id:string, status:DocumentStatus, notes?:string, rejectedReason?:string):Promise<void>{
    const db=getFirebaseDB();
    const payload:Partial<ApplicationDocument>={status, updatedAt: Date.now()} as Partial<ApplicationDocument>;
    if(notes) payload.notes=notes;
    if(rejectedReason) payload.rejectedReason=rejectedReason;
    if(status==="VERIFIED") payload.verifiedAt=Date.now();
    await update(ref(db,`${PATH}/${id}`),payload);
  },
  async simulateUpload(id:string, fileName:string):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,`${PATH}/${id}`),{status:"UPLOADED", fileName, fileUrl:`/uploads/${fileName}`, updatedAt: Date.now()});
  },
  subscribeByApplicant(applicantId:string, cb:(data:ApplicationDocument[])=>void){
    const db=getFirebaseDB();
    const r=ref(db,PATH);
    const l=onValue(r,(snap)=>{
      if(!snap.exists()){cb([]);return;}
      const data=snap.val() as Record<string,ApplicationDocument>;
      cb(Object.values(data).filter(d=> d.applicantId===applicantId));
    });
    return ()=>off(r,"value",l);
  }
};
