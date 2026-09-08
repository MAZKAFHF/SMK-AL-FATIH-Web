export const siteConfig = {
  name: "SMK Tahfizh Al-Fatih",
  shortName: "SMK Al-Fatih",
  logo: "/logo.png",
  description: "Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.",
  slogan: "Bersama Al-Qur'an Membangun Generasi Unggul",
  address: "Jl. Rasamala, Kompleks Beringin Indah, Kelurahan Sidomulyo Timur, Kecamatan Marpoyan Damai, Kota Pekanbaru, Provinsi Riau.",
  landmark: "Sebelah SPBU Soekarno-Hatta, sekitar 350 meter dari Rumah Sakit Sansani.",
  foundation: "Yayasan Ayo Indonesia Mengaji / Al Fatih Islamic Center",
  type: "Swasta",
  motto: "Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.",
  email: "info@smkalfatih.sch.id",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890",
  socials: {
    instagram: "https://instagram.com/smkalfatih",
    youtube: "https://youtube.com/@smkalfatih",
    facebook: "https://facebook.com/smkalfatih",
    tiktok: "https://tiktok.com/@smkalfatih",
  },
  nav: [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/about" },
    { label: "Program", href: "/programs" },
    { label: "Jurusan", href: "/majors" },
    { label: "Fasilitas", href: "/facilities" },
    { label: "Galeri", href: "/gallery" },
    { label: "Berita", href: "/news" },
    { label: "Agenda", href: "/events" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/contact" },
  ],
  cta: {
    ppdb: "/admissions",
    register: "/register",
    login: "/login",
    status: "/admissions/status",
  },
};

export const majorsConfig = [
  {
    id: "rpl",
    slug: "rpl",
    name: "Rekayasa Perangkat Lunak (RPL)",
    shortName: "RPL",
    description: "Pemrograman, pembuatan aplikasi, website, dan pengembangan perangkat lunak.",
  },
];

export const programsConfig = [
  {
    slug: "tahfizh",
    name: "Program Tahfizh Al-Qur'an",
    description: "Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz. Membentuk generasi Qur'ani.",
  },
  {
    slug: "entrepreneurship",
    name: "Entrepreneurship & Kelas Bisnis Intensif",
    description: "Membekali siswa dengan jiwa wirausaha dan keterampilan bisnis praktis.",
  },
  {
    slug: "pbl",
    name: "Project Based Learning",
    description: "Pembelajaran berbasis proyek nyata untuk keterampilan abad 21.",
  },
];

export const facilitiesConfig = [
  { name: "Masjid Al-Fatih Islamic Center", category: "Ibadah" },
  { name: "Gedung Sekolah Modern", category: "Akademik" },
  { name: "Ruang Belajar ber-AC", category: "Akademik" },
  { name: "Laboratorium Komputer", category: "Akademik" },
  { name: "Dapur Standar Industri", category: "Praktik" },
  { name: "Kolam Renang", category: "Olahraga" },
  { name: "Area Memanah", category: "Olahraga" },
  { name: "Fasilitas Berkuda", category: "Olahraga" },
  { name: "Satpam 24 Jam", category: "Keamanan" },
  { name: "CCTV", category: "Keamanan" },
  { name: "Katering Makanan Sehat dan Bergizi", category: "Layanan" },
];
