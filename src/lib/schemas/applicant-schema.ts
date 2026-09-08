import { z } from "zod";

export const applicantSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(100),
  nik: z.string().min(16, "NIK harus 16 digit").max(16),
  nisn: z.string().min(10, "NISN harus 10 digit").max(10),
  birthPlace: z.string().min(2, "Wajib diisi"),
  birthDate: z.string().min(1, "Wajib diisi"),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"], { message: "Pilih jenis kelamin" }),
  religion: z.string().min(1, "Wajib diisi"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  province: z.string().min(2, "Wajib diisi"),
  city: z.string().min(2, "Wajib diisi"),
  district: z.string().min(2, "Wajib diisi"),
  village: z.string().min(2, "Wajib diisi"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  email: z.string().email("Email tidak valid"),
  originSchool: z.string().min(2, "Wajib diisi"),
  graduationYear: z.string().min(4, "Wajib diisi"),
  fatherName: z.string().min(2, "Wajib diisi"),
  fatherJob: z.string().min(2, "Wajib diisi"),
  fatherPhone: z.string().min(10, "Wajib diisi"),
  motherName: z.string().min(2, "Wajib diisi"),
  motherJob: z.string().min(2, "Wajib diisi"),
  motherPhone: z.string().min(10, "Wajib diisi"),
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianPhone: z.string().optional(),
  majorChoice1: z.string().min(1, "Pilih jurusan"),
  majorChoice2: z.string().optional(),
  programChoice: z.enum(["FULL_DAY", "BOARDING", "TAKHASSUS"], { message: "Pilih program" }),
  motivation: z.string().optional(),
  tahfizhExperience: z.string().optional(),
  hafalanCount: z.string().optional(),
  achievements: z.string().optional(),
  infoSource: z.string().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Wajib diisi"),
});

export type ApplicantFormValues = z.infer<typeof applicantSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
