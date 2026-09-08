"use client";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">Terjadi Kesalahan</h1>
      <p className="text-slate-600 mt-2">{error.message || "Sesuatu yang tidak beres terjadi."}</p>
      <Button className="mt-6" onClick={reset}>Coba Lagi</Button>
    </div>
  );
}
