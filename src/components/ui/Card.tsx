import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("w-full min-w-0 max-w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5", className)}
      {...props}
    />
  );
}
