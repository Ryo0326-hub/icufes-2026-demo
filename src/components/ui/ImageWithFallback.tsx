"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

export function ImageWithFallback({ src, alt, className, fallbackClassName }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-sm font-semibold text-slate-500",
          fallbackClassName
        )}
      >
        画像準備中
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} />;
}
