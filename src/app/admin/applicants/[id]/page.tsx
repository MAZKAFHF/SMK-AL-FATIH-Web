import Client from "./Client";

export async function generateStaticParams() {
  try {
    const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://your_project-default-rtdb.firebaseio.com";
    const res = await fetch(`${dbUrl}/applicants.json`, { cache: "no-store" });
    if (!res.ok) return [{ id: "dummy" }];
    const data = await res.json();
    if (!data || typeof data !== "object") return [{ id: "dummy" }];
    const ids = Object.keys(data);
    if (ids.length === 0) return [{ id: "dummy" }];
    // limit to 10 for build time
    return ids.slice(0, 10).map((id) => ({ id }));
  } catch {
    return [{ id: "dummy" }];
  }
}

export default function Page() {
  return <Client />;
}
