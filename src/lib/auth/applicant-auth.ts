"use client";

import { getFirebaseDB } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export interface ApplicantSession {
  isLoggedIn: true;
  applicantId: string;
  registrationNumber: string;
  email: string;
  name: string;
  role: "APPLICANT";
  loginAt: number;
}

const SESSION_KEY = "applicant_session";

export function setApplicantSession(session: ApplicantSession) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

export function getApplicantSession(): ApplicantSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as ApplicantSession;
    if (!s.isLoggedIn) return null;
    return s;
  } catch {
    return null;
  }
}

export function clearApplicantSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function isApplicantLoggedIn(): boolean {
  return getApplicantSession() !== null;
}

export async function loginApplicant(email: string, password: string): Promise<{ success: boolean; error?: string; session?: ApplicantSession }> {
  try {
    const db = getFirebaseDB();
    const snap = await get(ref(db, "applicants"));
    if (!snap.exists()) {
      return { success: false, error: "Email atau password salah" };
    }
    const data = snap.val() as Record<string, { email: string; password: string; registrationNumber: string; name: string }>;
    const entry = Object.entries(data).find(([_, v]) => v.email === email && v.password === password);
    if (!entry) {
      return { success: false, error: "Email atau password salah" };
    }
    const [id, val] = entry;
    const session: ApplicantSession = {
      isLoggedIn: true,
      applicantId: id,
      registrationNumber: val.registrationNumber,
      email: val.email,
      name: val.name,
      role: "APPLICANT",
      loginAt: Date.now(),
    };
    setApplicantSession(session);
    return { success: true, session };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Gagal login, coba lagi" };
  }
}

export function logoutApplicant() {
  clearApplicantSession();
}

export function hasRoleApplicant(role: string): boolean {
  const s = getApplicantSession();
  if (!s) return false;
  return s.role === role;
}

export const applicantAuth = {
  login: loginApplicant,
  logout: logoutApplicant,
  getSession: getApplicantSession,
  setSession: setApplicantSession,
  clearSession: clearApplicantSession,
  isLoggedIn: isApplicantLoggedIn,
};
