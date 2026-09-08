# Set DB URL via env or use placeholder - see .env.example
$base=$env:NEXT_PUBLIC_FIREBASE_DATABASE_URL
if ([string]::IsNullOrWhiteSpace($base)) { $base=$env:DATABASE_URL }
if ([string]::IsNullOrWhiteSpace($base)) { $base="https://your_project-default-rtdb.firebaseio.com" }
$now=[DateTimeOffset]::Now.ToUnixTimeMilliseconds()
function Put($path,$data){
  $json=$data | ConvertTo-Json -Depth 10 -Compress
  Invoke-RestMethod -Uri "$base/$path.json" -Method Put -Body $json -ContentType "application/json" -TimeoutSec 15 | Out-Null
  Write-Host "OK $path"
}
function Exists($path){
  try{ $r=Invoke-RestMethod -Uri "$base/$path.json" -Method Get -TimeoutSec 10; if($null -eq $r -or $r -eq "null"){ return $false }; if($r.PSObject.Properties.Count -eq 0){ return $false }; return $true } catch { return $false }
}
if(-not (Exists "facilities")){
  $d=@{
    f1=@{id="f1";name="Masjid Al-Fatih Islamic Center";description="Pusat ibadah, tahfizh, dan pembinaan karakter Islami.";imageUrl="/images/facility-masjid.svg";category="Ibadah";order=1;published=$true;createdAt=$now;updatedAt=$now}
    f2=@{id="f2";name="Gedung Sekolah Modern";description="Gedung 2 lantai dengan desain modern dan lingkungan asri.";imageUrl="/images/facility-fallback.svg";category="Akademik";order=2;published=$true;createdAt=$now;updatedAt=$now}
    f3=@{id="f3";name="Ruang Belajar ber-AC";description="Kelas nyaman ber-AC dengan kapasitas 24 siswa.";imageUrl="/images/facility-fallback.svg";category="Akademik";order=3;published=$true;createdAt=$now;updatedAt=$now}
    f4=@{id="f4";name="Laboratorium Komputer";description="Lab komputer lengkap untuk praktik RPL dan digital.";imageUrl="/images/facility-lab.svg";category="Akademik";order=4;published=$true;createdAt=$now;updatedAt=$now}
    f5=@{id="f5";name="Dapur Standar Industri";description="Dapur praktik Tata Boga standar industri.";imageUrl="/images/facility-kitchen.svg";category="Praktik";order=5;published=$true;createdAt=$now;updatedAt=$now}
    f6=@{id="f6";name="Kolam Renang";description="Kolam renang untuk ekstrakurikuler dan kesehatan.";imageUrl="/images/facility-fallback.svg";category="Olahraga";order=6;published=$true;createdAt=$now;updatedAt=$now}
    f7=@{id="f7";name="Area Memanah";description="Lapangan memanah untuk melatih fokus dan sunnah.";imageUrl="/images/facility-fallback.svg";category="Olahraga";order=7;published=$true;createdAt=$now;updatedAt=$now}
    f8=@{id="f8";name="Fasilitas Berkuda";description="Fasilitas berkuda untuk melatih keberanian dan kedisiplinan.";imageUrl="/images/facility-fallback.svg";category="Olahraga";order=8;published=$true;createdAt=$now;updatedAt=$now}
    f9=@{id="f9";name="Satpam 24 Jam";description="Keamanan 24 jam dengan pos jaga.";imageUrl="/images/facility-fallback.svg";category="Keamanan";order=9;published=$true;createdAt=$now;updatedAt=$now}
    f10=@{id="f10";name="CCTV";description="Pemantauan area sekolah dengan CCTV.";imageUrl="/images/facility-fallback.svg";category="Keamanan";order=10;published=$true;createdAt=$now;updatedAt=$now}
    f11=@{id="f11";name="Katering Makanan Sehat dan Bergizi";description="Katering halal, sehat, dan bergizi untuk siswa.";imageUrl="/images/facility-kitchen.svg";category="Layanan";order=11;published=$true;createdAt=$now;updatedAt=$now}
  }
  Put "facilities" $d
} else { Write-Host "facilities exists" }
if(-not (Exists "majors")){
  $d=@{
    rpl=@{id="rpl";slug="rpl";name="Rekayasa Perangkat Lunak (RPL)";shortName="RPL";description="Pemrograman, pembuatan aplikasi, website, dan pengembangan perangkat lunak.";imageUrl="/images/rpl.svg";published=$true;order=1;createdAt=$now;updatedAt=$now}
    "tata-boga"=@{id="tata-boga";slug="tata-boga";name="Tata Boga (Kuliner)";shortName="Tata Boga";description="Pengolahan makanan, manajemen dapur, dan dunia industri food dan beverage.";imageUrl="/images/tata-boga.svg";published=$true;order=2;createdAt=$now;updatedAt=$now}
  }
  Put "majors" $d
} else { Write-Host "majors exists" }
if(-not (Exists "programs")){
  $d=@{
    p1=@{id="p1";slug="tahfizh";name="Program Tahfizh Al-Quran";description="Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz. Membentuk generasi Qurani.";imageUrl="/images/tahfizh.svg";category="Tahfizh";published=$true;order=1;createdAt=$now;updatedAt=$now}
    p2=@{id="p2";slug="entrepreneurship";name="Entrepreneurship dan Kelas Bisnis Intensif";description="Membekali siswa dengan jiwa wirausaha dan keterampilan bisnis praktis.";imageUrl="/images/program-fallback.svg";category="Bisnis";published=$true;order=2;createdAt=$now;updatedAt=$now}
    p3=@{id="p3";slug="pbl";name="Project Based Learning";description="Pembelajaran berbasis proyek nyata untuk keterampilan abad 21.";imageUrl="/images/program-fallback.svg";category="Akademik";published=$true;order=3;createdAt=$now;updatedAt=$now}
    p4=@{id="p4";slug="asrama";name="Asrama Profesional dan Aman";description="Asrama nyaman, aman, dengan pembinaan 24 jam.";imageUrl="/images/program-fallback.svg";category="Fasilitas";published=$true;order=4;createdAt=$now;updatedAt=$now}
    p5=@{id="p5";slug="international";name="International Experience";description="Wawasan global untuk siswa berprestasi.";imageUrl="/images/program-fallback.svg";category="Global";published=$true;order=5;createdAt=$now;updatedAt=$now}
  }
  Put "programs" $d
} else { Write-Host "programs exists" }
if(-not (Exists "news")){
  $d=@{
    n1=@{id="n1";title="Kegiatan Tahfizh Akbar 2026 Sukses Digelar";slug="tahfizh-akbar-2026";excerpt="Kegiatan tahfizh akbar diikuti seluruh siswa dan wali murid dengan antusias.";content="Acara Tahfizh Akbar 2026 diikuti seluruh siswa, guru, dan wali murid. Kegiatan ini menjadi momentum untuk memotivasi siswa dalam menghafal Al-Quran. Acara diisi dengan murajaah bersama, tausiyah, dan motivasi dari ustadz. Siswa terbaik mendapat penghargaan.";coverImage="/images/news-fallback.svg";author="Admin";status="PUBLISHED";publishedAt=$now;tags=@("tahfizh");featured=$true;createdAt=$now;updatedAt=$now}
    n2=@{id="n2";title="Siswa RPL Juara Lomba Web Design Provinsi";slug="rpl-juara-web";excerpt="Prestasi membanggakan dari jurusan RPL.";content="Siswa RPL berhasil meraih juara 1 lomba web design tingkat provinsi. Karya mereka berupa aplikasi manajemen tahfizh.";coverImage="/images/news-fallback.svg";author="Admin";status="PUBLISHED";publishedAt=($now-86400000);tags=@("rpl","prestasi");featured=$false;createdAt=($now-86400000);updatedAt=($now-86400000)}
    n3=@{id="n3";title="Praktik Tata Boga: Siswa Sajikan Menu Internasional";slug="tata-boga-praktik";excerpt="Praktik dapur standar industri.";content="Siswa Tata Boga praktik menyajikan menu internasional dengan standar industri. Dapur dilengkapi peralatan profesional.";coverImage="/images/news-fallback.svg";author="Admin";status="PUBLISHED";publishedAt=($now-172800000);tags=@("tata-boga");featured=$false;createdAt=($now-172800000);updatedAt=($now-172800000)}
  }
  Put "news" $d
} else { Write-Host "news exists" }
if(-not (Exists "events")){
  $d=@{
    e1=@{id="e1";title="Sosialisasi PPDB 2026";description="Sosialisasi penerimaan peserta didik baru untuk wali calon siswa.";date="2026-01-15";startTime="08:00";endTime="11:00";location="Aula Masjid Al-Fatih";image="/images/event-fallback.svg";status="PUBLISHED";createdAt=$now;updatedAt=$now}
    e2=@{id="e2";title="Tes Seleksi dan Wawancara";description="Tes akademik dan wawancara calon peserta didik.";date="2026-02-10";startTime="08:00";endTime="15:00";location="Gedung Sekolah";image="/images/event-fallback.svg";status="PUBLISHED";createdAt=$now;updatedAt=$now}
    e3=@{id="e3";title="Pengumuman Hasil Seleksi";description="Pengumuman hasil seleksi PPDB.";date="2026-02-20";startTime="10:00";endTime="12:00";location="Website dan Mading";image="/images/event-fallback.svg";status="PUBLISHED";createdAt=$now;updatedAt=$now}
  }
  Put "events" $d
} else { Write-Host "events exists" }
if(-not (Exists "gallery")){
  $d=@{}
  $caps=@("Kegiatan Tahfizh","Praktik RPL","Kelas Tata Boga","Olahraga Berkuda","Asrama","Laboratorium","Memanah","Kegiatan Sekolah")
  $cats=@("Tahfizh","RPL","Tata Boga","Olahraga","Asrama","Fasilitas","Olahraga","Umum")
  for($i=0;$i -lt 8;$i++){ $id="g$($i+1)"; $d[$id]=@{id=$id;imageUrl="/images/gallery-fallback.svg";caption=$caps[$i];category=$cats[$i];createdAt=($now - $i*1000)} }
  Put "gallery" $d
} else { Write-Host "gallery exists" }
if(-not (Exists "faqs")){
  $d=@{
    q1=@{id="q1";question="Apa saja jurusan yang tersedia?";answer="Tersedia jurusan RPL (Rekayasa Perangkat Lunak) dan Tata Boga (Kuliner).";category="Umum";order=1;published=$true;createdAt=$now;updatedAt=$now}
    q2=@{id="q2";question="Berapa target hafalan?";answer="Full Day 3 Juz, Boarding 10 Juz, Takhassus 30 Juz.";category="Program";order=2;published=$true;createdAt=$now;updatedAt=$now}
    q3=@{id="q3";question="Apakah ada asrama?";answer="Ya, tersedia asrama profesional dan aman untuk program Boarding dan Takhassus.";category="Fasilitas";order=3;published=$true;createdAt=$now;updatedAt=$now}
    q4=@{id="q4";question="Bagaimana cara mendaftar PPDB?";answer="Klik Daftar Sekarang, buat akun, isi form, unggah dokumen, submit, dan cek status di /admissions/status.";category="PPDB";order=4;published=$true;createdAt=$now;updatedAt=$now}
    q5=@{id="q5";question="Di mana lokasi sekolah?";answer="Jl. Rasamala, Kompleks Beringin Indah, Pekanbaru, sebelah SPBU Soekarno-Hatta, 350m dari RS Sansani.";category="Umum";order=5;published=$true;createdAt=$now;updatedAt=$now}
  }
  Put "faqs" $d
} else { Write-Host "faqs exists" }
if(-not (Exists "announcements")){
  $d=@{
    a1=@{id="a1";title="PPDB 2026/2027 Telah Dibuka!";message="Pendaftaran peserta didik baru tahun ajaran 2026/2027 telah dibuka. Segera daftar dan lengkapi berkas.";audience="ALL";published=$true;createdAt=$now;updatedAt=$now}
    a2=@{id="a2";title="Jadwal Wawancara PPDB";message="Wawancara akan dilaksanakan 10 Februari 2026 di Aula Masjid Al-Fatih. Harap cek dashboard secara berkala.";audience="APPLICANTS";published=$true;createdAt=$now;updatedAt=$now}
  }
  Put "announcements" $d
} else { Write-Host "announcements exists" }
try{ $r=Invoke-RestMethod -Uri "$base/settings/site.json" -Method Get -TimeoutSec 10; if($null -ne $r -and $r -ne "null"){ Write-Host "settings exists" } else { throw "null" } } catch {
  $d=@{schoolName="SMK Tahfizh Al-Fatih";address="Jl. Rasamala, Kompleks Beringin Indah, Kelurahan Sidomulyo Timur, Kecamatan Marpoyan Damai, Kota Pekanbaru, Provinsi Riau.";phone="+62 812-3456-7890";email="info@smkalfatih.sch.id";socials=@{instagram="https://instagram.com/smkalfatih";youtube="https://youtube.com/@smkalfatih";facebook="https://facebook.com/smkalfatih"};logoUrl="/logo.png";faviconUrl="/logo.png";ppdbOpen=$true;ppdbStartDate="2026-01-01";ppdbEndDate="2026-07-31";quota="120";heroTitle="SMK Tahfizh Al-Fatih";heroSubtitle="Berilmu, Berakhlak, Berprestasi, Siap Membangun Peradaban Bangsa.";heroImageUrl="/images/hero-fallback.svg";activeMajors=@("rpl","tata-boga");activePrograms=@("tahfizh","entrepreneurship","pbl");updatedAt=$now}
  Put "settings/site" $d
}
Write-Host "Done seeding"
