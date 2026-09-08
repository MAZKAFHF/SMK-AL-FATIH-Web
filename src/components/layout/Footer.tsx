import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Instagram, Youtube, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo SMK" className="h-10 w-10 rounded-xl object-contain bg-white p-1.5" />
              <div>
                <p className="font-bold leading-none">SMK Tahfizh Al-Fatih</p>
                <p className="text-xs text-slate-400">{siteConfig.foundation}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{siteConfig.description} <br />&quot;{siteConfig.slogan}&quot;</p>
            <div className="flex gap-2 pt-2">
              <a href={siteConfig.socials.instagram} target="_blank" className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition"><Instagram className="h-4 w-4" /></a>
              <a href={siteConfig.socials.youtube} target="_blank" className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition"><Youtube className="h-4 w-4" /></a>
              <a href={siteConfig.socials.facebook} target="_blank" className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Navigasi</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {siteConfig.nav.slice(0,6).map(item=>(
                <li key={item.href}><Link href={item.href} className="hover:text-emerald-400 transition">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">PPDB</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/admissions" className="hover:text-emerald-400">Informasi PPDB</Link></li>
              <li><Link href="/admissions/requirements" className="hover:text-emerald-400">Syarat Pendaftaran</Link></li>
              <li><Link href="/register" className="hover:text-emerald-400">Daftar Sekarang</Link></li>
              <li><Link href="/admissions/status" className="hover:text-emerald-400">Cek Status</Link></li>
              <li><Link href="/majors" className="hover:text-emerald-400">Jurusan</Link></li>
              <li><Link href="/programs" className="hover:text-emerald-400">Program Unggulan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Kontak</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" /><span>{siteConfig.address} <br/><span className="text-xs italic">{siteConfig.landmark}</span></span></li>
              <li className="flex gap-3 items-center"><Phone className="h-4 w-4 text-emerald-400" />{siteConfig.phone}</li>
              <li className="flex gap-3 items-center"><Mail className="h-4 w-4 text-emerald-400" />{siteConfig.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} SMK Tahfizh Al-Fatih. All rights reserved.</p>
          <p>Yayasan Ayo Indonesia Mengaji</p>
        </div>
      </div>
    </footer>
  );
}


