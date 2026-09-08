import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://smkalfatih.sch.id";
  const routes = [
    "",
    "/about",
    "/about/vision-mission",
    "/programs",
    "/programs/tahfizh",
    "/programs/entrepreneurship",
    "/programs/pbl",
    "/majors",
    "/majors/rpl",
    "/facilities",
    "/gallery",
    "/news",
    "/events",
    "/faq",
    "/contact",
    "/admissions",
    "/admissions/requirements",
    "/admissions/status",
    "/register",
    "/login",
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
