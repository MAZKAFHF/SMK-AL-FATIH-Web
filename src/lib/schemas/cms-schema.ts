import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter"),
  excerpt: z.string().min(10, "Excerpt minimal 10 karakter"),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  coverImage: z.string().url("URL tidak valid").or(z.string().min(1, "Wajib diisi")),
  author: z.string().min(2, "Wajib diisi"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  tags: z.string().optional(),
  featured: z.boolean().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  date: z.string().min(1, "Wajib isi tanggal"),
  startTime: z.string().min(1, "Wajib isi jam mulai"),
  endTime: z.string().min(1, "Wajib isi jam selesai"),
  location: z.string().min(3, "Wajib diisi"),
  image: z.string().url("URL tidak valid").or(z.string().min(1, "Wajib diisi")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export const gallerySchema = z.object({
  imageUrl: z.string().url("URL tidak valid"),
  caption: z.string().min(3, "Caption minimal 3 karakter"),
  category: z.string().min(2, "Kategori wajib"),
});

export const facilitySchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  imageUrl: z.string().url("URL tidak valid"),
  category: z.string().min(2, "Kategori wajib"),
  order: z.coerce.number().min(0),
  published: z.boolean().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  answer: z.string().min(10, "Jawaban minimal 10 karakter"),
  category: z.string().min(2, "Kategori wajib"),
  order: z.coerce.number().min(0),
  published: z.boolean().optional(),
});

export const announcementSchema = z.object({
  title: z.string().min(5),
  message: z.string().min(10),
  audience: z.enum(["ALL", "APPLICANTS", "SPECIFIC_APPLICANT"]),
  targetApplicantId: z.string().optional(),
  published: z.boolean().optional(),
});

export const interviewSchema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(3),
  interviewer: z.string().min(2),
  notes: z.string().optional(),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]),
});
