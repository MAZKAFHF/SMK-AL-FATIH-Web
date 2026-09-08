"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

const ToastContext = React.createContext<{
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toast = React.useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  }, []);
  const dismiss = React.useCallback((id: string) => setToasts((prev) => prev.filter((x) => x.id !== id)), []);
  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-xl border bg-white p-4 shadow-lg flex gap-3 items-start",
              t.type === "success" && "border-emerald-200 bg-emerald-50/50",
              t.type === "error" && "border-red-200 bg-red-50/50",
              t.type === "info" && "border-slate-200"
            )}
          >
            <div className="mt-0.5">
              {t.type === "success" && <CheckCircle className="h-5 w-5 text-emerald-600" />}
              {t.type === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
              {t.type === "info" && <Info className="h-5 w-5 text-slate-600" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="text-sm text-slate-600">{t.description}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} className="p-1 rounded hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast outside provider");
  return ctx;
}


