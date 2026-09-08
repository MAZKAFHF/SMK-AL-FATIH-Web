import * as React from "react";
import { cn, statusColor, statusLabel } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: string;
}

function Badge({ className, status, children, ...props }: BadgeProps) {
  const content = children ?? (status ? statusLabel(status) : null);
  const color = status ? statusColor(status) : "";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        color || "bg-slate-100 text-slate-700 border-slate-200",
        className
      )}
      {...props}
    >
      {content}
    </span>
  );
}

export { Badge };


