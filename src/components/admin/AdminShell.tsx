"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { isAdminLoggedIn, getCurrentAdmin, logoutAdmin } from "@/lib/auth/local-auth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Calendar, Newspaper, Image as ImageIcon, Building, HelpCircle, Megaphone, Settings, LogOut, Menu, X, GraduationCap, FileCheck, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navGroups = [
  {
    title: "OVERVIEW",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "ADMISSIONS",
    items: [
      { href: "/admin/applicants", label: "Pendaftar", icon: Users },
      { href: "/admin/interviews", label: "Wawancara", icon: Calendar },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { href: "/admin/majors", label: "Jurusan", icon: GraduationCap },
      { href: "/admin/programs", label: "Program", icon: ClipboardList },
      { href: "/admin/news", label: "Berita", icon: Newspaper },
      { href: "/admin/events", label: "Agenda", icon: Calendar },
      { href: "/admin/gallery", label: "Galeri", icon: ImageIcon },
      { href: "/admin/facilities", label: "Fasilitas", icon: Building },
      { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { href: "/admin/announcements", label: "Pengumuman", icon: Megaphone },
      { href: "/admin/audit-logs", label: "Audit Log", icon: FileCheck },
      { href: "/admin/settings", label: "Pengaturan", icon: Settings },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);

  useEffect(()=>{
    if(!isAdminLoggedIn()){
      router.replace("/admin/login");
      return;
    }
    setAdminName(getCurrentAdmin()?.username || null);
    setReady(true);
  },[router]);

  if(!ready) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  // if login page, don't show shell (but this shell is only used in protected pages)
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-200 flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img src="/logo.png" alt="Logo SMK" className="h-9 w-9 rounded-xl object-contain bg-white p-1" />
          <div><p className="font-bold text-sm">SMK Al-Fatih</p><p className="text-xs text-slate-400">Admin Panel</p></div>
        </div>
        <nav className="flex-1 p-3 space-y-4 overflow-auto">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 mb-1.5 text-[11px] font-semibold tracking-widest text-slate-500">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition", active ? "bg-emerald-600 text-white" : "hover:bg-white/10 text-slate-300")}>
                      <item.icon className="h-4 w-4" /> {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-slate-400">Login sebagai</p><p className="text-sm font-medium">{adminName}</p>
          <Button variant="outline" size="sm" className="w-full mt-3 bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900" onClick={()=>{ logoutAdmin(); router.push("/admin/login"); }}><LogOut className="h-4 w-4 mr-2" />Keluar</Button>
        </div>
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/50" onClick={()=> setOpen(false)} />
          <div className="w-64 bg-slate-900 text-white p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold">Menu Admin</p>
              <button onClick={()=> setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="space-y-4 flex-1 overflow-auto">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="px-3 mb-1 text-[11px] font-semibold tracking-widest text-slate-400">{group.title}</p>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/10">
                        <item.icon className="h-4 w-4" /> {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <Button variant="outline" size="sm" className="mt-4" onClick={()=>{ logoutAdmin(); router.push("/admin/login"); }}>Keluar</Button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-14 bg-white border-b flex items-center justify-between px-4">
          <button onClick={()=> setOpen(true)} className="p-2 rounded-xl hover:bg-slate-100"><Menu className="h-6 w-6" /></button>
          <span className="font-bold">Admin</span>
          <Link href="/"><Button variant="ghost" size="sm">Lihat Website</Button></Link>
        </header>
        <div className="hidden lg:flex h-14 bg-white border-b items-center justify-between px-6">
          <p className="text-sm text-slate-600">Dashboard Admin — SMK Tahfizh Al-Fatih</p>
          <Link href="/"><Button variant="outline" size="sm">Lihat Website</Button></Link>
        </div>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}


