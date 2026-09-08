import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number | string): string {
  const d = typeof timestamp === "number" ? new Date(timestamp) : new Date(timestamp);
  if (isNaN(d.getTime())) return String(timestamp);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "Draft",
    SUBMITTED: "Terkirim",
    UNDER_REVIEW: "Ditinjau",
    INTERVIEW: "Wawancara",
    ACCEPTED: "Diterima",
    WAITING_LIST: "Cadangan",
    REJECTED: "Ditolak",
    COMPLETED: "Selesai",
    PENDING: "Menunggu",
    UPLOADED: "Terunggah",
    VERIFIED: "Terverifikasi",
    SCHEDULED: "Terjadwal",
    CANCELLED: "Dibatalkan",
    PUBLISHED: "Dipublikasi",
    ARCHIVED: "Diarsipkan",
  };
  return map[status] || status;
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
    SUBMITTED: "bg-blue-50 text-blue-700 border-blue-200",
    UNDER_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
    INTERVIEW: "bg-purple-50 text-purple-700 border-purple-200",
    ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    WAITING_LIST: "bg-orange-50 text-orange-700 border-orange-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-300",
    PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
    VERIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    UPLOADED: "bg-blue-50 text-blue-700 border-blue-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
  };
  return map[status] || "bg-slate-100 text-slate-700 border-slate-200";
}

export function exportToCSV(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const v = row[h];
          const s = v == null ? "" : String(v);
          // escape quotes
          if (s.includes(",") || s.includes('"') || s.includes("\n")) {
            return `"${s.replace(/"/g, '""')}"`;
          }
          return s;
        })
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
