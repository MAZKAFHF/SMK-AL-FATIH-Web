export const FALLBACKS = {
  hero: "/images/hero.jpg",
  school: "/images/school-fallback.jpg",
  facility: "/images/facility-fallback.jpg",
  program: "/images/program-fallback.jpg",
  major: "/images/major-fallback.jpg",
  news: "/images/news-fallback.jpg",
  gallery: "/images/gallery-fallback.jpg",
  event: "/images/event-fallback.jpg",
  default: "/images/school-fallback.jpg",
  logo: "/logo.png",
} as const;

export type FallbackCategory = keyof typeof FALLBACKS;

export function getSafeImageUrl(url?: string | null, category: FallbackCategory = "default"): string {
  const fallback = FALLBACKS[category] || FALLBACKS.default;
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "null" || trimmed === "undefined") return fallback;
  // allow local paths
  if (trimmed.startsWith("/")) return trimmed;
  // validate URL
  try {
    const parsed = new URL(trimmed);
    if (!["http:", "https:"].includes(parsed.protocol)) return fallback;
    // check for obviously invalid placeholder
    if (trimmed.includes("example.com") || trimmed.includes("invalid")) return fallback;
    return trimmed;
  } catch {
    return fallback;
  }
}

export function getCategoryFallback(category: FallbackCategory): string {
  return FALLBACKS[category] || FALLBACKS.default;
}
