"use client";
import { useState, useEffect } from "react";
import { getSafeImageUrl, FALLBACKS, type FallbackCategory } from "@/lib/utils/image";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackCategory?: FallbackCategory;
}

export function SafeImage({ src, alt, className, fallbackSrc, fallbackCategory = "default", ...props }: SafeImageProps) {
  const normalizedFallback = fallbackSrc || FALLBACKS[fallbackCategory] || FALLBACKS.default;
  const safeSrc = getSafeImageUrl(typeof src === "string" ? src : undefined, fallbackCategory as FallbackCategory) || normalizedFallback;

  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(safeSrc);

  useEffect(() => {
    setCurrent(getSafeImageUrl(typeof src === "string" ? src : undefined, fallbackCategory as FallbackCategory) || normalizedFallback);
    setError(false);
  }, [src, fallbackCategory, normalizedFallback]);

  const handleError = () => {
    if (!error) {
      setError(true);
      setCurrent(normalizedFallback);
    }
  };

  const finalClass = error && className?.includes("object-cover")
    ? className.replace("object-cover", "object-contain") + " bg-slate-50 p-4"
    : error
    ? className + " bg-white"
    : className;

  // alt fallback yang deskriptif
  const finalAlt = alt && alt.trim() !== "" ? alt : "Gambar SMK Tahfizh Al-Fatih";

  return <img src={String(current)} alt={finalAlt} className={finalClass} onError={handleError} loading="lazy" decoding="async" {...props} />;
}
