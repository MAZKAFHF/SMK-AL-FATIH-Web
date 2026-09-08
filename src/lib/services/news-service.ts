import { getFirebaseDB } from "@/lib/firebase";
import { ref, get, set, update, push, remove, onValue, off } from "firebase/database";
import type { NewsItem } from "@/lib/types/index";
import { slugify } from "@/lib/utils/cn";

const PATH = "news";

export const newsService = {
  async create(data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): Promise<NewsItem> {
    const db = getFirebaseDB();
    const id = push(ref(db, PATH)).key || `news_${Date.now()}`;
    const now = Date.now();
    const raw: NewsItem = {
      id,
      title: data.title,
      slug: data.slug || slugify(data.title),
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? now : data.publishedAt,
      tags: data.tags || [],
      featured: data.featured || false,
      createdAt: now,
      updatedAt: now,
    };
    const item = Object.fromEntries(Object.entries(raw).filter(([,v])=> v!==undefined)) as NewsItem;
    await set(ref(db, `${PATH}/${id}`), item);
    return item;
  },
  async getAll(): Promise<NewsItem[]> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, PATH));
    if (!snap.exists()) return [];
    const data = snap.val() as Record<string, NewsItem>;
    return Object.values(data).sort((a,b)=> b.createdAt - a.createdAt);
  },
  async getPublished(): Promise<NewsItem[]> {
    const all = await this.getAll();
    return all.filter(n=> n.status === "PUBLISHED");
  },
  async getById(id: string): Promise<NewsItem | null> {
    const db = getFirebaseDB();
    const snap = await get(ref(db, `${PATH}/${id}`));
    return snap.exists() ? snap.val() as NewsItem : null;
  },
  async getBySlug(slug: string): Promise<NewsItem | null> {
    const all = await this.getAll();
    return all.find(n=> n.slug === slug) || null;
  },
  async update(id: string, updates: Partial<NewsItem>): Promise<void> {
    const db = getFirebaseDB();
    const cleaned = Object.fromEntries(Object.entries(updates).filter(([,v])=> v!==undefined)) as Partial<NewsItem>;
    await update(ref(db, `${PATH}/${id}`), { ...cleaned, updatedAt: Date.now() });
  },
  async delete(id: string): Promise<void> {
    const db = getFirebaseDB();
    await remove(ref(db, `${PATH}/${id}`));
  },
  subscribeAll(cb: (data: NewsItem[])=>void){
    const db = getFirebaseDB();
    const r = ref(db, PATH);
    const l = onValue(r, (snap)=>{
      if(!snap.exists()){cb([]); return;}
      const data = snap.val() as Record<string, NewsItem>;
      cb(Object.values(data).sort((a,b)=> b.createdAt - a.createdAt));
    });
    return ()=> off(r, "value", l);
  }
};


