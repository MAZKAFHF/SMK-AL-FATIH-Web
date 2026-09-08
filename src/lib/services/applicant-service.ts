import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, update, push, runTransaction, onValue, off, remove } from "firebase/database";
import type { Applicant, ApplicantStatus } from "@/lib/types/index";

const PATH = "applicants";
const COUNTER_PATH = "counters/applicantCounter";

export const applicantService = {
  async generateRegistrationNumber(): Promise<string> {
    const db = getFirebaseDB();
    const counterRef = ref(db, COUNTER_PATH);
    let newNumber = 1;
    try {
      const result = await runTransaction(counterRef, (current) => {
        const val = (current as number | null) ?? 0;
        return val + 1;
      });
      if (result.committed) {
        newNumber = result.snapshot.val() as number;
      } else {
        // fallback
        const snap = await get(counterRef);
        newNumber = ((snap.val() as number) || 0) + 1;
        await set(counterRef, newNumber);
      }
    } catch {
      // fallback to count
      const snap = await get(ref(db, PATH));
      const count = snap.exists() ? Object.keys(snap.val()).length : 0;
      newNumber = count + 1;
      // also try set counter
      try { await set(counterRef, newNumber); } catch {}
    }
    const year = new Date().getFullYear();
    return `AF-${year}-${String(newNumber).padStart(4, "0")}`;
  },

  async createApplicant(data: Omit<Applicant, "id" | "createdAt" | "updatedAt" | "status" | "isLocked" | "registrationNumber"> & Partial<Pick<Applicant,"registrationNumber">>): Promise<Applicant> {
    const db = getFirebaseDB();
    const regNum = data.registrationNumber || await this.generateRegistrationNumber();
    const id = push(ref(db, PATH)).key || `app_${Date.now()}`;
    const now = Date.now();
    const applicant: Applicant = {
      id,
      registrationNumber: regNum,
      status: "DRAFT",
      isLocked: false,
      createdAt: now,
      updatedAt: now,
      email: data.email,
      password: data.password,
      name: data.name,
      nik: data.nik || "",
      nisn: data.nisn || "",
      birthPlace: data.birthPlace || "",
      birthDate: data.birthDate || "",
      gender: data.gender || "LAKI_LAKI",
      religion: data.religion || "",
      address: data.address || "",
      province: data.province || "",
      city: data.city || "",
      district: data.district || "",
      village: data.village || "",
      phone: data.phone || "",
      originSchool: data.originSchool || "",
      graduationYear: data.graduationYear || "",
      fatherName: data.fatherName || "",
      fatherJob: data.fatherJob || "",
      fatherPhone: data.fatherPhone || "",
      motherName: data.motherName || "",
      motherJob: data.motherJob || "",
      motherPhone: data.motherPhone || "",
      guardianName: data.guardianName ?? "",
      guardianRelation: data.guardianRelation ?? "",
      guardianPhone: data.guardianPhone ?? "",
      majorChoice1: data.majorChoice1 || "",
      majorChoice2: data.majorChoice2 ?? "",
      programChoice: data.programChoice || "FULL_DAY",
      motivation: data.motivation ?? "",
      tahfizhExperience: data.tahfizhExperience ?? "",
      hafalanCount: data.hafalanCount ?? "",
      achievements: data.achievements ?? "",
      infoSource: data.infoSource ?? "",
    };
    // Firebase Realtime Database tidak menerima `undefined` - sanitasi
    const sanitized = Object.fromEntries(Object.entries(applicant).filter(([, v]) => v !== undefined)) as Applicant;
    await set(ref(db, `${PATH}/${id}`), sanitized);
    // create audit log via separate service? inline
    return applicant;
  },

  async getApplicant(id: string): Promise<Applicant | null> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, `${PATH}/${id}`));
    if (!snap.exists()) return null;
    return snap.val() as Applicant;
  },

  async getByRegistrationNumber(regNum: string): Promise<Applicant | null> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, PATH));
    if (!snap.exists()) return null;
    const data = snap.val() as Record<string, Applicant>;
    const found = Object.values(data).find((a) => a.registrationNumber === regNum);
    return found || null;
  },

  async getAll(): Promise<Applicant[]> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, PATH));
    if (!snap.exists()) return [];
    const data = snap.val() as Record<string, Applicant>;
    return Object.values(data).filter((a) => !a.deleted).sort((a,b)=> b.createdAt - a.createdAt);
  },

  async updateApplicant(id: string, updates: Partial<Applicant>): Promise<void> {
    const db = getFirebaseDB();
    const cleaned = Object.fromEntries(Object.entries(updates).filter(([, v]) => v !== undefined)) as Partial<Applicant>;
    await update(ref(db, `${PATH}/${id}`), { ...cleaned, updatedAt: Date.now() });
  },

  async submitApplication(id: string): Promise<void> {
    await this.updateApplicant(id, { status: "SUBMITTED", isLocked: true, submittedAt: Date.now() });
  },

  async changeStatus(id: string, status: ApplicantStatus, isLocked?: boolean): Promise<void> {
    const payload: Partial<Applicant> = { status, updatedAt: Date.now() };
    if (typeof isLocked === "boolean") payload.isLocked = isLocked;
    // auto lock logic
    if (status === "SUBMITTED" || status === "UNDER_REVIEW" || status === "INTERVIEW") payload.isLocked = true;
    if (status === "DRAFT") payload.isLocked = false;
    await this.updateApplicant(id, payload);
  },

  async deleteApplicant(id: string): Promise<void> {
    // soft delete
    await this.updateApplicant(id, { deleted: true } as Partial<Applicant>);
  },

  async hardDelete(id: string): Promise<void> {
    const db = getFirebaseDB();
    await remove(ref(db, `${PATH}/${id}`));
  },

  // realtime listener
  subscribeAll(callback: (data: Applicant[]) => void) {
    const db = getFirebaseDB();
    const r = ref(db, PATH);
    const listener = onValue(r, (snap) => {
      if (!snap.exists()) { callback([]); return; }
      const data = snap.val() as Record<string, Applicant>;
      const arr = Object.values(data).filter((a)=>!a.deleted).sort((a,b)=> b.createdAt - a.createdAt);
      callback(arr);
    });
    return () => off(r, "value", listener);
  },

  subscribeOne(id: string, callback: (data: Applicant | null) => void) {
    const db = getFirebaseDB();
    const r = ref(db, `${PATH}/${id}`);
    const listener = onValue(r, (snap) => {
      if (!snap.exists()) { callback(null); return; }
      callback(snap.val() as Applicant);
    });
    return () => off(r, "value", listener);
  },
};
