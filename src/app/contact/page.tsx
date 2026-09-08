import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Kontak</h1>
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Card><CardContent className="p-6 space-y-4">
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-emerald-600 mt-0.5" /><div><p className="font-semibold text-sm">Alamat</p><p className="text-sm text-slate-600">{siteConfig.address}</p><p className="text-xs text-amber-600">{siteConfig.landmark}</p></div></div>
            <div className="flex gap-3 items-center"><Phone className="h-5 w-5 text-emerald-600" /><div><p className="font-semibold text-sm">Telepon</p><p className="text-sm text-slate-600">{siteConfig.phone}</p></div></div>
            <div className="flex gap-3 items-center"><Mail className="h-5 w-5 text-emerald-600" /><div><p className="font-semibold text-sm">Email</p><p className="text-sm text-slate-600">{siteConfig.email}</p></div></div>
          </CardContent></Card>
          <div className="rounded-2xl overflow-hidden border h-[360px] bg-slate-100">
            <iframe src="https://maps.google.com/maps?q=Gedung%20SMPIT%20Tahfizh%20Al%20Fatih%20Pekanbaru%20Jl%20Rasamala%20Kompleks%20Beringin%20Indah&t=&z=17&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0" loading="lazy" title="Lokasi Gedung SMPIT Tahfizh Al Fatih Pekanbaru" />
          </div>
        </div>
      </div>
    </div>
  );
}


