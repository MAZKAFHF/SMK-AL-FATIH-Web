const DB_URL =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
  process.env.DATABASE_URL ||
  "https://your_project-default-rtdb.firebaseio.com"; // set via .env.local - see .env.example

async function put(path: string, data: any) {
  const res = await fetch(`${DB_URL}/${path}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed ${res.status} ${await res.text()}`);
  console.log(`✓ ${path}`);
}

async function get(path: string) {
  const res = await fetch(`${DB_URL}/${path}.json`);
  const json = await res.json();
  return json;
}

async function seed() {
  console.log("Seeding to", DB_URL);

  const existingFacilities = await get("facilities");
  if (existingFacilities && Object.keys(existingFacilities).length > 0) {
    console.log("facilities already exists, skipping");
  } else {
    const facilities: Record<string, any> = {
      f1: { id: "f1", name: "Masjid Al-Fatih Islamic Center", description: "Pusat ibadah, tahfizh, dan pembinaan karakter Islami.", imageUrl: "/images/facility-masjid.svg", category: "Ibadah", order: 1, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f2: { id: "f2", name: "Gedung Sekolah Modern", description: "Gedung 2 lantai dengan desain modern dan lingkungan asri.", imageUrl: "/images/facility-fallback.svg", category: "Akademik", order: 2, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f3: { id: "f3", name: "Ruang Belajar ber-AC", description: "Kelas nyaman ber-AC dengan kapasitas 24 siswa.", imageUrl: "/images/facility-fallback.svg", category: "Akademik", order: 3, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f4: { id: "f4", name: "Laboratorium Komputer", description: "Lab komputer lengkap untuk praktik RPL dan digital.", imageUrl: "/images/facility-lab.svg", category: "Akademik", order: 4, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f5: { id: "f5", name: "Dapur Standar Industri", description: "Dapur praktik Tata Boga standar industri.", imageUrl: "/images/facility-kitchen.svg", category: "Praktik", order: 5, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f6: { id: "f6", name: "Kolam Renang", description: "Kolam renang untuk ekstrakurikuler dan kesehatan.", imageUrl: "/images/facility-fallback.svg", category: "Olahraga", order: 6, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f7: { id: "f7", name: "Area Memanah", description: "Lapangan memanah untuk melatih fokus dan sunnah.", imageUrl: "/images/facility-fallback.svg", category: "Olahraga", order: 7, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f8: { id: "f8", name: "Fasilitas Berkuda", description: "Fasilitas berkuda untuk melatih keberanian dan kedisiplinan.", imageUrl: "/images/facility-fallback.svg", category: "Olahraga", order: 8, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f9: { id: "f9", name: "Satpam 24 Jam", description: "Keamanan 24 jam dengan pos jaga.", imageUrl: "/images/facility-fallback.svg", category: "Keamanan", order: 9, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f10: { id: "f10", name: "CCTV", description: "Pemantauan area sekolah dengan CCTV.", imageUrl: "/images/facility-fallback.svg", category: "Keamanan", order: 10, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      f11: { id: "f11", name: "Katering Makanan Sehat dan Bergizi", description: "Katering halal, sehat, dan bergizi untuk siswa.", imageUrl: "/images/facility-kitchen.svg", category: "Layanan", order: 11, published: true, createdAt: Date.now(), updatedAt: Date.now() },
    };
    await put("facilities", facilities);
  }

  const existingMajors = await get("majors");
  if (existingMajors && Object.keys(existingMajors).length > 0) {
    console.log("majors already exists, skipping");
  } else {
    const majors: Record<string, any> = {
      rpl: { id: "rpl", slug: "rpl", name: "Rekayasa Perangkat Lunak (RPL)", shortName: "RPL", description: "Pemrograman, pembuatan aplikasi, website, dan pengembangan perangkat lunak.", imageUrl: "/images/rpl.svg", published: true, order: 1, createdAt: Date.now(), updatedAt: Date.now() },
      "tata-boga": { id: "tata-boga", slug: "tata-boga", name: "Tata Boga (Kuliner)", shortName: "Tata Boga", description: "Pengolahan makanan, manajemen dapur, dan dunia industri food & beverage.", imageUrl: "/images/tata-boga.svg", published: true, order: 2, createdAt: Date.now(), updatedAt: Date.now() },
    };
    await put("majors", majors);
  }

  const existingPrograms = await get("programs");
  if (existingPrograms && Object.keys(existingPrograms).length > 0) {
    console.log("programs already exists, skipping");
  } else {
    const programs: Record<string, any> = {
      p1: { id: "p1", slug: "tahfizh", name: "Program Tahfizh Al-Qur'an", description: "Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz. Membentuk generasi Qur'ani.", imageUrl: "/images/tahfizh.svg", category: "Tahfizh", published: true, order: 1, createdAt: Date.now(), updatedAt: Date.now() },
      p2: { id: "p2", slug: "entrepreneurship", name: "Entrepreneurship & Kelas Bisnis Intensif", description: "Membekali siswa dengan jiwa wirausaha dan keterampilan bisnis praktis.", imageUrl: "/images/program-fallback.svg", category: "Bisnis", published: true, order: 2, createdAt: Date.now(), updatedAt: Date.now() },
      p3: { id: "p3", slug: "pbl", name: "Project Based Learning", description: "Pembelajaran berbasis proyek nyata untuk keterampilan abad 21.", imageUrl: "/images/program-fallback.svg", category: "Akademik", published: true, order: 3, createdAt: Date.now(), updatedAt: Date.now() },
      p4: { id: "p4", slug: "asrama", name: "Asrama Profesional & Aman", description: "Asrama nyaman, aman, dengan pembinaan 24 jam.", imageUrl: "/images/program-fallback.svg", category: "Fasilitas", published: true, order: 4, createdAt: Date.now(), updatedAt: Date.now() },
      p5: { id: "p5", slug: "international", name: "International Experience", description: "Wawasan global untuk siswa berprestasi.", imageUrl: "/images/program-fallback.svg", category: "Global", published: true, order: 5, createdAt: Date.now(), updatedAt: Date.now() },
    };
    await put("programs", programs);
  }

  const existingNews = await get("news");
  if (existingNews && Object.keys(existingNews).length > 0) {
    console.log("news already exists, skipping");
  } else {
    const news: Record<string, any> = {
      n1: { id: "n1", title: "Kegiatan Tahfizh Akbar 2026 Sukses Digelar", slug: "tahfizh-akbar-2026", excerpt: "Kegiatan tahfizh akbar diikuti seluruh siswa dan wali murid dengan antusias.", content: "Acara Tahfizh Akbar 2026 diikuti seluruh siswa, guru, dan wali murid. Kegiatan ini menjadi momentum untuk memotivasi siswa dalam menghafal Al-Qur'an. Acara diisi dengan murajaah bersama, tausiyah, dan motivasi dari ustadz. Siswa terbaik mendapat penghargaan.", coverImage: "/images/news-fallback.svg", author: "Admin", status: "PUBLISHED", publishedAt: Date.now(), tags: ["tahfizh"], featured: true, createdAt: Date.now(), updatedAt: Date.now() },
      n2: { id: "n2", title: "Siswa RPL Juara Lomba Web Design Provinsi", slug: "rpl-juara-web", excerpt: "Prestasi membanggakan dari jurusan RPL.", content: "Siswa RPL berhasil meraih juara 1 lomba web design tingkat provinsi. Karya mereka berupa aplikasi manajemen tahfizh.", coverImage: "/images/news-fallback.svg", author: "Admin", status: "PUBLISHED", publishedAt: Date.now() - 86400000, tags: ["rpl", "prestasi"], featured: false, createdAt: Date.now() - 86400000, updatedAt: Date.now() - 86400000 },
      n3: { id: "n3", title: "Praktik Tata Boga: Siswa Sajikan Menu Internasional", slug: "tata-boga-praktik", excerpt: "Praktik dapur standar industri.", content: "Siswa Tata Boga praktik menyajikan menu internasional dengan standar industri. Dapur dilengkapi peralatan profesional.", coverImage: "/images/news-fallback.svg", author: "Admin", status: "PUBLISHED", publishedAt: Date.now() - 172800000, tags: ["tata-boga"], featured: false, createdAt: Date.now() - 172800000, updatedAt: Date.now() - 172800000 },
    };
    await put("news", news);
  }

  const existingEvents = await get("events");
  if (existingEvents && Object.keys(existingEvents).length > 0) {
    console.log("events already exists, skipping");
  } else {
    const events: Record<string, any> = {
      e1: { id: "e1", title: "Sosialisasi PPDB 2026", description: "Sosialisasi penerimaan peserta didik baru untuk wali calon siswa.", date: "2026-01-15", startTime: "08:00", endTime: "11:00", location: "Aula Masjid Al-Fatih", image: "/images/event-fallback.svg", status: "PUBLISHED", createdAt: Date.now(), updatedAt: Date.now() },
      e2: { id: "e2", title: "Tes Seleksi & Wawancara", description: "Tes akademik dan wawancara calon peserta didik.", date: "2026-02-10", startTime: "08:00", endTime: "15:00", location: "Gedung Sekolah", image: "/images/event-fallback.svg", status: "PUBLISHED", createdAt: Date.now(), updatedAt: Date.now() },
      e3: { id: "e3", title: "Pengumuman Hasil Seleksi", description: "Pengumuman hasil seleksi PPDB.", date: "2026-02-20", startTime: "10:00", endTime: "12:00", location: "Website & Mading", image: "/images/event-fallback.svg", status: "PUBLISHED", createdAt: Date.now(), updatedAt: Date.now() },
    };
    await put("events", events);
  }

  const existingGallery = await get("gallery");
  if (existingGallery && Object.keys(existingGallery).length > 0) {
    console.log("gallery already exists, skipping");
  } else {
    const gallery: Record<string, any> = {};
    const captions = ["Kegiatan Tahfizh", "Praktik RPL", "Kelas Tata Boga", "Olahraga Berkuda", "Asrama", "Laboratorium", "Memanah", "Kegiatan Sekolah"];
    const categories = ["Tahfizh", "RPL", "Tata Boga", "Olahraga", "Asrama", "Fasilitas", "Olahraga", "Umum"];
    for (let i = 0; i < 8; i++) {
      const id = `g${i + 1}`;
      gallery[id] = { id, imageUrl: "/images/gallery-fallback.svg", caption: captions[i], category: categories[i], createdAt: Date.now() - i * 1000 };
    }
    await put("gallery", gallery);
  }

  const existingFaqs = await get("faqs");
  if (existingFaqs && Object.keys(existingFaqs).length > 0) {
    console.log("faqs already exists, skipping");
  } else {
    const faqs: Record<string, any> = {
      q1: { id: "q1", question: "Apa saja jurusan yang tersedia?", answer: "Tersedia jurusan RPL (Rekayasa Perangkat Lunak) dan Tata Boga (Kuliner).", category: "Umum", order: 1, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      q2: { id: "q2", question: "Berapa target hafalan?", answer: "Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz.", category: "Program", order: 2, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      q3: { id: "q3", question: "Apakah ada asrama?", answer: "Ya, tersedia asrama profesional & aman untuk program Boarding dan Takhassus.", category: "Fasilitas", order: 3, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      q4: { id: "q4", question: "Bagaimana cara mendaftar PPDB?", answer: "Klik Daftar Sekarang, buat akun, isi form, unggah dokumen, submit, dan cek status di /admissions/status.", category: "PPDB", order: 4, published: true, createdAt: Date.now(), updatedAt: Date.now() },
      q5: { id: "q5", question: "Di mana lokasi sekolah?", answer: "Jl. Rasamala, Kompleks Beringin Indah, Pekanbaru, sebelah SPBU Soekarno-Hatta, 350m dari RS Sansani.", category: "Umum", order: 5, published: true, createdAt: Date.now(), updatedAt: Date.now() },
    };
    await put("faqs", faqs);
  }

  const existingAnn = await get("announcements");
  if (existingAnn && Object.keys(existingAnn).length > 0) {
    console.log("announcements already exists, skipping");
  } else {
    const ann: Record<string, any> = {
      a1: { id: "a1", title: "PPDB 2026/2027 Telah Dibuka!", message: "Pendaftaran peserta didik baru tahun ajaran 2026/2027 telah dibuka. Segera daftar dan lengkapi berkas.", audience: "ALL", published: true, createdAt: Date.now(), updatedAt: Date.now() },
      a2: { id: "a2", title: "Jadwal Wawancara PPDB", message: "Wawancara akan dilaksanakan 10 Februari 2026 di Aula Masjid Al-Fatih. Harap cek dashboard secara berkala.", audience: "APPLICANTS", published: true, createdAt: Date.now(), updatedAt: Date.now() },
    };
    await put("announcements", ann);
  }

  // settings default
  const existingSettings = await get("settings/site");
  if (existingSettings) {
    console.log("settings already exists, skipping");
  } else {
    await put("settings/site", {
      schoolName: "SMK Tahfizh Al-Fatih",
      address: "Jl. Rasamala, Kompleks Beringin Indah, Kelurahan Sidomulyo Timur, Kecamatan Marpoyan Damai, Kota Pekanbaru, Provinsi Riau.",
      phone: "+62 812-3456-7890",
      email: "info@smkalfatih.sch.id",
      socials: { instagram: "https://instagram.com/smkalfatih", youtube: "https://youtube.com/@smkalfatih", facebook: "https://facebook.com/smkalfatih" },
      logoUrl: "/logo.png",
      faviconUrl: "/logo.png",
      ppdbOpen: true,
      ppdbStartDate: "2026-01-01",
      ppdbEndDate: "2026-07-31",
      quota: "120",
      heroTitle: "SMK Tahfizh Al-Fatih",
      heroSubtitle: "Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.",
      heroImageUrl: "/images/hero-fallback.svg",
      activeMajors: ["rpl", "tata-boga"],
      activePrograms: ["tahfizh", "entrepreneurship", "pbl"],
      updatedAt: Date.now(),
    });
  }

  console.log("Done seeding");
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
