export type ApplicantStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "INTERVIEW"
  | "ACCEPTED"
  | "WAITING_LIST"
  | "REJECTED"
  | "COMPLETED";

export type DocumentStatus = "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED";

export type InterviewStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export type NewsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type EventStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type Role = "ADMIN" | "STAFF" | "EDITOR" | "APPLICANT";

export interface Applicant {
  id: string;
  registrationNumber: string;
  email: string;
  password: string; // demo only, plain for exam
  name: string;
  nik: string;
  nisn: string;
  birthPlace: string;
  birthDate: string;
  gender: "LAKI_LAKI" | "PEREMPUAN";
  religion: string;
  address: string;
  province: string;
  city: string;
  district: string;
  village: string;
  phone: string;
  originSchool: string;
  graduationYear: string;
  // parents
  fatherName: string;
  fatherJob: string;
  fatherPhone: string;
  motherName: string;
  motherJob: string;
  motherPhone: string;
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  // choices
  majorChoice1: string;
  majorChoice2?: string;
  programChoice: "FULL_DAY" | "BOARDING" | "TAKHASSUS";
  // additional
  motivation?: string;
  tahfizhExperience?: string;
  hafalanCount?: string;
  achievements?: string;
  infoSource?: string;

  status: ApplicantStatus;
  isLocked: boolean;
  createdAt: number;
  updatedAt: number;
  submittedAt?: number;
  deleted?: boolean;
}

export interface ApplicationDocument {
  id: string;
  applicantId: string;
  type: "KK" | "AKTA" | "RAPOR" | "FOTO" | "IJAZAH" | "KTP_ORTU";
  label: string;
  status: DocumentStatus;
  fileName?: string;
  fileUrl?: string;
  notes?: string;
  verifiedAt?: number;
  rejectedReason?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Interview {
  id: string;
  applicantId: string;
  date: string;
  time: string;
  location: string;
  interviewer: string;
  notes?: string;
  status: InterviewStatus;
  createdAt: number;
  updatedAt: number;
}

export interface Major {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  published: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  category?: string;
  published: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  status: NewsStatus;
  publishedAt?: number;
  tags: string[];
  featured: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string;
  status: EventStatus;
  createdAt: number;
  updatedAt: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  createdAt: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: "ALL" | "APPLICANTS" | "SPECIFIC_APPLICANT";
  targetApplicantId?: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Notification {
  id: string;
  recipientId: string; // applicantId or "admin"
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  read: boolean;
  link?: string;
  createdAt: number;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorType: "ADMIN" | "APPLICANT" | "SYSTEM";
  actorName: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: string;
  timestamp: number;
}

export interface SiteSettings {
  schoolName: string;
  address: string;
  phone: string;
  email: string;
  socials: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
    tiktok?: string;
  };
  logoUrl?: string;
  faviconUrl?: string;
  ppdbOpen: boolean;
  ppdbStartDate?: string;
  ppdbEndDate?: string;
  quota?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  activeMajors?: string[];
  activePrograms?: string[];
  updatedAt: number;
}

export interface TimelineItem {
  key: string;
  label: string;
  date?: number;
  done: boolean;
  current?: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}
