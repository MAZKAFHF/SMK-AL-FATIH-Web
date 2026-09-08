"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { isAdminLoggedIn, getCurrentAdmin, logoutAdmin } from "@/lib/auth/local-auth";
import { isApplicantLoggedIn, getApplicantSession, logoutApplicant } from "@/lib/auth/applicant-auth";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type NavItem = { label: string; href?: string; children?: { label: string; href: string; desc?: string }[] };

const navConfig: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang",
    children: [
      { label: "Profil Sekolah", href: "/about", desc: "Visi, misi & identitas" },
      { label: "Visi & Misi", href: "/about/vision-mission", desc: "Tujuan & nilai" },
    ],
  },
  {
    label: "Program",
    children: [
      { label: "Tahfizh Al-Qur'an", href: "/programs/tahfizh", desc: "3 / 10 / 30 Juz" },
      { label: "Entrepreneurship", href: "/programs/entrepreneurship", desc: "Kelas bisnis intensif" },
      { label: "Project Based Learning", href: "/programs/pbl", desc: "Belajar berbasis proyek" },
      { label: "Semua Program", href: "/programs", desc: "Lihat lengkap" },
    ],
  },
  {
    label: "Jurusan",
    children: [
      { label: "RPL", href: "/majors/rpl", desc: "Rekayasa Perangkat Lunak" },
      { label: "Semua Jurusan", href: "/majors", desc: "Lihat daftar jurusan" },
    ],
  },
  {
    label: "Kehidupan",
    children: [
      { label: "Fasilitas", href: "/facilities", desc: "Masjid, lab, asrama..." },
      { label: "Galeri", href: "/gallery", desc: "Momen sekolah" },
      { label: "Agenda", href: "/events", desc: "Kalender kegiatan" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Berita", href: "/news", desc: "Kabar terkini" },
      { label: "FAQ", href: "/faq", desc: "Tanya jawab" },
      { label: "Kontak", href: "/contact", desc: "Hubungi kami" },
    ],
  },
  { label: "PPDB", href: "/admissions" },
];

function DesktopDropdown({ item, isOpen, onToggle }: { item: NavItem; isOpen: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onToggle]);

  if (!item.children) {
    return (
      <Link href={item.href!} className="px-2.5 py-2 text-[14px] font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition whitespace-nowrap">
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        onMouseEnter={() => !isOpen && onToggle()}
        className={cn("inline-flex items-center gap-1 px-2.5 py-2 text-[14px] font-medium rounded-lg transition whitespace-nowrap", isOpen ? "text-emerald-700 bg-emerald-50" : "text-slate-700 hover:text-emerald-700 hover:bg-slate-50")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label} <ChevronDown className={cn("h-3.5 w-3.5 transition", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div
          onMouseLeave={onToggle}
          className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] w-[320px] bg-white rounded-2xl shadow-xl border border-slate-200 p-2 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="py-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onToggle}
                className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-slate-50 transition group"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">{child.label}</span>
                {child.desc && <span className="text-xs text-slate-500">{child.desc}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApplicant, setIsApplicant] = useState(false);
  const [applicantName, setApplicantName] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    const appl = isApplicantLoggedIn();
    setIsApplicant(appl);
    if (appl) setApplicantName(getApplicantSession()?.name || null);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, mobileOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setMobileOpen(false), setOpenDropdown(null));
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    if (isAdmin) {
      logoutAdmin();
      setIsAdmin(false);
    }
    if (isApplicant) {
      logoutApplicant();
      setIsApplicant(false);
      setApplicantName(null);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header className={cn("sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-shadow overflow-visible", scrolled ? "border-b shadow-sm" : "border-b border-slate-100")}>
        <div className="mx-auto max-w-[1360px] px-4 sm:px-5 lg:px-6">
          <div className="flex h-[72px] items-center justify-between gap-4 lg:gap-3">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5 min-w-0 shrink-0">
              <img src="/logo.png" alt="SMK Tahfizh Al-Fatih" className="h-10 w-10 lg:h-[42px] lg:w-[42px] rounded-xl object-contain bg-white border border-slate-200 shadow-sm p-1.5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold tracking-tight text-slate-900 leading-none text-[15px] lg:text-[17px] whitespace-nowrap">SMK Tahfizh Al-Fatih</span>
                <span className="hidden lg:block text-[11px] text-slate-500 leading-none mt-1 truncate">Bersama Al-Qur'an Membangun Generasi Unggul</span>
                <span className="hidden sm:block lg:hidden text-[11px] text-slate-500 leading-none mt-0.5">Bersama Al-Qur'an</span>
                <span className="sm:hidden text-[11px] text-slate-500 leading-none mt-0.5">Pekanbaru</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0">
              {navConfig.map((item) => (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                />
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
              {isAdmin ? (
                <>
                  <Link href="/admin"><Button variant="outline" size="sm" className="h-8 px-3 text-sm"><LayoutDashboard className="h-4 w-4 mr-1.5" />Admin</Button></Link>
                  <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
                </>
              ) : isApplicant ? (
                <>
                  <Link href="/dashboard"><Button variant="outline" size="sm" className="h-8 px-3 text-sm">{applicantName ? applicantName.split(" ")[0] : "Dashboard"}</Button></Link>
                  <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={handleLogout}>Keluar</Button>
                </>
              ) : (
                <>
                  <Link href="/login"><Button variant="ghost" size="sm" className="h-8 px-3 xl:px-4 text-sm text-slate-700 hover:text-emerald-700 hover:bg-emerald-50">Masuk</Button></Link>
                  <Link href="/register"><Button size="sm" className="h-8 px-3 xl:px-4 bg-emerald-600 hover:bg-emerald-700 shadow-sm whitespace-nowrap text-sm">Daftar PPDB</Button></Link>
                </>
              )}
            </div>

            {/* Mobile button */}
            <button
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 h-dvh w-[88%] max-w-[360px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
              <div className="h-[64px] flex items-center justify-between px-5 border-b shrink-0">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="h-9 w-9 rounded-lg object-contain border p-1" />
                  <div><p className="font-bold text-sm leading-none">SMK Tahfizh Al-Fatih</p><p className="text-xs text-slate-500">Menu</p></div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="h-9 w-9 grid place-items-center rounded-xl hover:bg-slate-100" aria-label="Close"><X className="h-5 w-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {navConfig.map((item) => (
                  <div key={item.label} className="border-b border-slate-100 last:border-0 pb-1">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left hover:bg-slate-50"
                        >
                          <span className="font-semibold text-slate-800">{item.label}</span>
                          <ChevronDown className={cn("h-4 w-4 text-slate-500 transition", mobileAccordion === item.label && "rotate-180")} />
                        </button>
                        {mobileAccordion === item.label && (
                          <div className="ml-2 pl-3 border-l-2 border-emerald-100 space-y-1 pb-2">
                            {item.children.map((c) => (
                              <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50">
                                <p className="text-sm font-medium text-slate-900">{c.label}</p>
                                {c.desc && <p className="text-xs text-slate-500">{c.desc}</p>}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={item.href!} onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-xl font-medium hover:bg-slate-50">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-3 space-y-2">
                  {isAdmin ? (
                    <>
                      <Link href="/admin" onClick={() => setMobileOpen(false)}><Button className="w-full h-11 bg-slate-900">Dashboard Admin</Button></Link>
                      <Button variant="outline" className="w-full h-11" onClick={handleLogout}>Keluar</Button>
                    </>
                  ) : isApplicant ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}><Button className="w-full h-11">Dashboard Peserta</Button></Link>
                      <Button variant="outline" className="w-full h-11" onClick={handleLogout}>Keluar</Button>
                    </>
                  ) : (
                    <>
                      <Link href="/register" onClick={() => setMobileOpen(false)}><Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700">Daftar PPDB</Button></Link>
                      <Link href="/login" onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full h-11">Masuk Peserta</Button></Link>
                      <Link href="/admin/login" onClick={() => setMobileOpen(false)} className="block text-center text-sm text-slate-500 py-2">Masuk Admin</Link>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 border-t bg-slate-50 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">SMK Tahfizh Al-Fatih</p>
                <p>Jl. Rasamala, Pekanbaru • 350m dari RS Sansani</p>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* spacer for focus */}
      <div aria-hidden className="sr-only">Navigation loaded</div>
    </>
  );
}
