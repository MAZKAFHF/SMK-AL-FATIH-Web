import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, update } from "firebase/database";
import type { SiteSettings } from "@/lib/types/index";

const PATH="settings/site";

const defaultSettings: SiteSettings = {
  schoolName: "SMK Tahfizh Al-Fatih",
  address: "Jl. Rasamala, Kompleks Beringin Indah, Kelurahan Sidomulyo Timur, Kecamatan Marpoyan Damai, Kota Pekanbaru, Provinsi Riau.",
  phone: "+62 812-3456-7890",
  email: "info@smkalfatih.sch.id",
  socials: {
    instagram: "https://instagram.com/smkalfatih",
    youtube: "https://youtube.com/@smkalfatih",
    facebook: "https://facebook.com/smkalfatih",
  },
  logoUrl: "",
  faviconUrl: "",
  ppdbOpen: true,
  ppdbStartDate: "2026-01-01",
  ppdbEndDate: "2026-07-31",
  quota: "120",
  heroTitle: "SMK Tahfizh Al-Fatih",
  heroSubtitle: "Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.",
  heroImageUrl: "",
  activeMajors: ["rpl"],
  activePrograms: ["tahfizh","entrepreneurship","pbl"],
  updatedAt: Date.now(),
};

export const settingsService={
  async get():Promise<SiteSettings>{
    const db=getFirebaseDB();
    const snap=await get(ref(db,PATH));
    if(!snap.exists()) return defaultSettings;
    return snap.val() as SiteSettings;
  },
  async update(updates: Partial<SiteSettings>):Promise<void>{
    const db=getFirebaseDB();
    await update(ref(db,PATH),{...updates, updatedAt: Date.now()});
  },
  async set(settings: SiteSettings):Promise<void>{
    const db=getFirebaseDB();
    await set(ref(db,PATH), settings);
  },
  getDefaults():SiteSettings{
    return defaultSettings;
  }
};
