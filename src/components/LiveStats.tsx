"use client";
import { useEffect, useState } from "react";
import { applicantService } from "@/lib/services/applicant-service";

export function LiveStats() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const unsub = applicantService.subscribeAll((data) => setCount(data.length));
    return () => unsub();
  }, []);
  if (count === null) return <span className="inline-block h-4 w-12 bg-white/20 rounded animate-pulse" />;
  return <span>{count} pendaftar</span>;
}
