/**
 * Mock data cho homepage ViecPro
 * Tham khảo cấu trúc từ TopCV, JobsGo, VietnamWorks
 */

export type JobItem = {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  salaryRange: [number, number]; // triệu VND
  tags: string[];
  postedAt: string;
  isHot?: boolean;
  isNew?: boolean;
  isRemote?: boolean;
  category: string;
  experience: string;
  deadline: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
};

export type Company = {
  id: number;
  name: string;
  logo: string;
  cover: string;
  industry: string;
  location: string;
  jobCount: number;
  followerCount: string;
  rating: number;
  size: string;
};

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

/* -------------------------------------------------------------------------- */
/*                                CATEGORIES                                  */
/* -------------------------------------------------------------------------- */

export const categories: Category[] = [
  {
    id: "it",
    name: "IT - Phần mềm",
    slug: "it-phan-mem",
    icon: "Code2",
    count: 4823,
    color: "#155EEF" // blue
  },
  {
    id: "marketing",
    name: "Marketing / Truyền thông",
    slug: "marketing",
    icon: "Megaphone",
    count: 2156,
    color: "#F79009" // warning orange
  },
  {
    id: "sales",
    name: "Bán hàng / Kinh doanh",
    slug: "ban-hang",
    icon: "TrendingUp",
    count: 3287,
    color: "#12B76A" // success green
  },
  {
    id: "finance",
    name: "Tài chính / Kế toán",
    slug: "tai-chinh",
    icon: "Wallet",
    count: 1845,
    color: "#7A5AF8" // violet
  },
  {
    id: "hr",
    name: "Nhân sự / Hành chính",
    slug: "nhan-su",
    icon: "Users",
    count: 1234,
    color: "#F04438" // danger red
  },
  {
    id: "design",
    name: "Thiết kế / Creative",
    slug: "thiet-ke",
    icon: "Palette",
    count: 967,
    color: "#9B8AFB" // light violet
  },
  {
    id: "logistics",
    name: "Logistics / Vận tải",
    slug: "logistics",
    icon: "Truck",
    count: 1456,
    color: "#0EA5E9" // sky
  },
  {
    id: "health",
    name: "Y tế / Sức khỏe",
    slug: "y-te",
    icon: "HeartPulse",
    count: 845,
    color: "#EF4444" // red
  },
  {
    id: "education",
    name: "Giáo dục / Đào tạo",
    slug: "giao-duc",
    icon: "GraduationCap",
    count: 1123,
    color: "#06B6D4" // cyan
  },
  {
    id: "engineering",
    name: "Kỹ thuật / Sản xuất",
    slug: "ky-thuat",
    icon: "Settings",
    count: 1678,
    color: "#475467" // slate
  },
  {
    id: "service",
    name: "Nhà hàng / Dịch vụ",
    slug: "nha-hang",
    icon: "UtensilsCrossed",
    count: 2089,
    color: "#F5A524" // amber
  },
  {
    id: "legal",
    name: "Pháp lý / Tư vấn",
    slug: "phap-ly",
    icon: "Scale",
    count: 456,
    color: "#3E68D8" // darker blue
  },
];

/* -------------------------------------------------------------------------- */
/*                                   JOBS                                     */
/* -------------------------------------------------------------------------- */

const companyLogos = [
  "https://logo.clearbit.com/fpt.com",
  "https://logo.clearbit.com/vng.com",
  "https://logo.clearbit.com/tiki.vn",
  "https://logo.clearbit.com/shopee.com",
  "https://logo.clearbit.com/lazada.com",
  "https://logo.clearbit.com/viettel.com.vn",
  "https://logo.clearbit.com/momo.vn",
  "https://logo.clearbit.com/zalopay.vn",
  "https://logo.clearbit.com/vietcombank.com.vn",
  "https://logo.clearbit.com/techcombank.com.vn",
];

export const jobs: JobItem[] = [
  {
    id: 1,
    title: "Senior Frontend Developer (React/Next.js)",
    company: "FPT Software",
    companyLogo: companyLogos[0],
    location: "Hà Nội",
    salary: "30 - 50 triệu",
    salaryRange: [30, 50],
    tags: ["React", "Next.js", "TypeScript", "Remote"],
    postedAt: "2 giờ trước",
    isHot: true,
    isNew: true,
    isRemote: true,
    category: "it",
    experience: "3-5 năm",
    deadline: "Còn 12 ngày",
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "VNG Corporation",
    companyLogo: companyLogos[1],
    location: "TP. Hồ Chí Minh",
    salary: "25 - 40 triệu",
    salaryRange: [25, 40],
    tags: ["SEO", "Performance", "Team Lead"],
    postedAt: "5 giờ trước",
    isHot: true,
    category: "marketing",
    experience: "3-5 năm",
    deadline: "Còn 8 ngày",
  },
  {
    id: 3,
    title: "Product Designer (UI/UX)",
    company: "Tiki",
    companyLogo: companyLogos[2],
    location: "Hà Nội",
    salary: "20 - 35 triệu",
    salaryRange: [20, 35],
    tags: ["Figma", "Design System", "Mobile"],
    postedAt: "1 ngày trước",
    isHot: true,
    category: "design",
    experience: "2-4 năm",
    deadline: "Còn 15 ngày",
  },
  {
    id: 4,
    title: "Senior Backend Engineer (Java/Spring)",
    company: "Shopee",
    companyLogo: companyLogos[3],
    location: "TP. Hồ Chí Minh",
    salary: "35 - 60 triệu",
    salaryRange: [35, 60],
    tags: ["Java", "Spring Boot", "Microservices", "AWS"],
    postedAt: "3 giờ trước",
    isHot: true,
    isNew: true,
    category: "it",
    experience: "4-6 năm",
    deadline: "Còn 10 ngày",
  },
  {
    id: 5,
    title: "Sales Manager - B2B Enterprise",
    company: "Lazada",
    companyLogo: companyLogos[4],
    location: "TP. Hồ Chí Minh",
    salary: "40 - 70 triệu",
    salaryRange: [40, 70],
    tags: ["B2B", "Enterprise", "KPI"],
    postedAt: "6 giờ trước",
    isHot: true,
    category: "sales",
    experience: "5+ năm",
    deadline: "Còn 20 ngày",
  },
  {
    id: 6,
    title: "Data Scientist (Python/ML)",
    company: "Viettel",
    companyLogo: companyLogos[5],
    location: "Hà Nội",
    salary: "28 - 45 triệu",
    salaryRange: [28, 45],
    tags: ["Python", "TensorFlow", "NLP"],
    postedAt: "8 giờ trước",
    isNew: true,
    category: "it",
    experience: "3-5 năm",
    deadline: "Còn 14 ngày",
  },
  {
    id: 7,
    title: "Mobile Developer (iOS/Swift)",
    company: "MoMo",
    companyLogo: companyLogos[6],
    location: "TP. Hồ Chí Minh",
    salary: "25 - 42 triệu",
    salaryRange: [25, 42],
    tags: ["Swift", "iOS", "Fintech"],
    postedAt: "10 giờ trước",
    category: "it",
    experience: "3-5 năm",
    deadline: "Còn 9 ngày",
  },
  {
    id: 8,
    title: "Senior Accountant - Tax Specialist",
    company: "ZaloPay",
    companyLogo: companyLogos[7],
    location: "Hà Nội",
    salary: "18 - 28 triệu",
    salaryRange: [18, 28],
    tags: ["Tax", "IFRS", "Audit"],
    postedAt: "12 giờ trước",
    category: "finance",
    experience: "4-6 năm",
    deadline: "Còn 18 ngày",
  },
  {
    id: 9,
    title: "HR Business Partner",
    company: "Vietcombank",
    companyLogo: companyLogos[8],
    location: "Hà Nội",
    salary: "20 - 32 triệu",
    salaryRange: [20, 32],
    tags: ["Talent Acquisition", "BP", "Banking"],
    postedAt: "1 ngày trước",
    category: "hr",
    experience: "4-6 năm",
    deadline: "Còn 11 ngày",
  },
  {
    id: 10,
    title: "DevOps Engineer (Kubernetes/AWS)",
    company: "Techcombank",
    companyLogo: companyLogos[9],
    location: "Hà Nội",
    salary: "32 - 55 triệu",
    salaryRange: [32, 55],
    tags: ["K8s", "AWS", "CI/CD", "Terraform"],
    postedAt: "2 ngày trước",
    isNew: true,
    category: "it",
    experience: "3-5 năm",
    deadline: "Còn 13 ngày",
  },
];

/* -------------------------------------------------------------------------- */
/*                                COMPANIES                                   */
/* -------------------------------------------------------------------------- */

export const companies: Company[] = [
  {
    id: 1,
    name: "FPT Software",
    logo: "https://logo.clearbit.com/fpt.com",
    cover:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    industry: "IT - Phần mềm",
    location: "Hà Nội",
    jobCount: 156,
    followerCount: "48K",
    rating: 4.6,
    size: "10,000+",
  },
  {
    id: 2,
    name: "VNG Corporation",
    logo: "https://logo.clearbit.com/vng.com",
    cover:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
    industry: "IT - Game",
    location: "TP. Hồ Chí Minh",
    jobCount: 89,
    followerCount: "32K",
    rating: 4.5,
    size: "5,000+",
  },
  {
    id: 3,
    name: "Shopee Vietnam",
    logo: "https://logo.clearbit.com/shopee.com",
    cover:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    industry: "E-commerce",
    location: "TP. Hồ Chí Minh",
    jobCount: 234,
    followerCount: "65K",
    rating: 4.3,
    size: "10,000+",
  },
  {
    id: 4,
    name: "Tiki Corporation",
    logo: "https://logo.clearbit.com/tiki.vn",
    cover:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    industry: "E-commerce",
    location: "Hà Nội",
    jobCount: 78,
    followerCount: "28K",
    rating: 4.2,
    size: "5,000+",
  },
  {
    id: 5,
    name: "MoMo (M_Service)",
    logo: "https://logo.clearbit.com/momo.vn",
    cover:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    industry: "Fintech",
    location: "TP. Hồ Chí Minh",
    jobCount: 92,
    followerCount: "41K",
    rating: 4.7,
    size: "1,000+",
  },
  {
    id: 6,
    name: "Viettel Group",
    logo: "https://logo.clearbit.com/viettel.com.vn",
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    industry: "Telecom",
    location: "Hà Nội",
    jobCount: 187,
    followerCount: "78K",
    rating: 4.4,
    size: "10,000+",
  },
];

/* -------------------------------------------------------------------------- */
/*                                NAVIGATION                                  */
/* -------------------------------------------------------------------------- */

export const mainNav: NavItem[] = [
  { label: "Việc làm", href: "/viec-lam", badge: "Hot" },
  { label: "Công ty", href: "#companies" },
  { label: "Danh mục ngành", href: "#categories" },
  { label: "Tạo CV", href: "#cv-builder" },
];

export const popularKeywords: string[] = [
  "Frontend",
  "Backend",
  "Marketing",
  "Kế toán",
  "Sales",
  "HR",
  "Designer",
  "DevOps",
];

export const popularLocations: string[] = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Bình Dương",
  "Đồng Nai",
  "Cần Thơ",
  "Remote",
];

/* -------------------------------------------------------------------------- */
/*                            HERO BANNER SLIDER                              */
/* -------------------------------------------------------------------------- */

export type HeroBanner = {
  id: number;
  /** Local image path (full-bleed banner) */
  image: string;
  /** Alt text for accessibility */
  alt: string;
  /** Link target when user clicks the slide */
  href: string;
  /** Natural image width (px) - used to compute aspect-ratio to prevent CLS & cropping */
  width: number;
  /** Natural image height (px) */
  height: number;
};

export const heroBanners: HeroBanner[] = [
  {
    id: 1,
    image: "/banners/banner-1.jpg",
    alt: "Banner tuyển dụng TopCV - việc làm hấp dẫn cập nhật mỗi ngày",
    href: "#jobs",
    width: 800,
    height: 288,
  },
  {
    id: 2,
    image: "/banners/banner-2.png",
    alt: "Banner dịch vụ và lợi ích thành viên TopCV",
    href: "#cv-builder",
    width: 1592,
    height: 576,
  },
  {
    id: 3,
    image: "/banners/banner-3.jpg",
    alt: "Banner tuyển dụng việc làm TopCV - cơ hội sự nghiệp mới",
    href: "#companies",
    width: 800,
    height: 288,
  },
];

/* -------------------------------------------------------------------------- */
/*                          ADVANCED SEARCH OPTIONS                           */
/* -------------------------------------------------------------------------- */

export const salaryRanges: { label: string; min: number; max: number }[] = [
  { label: "Mọi mức lương", min: 0, max: 0 },
  { label: "Dưới 10 triệu", min: 0, max: 10 },
  { label: "10 - 20 triệu", min: 10, max: 20 },
  { label: "20 - 30 triệu", min: 20, max: 30 },
  { label: "30 - 50 triệu", min: 30, max: 50 },
  { label: "50 - 70 triệu", min: 50, max: 70 },
  { label: "70 - 100 triệu", min: 70, max: 100 },
  { label: "Trên 100 triệu", min: 100, max: 999 },
];

export const experienceLevels: string[] = [
  "Mọi kinh nghiệm",
  "Chưa có kinh nghiệm",
  "Dưới 1 năm",
  "1 - 2 năm",
  "2 - 4 năm",
  "3 - 5 năm",
  "4 - 6 năm",
  "5+ năm",
  "7+ năm",
];

export const jobTypes: string[] = [
  "Toàn thời gian",
  "Bán thời gian",
  "Thực tập",
  "Bán thời gian (Part-time)",
  "Hợp đồng",
  "Freelancer",
];

export const workModes: string[] = [
  "Tại văn phòng",
  "Làm việc từ xa (Remote)",
  "Lai hybrid (Hybrid)",
  "Làm việc tại nhà",
];

export const postedWithin: { label: string; value: string }[] = [
  { label: "Mọi thời gian", value: "all" },
  { label: "24 giờ qua", value: "1d" },
  { label: "3 ngày qua", value: "3d" },
  { label: "7 ngày qua", value: "7d" },
  { label: "14 ngày qua", value: "14d" },
  { label: "30 ngày qua", value: "30d" },
];

export const sortOptions: { label: string; value: string }[] = [
  { label: "Mặc định", value: "default" },
  { label: "Mới nhất", value: "newest" },
  { label: "Lương cao nhất", value: "salary_desc" },
  { label: "Phù hợp nhất", value: "match" },
];

/* -------------------------------------------------------------------------- */
/*                              COMPANY LOGOS                                 */
/* -------------------------------------------------------------------------- */

export const trustedByLogos: string[] = [
  "https://logo.clearbit.com/fpt.com",
  "https://logo.clearbit.com/vng.com",
  "https://logo.clearbit.com/tiki.vn",
  "https://logo.clearbit.com/shopee.com",
  "https://logo.clearbit.com/lazada.com",
  "https://logo.clearbit.com/viettel.com.vn",
  "https://logo.clearbit.com/momo.vn",
  "https://logo.clearbit.com/zalopay.vn",
  "https://logo.clearbit.com/vietcombank.com.vn",
  "https://logo.clearbit.com/techcombank.com.vn",
  "https://logo.clearbit.com/grab.com",
  "https://logo.clearbit.com/vietnamairlines.com",
];

/* -------------------------------------------------------------------------- */
/*                              JOB FILTERS                                   */
/* -------------------------------------------------------------------------- */

export const jobTabs = [
  { id: "hot", label: "Việc làm HOT", icon: "Flame" },
  { id: "new", label: "Mới nhất", icon: "Sparkles" },
  { id: "high-salary", label: "Lương cao", icon: "TrendingUp" },
];

export const features = [
  {
    icon: "Sparkles",
    title: "AI Matching thông minh",
    description:
      "Thuật toán AI phân tích CV và yêu cầu công việc để gợi ý việc làm phù hợp nhất với tỷ lệ chính xác 95%.",
    color: "#155EEF", // blue
  },
  {
    icon: "FileText",
    title: "Tạo CV chuyên nghiệp",
    description:
      "Hơn 50 mẫu CV đẹp mắt được thiết kế bởi chuyên gia. Tạo và tải CV miễn phí chỉ trong 5 phút.",
    color: "#F79009", // warning
  },
  {
    icon: "Bell",
    title: "Thông báo việc làm tức thì",
    description:
      "Nhận thông báo qua email và app ngay khi có việc làm mới phù hợp. Không bỏ lỡ bất kỳ cơ hội nào.",
    color: "#7A5AF8", // violet
  },
  {
    icon: "ShieldCheck",
    title: "Xác thực nhà tuyển dụng",
    description:
      "Tất cả nhà tuyển dụng đều được xác thực KYC. An tâm tuyệt đối khi ứng tuyển và làm việc.",
    color: "#12B76A", // success
  },
  {
    icon: "Users",
    title: "Mạng lưới ứng viên",
    description:
      "Kết nối với 2.5 triệu ứng viên chuyên nghiệp. Mở rộng network và tìm cơ hội việc làm mới.",
    color: "#F04438", // danger
  },
  {
    icon: "MessageSquare",
    title: "Tư vấn nghề nghiệp 1-1",
    description:
      "Đội ngũ chuyên gia sẵn sàng tư vấn lộ trình sự nghiệp miễn phí. Đặt lịch hẹn dễ dàng trong vài phút.",
    color: "#9B8AFB", // light violet
  },
];

export const footerLinks = [
  {
    title: "Dành cho ứng viên",
    links: [
      { label: "Tìm việc làm", href: "/viec-lam" },
      { label: "Việc làm theo quốc gia", href: "/viec-lam" },
      { label: "Việc làm theo ngành", href: "/viec-lam" },
      { label: "Tạo hồ sơ CV", href: "#" },
    ],
  },
  {
    title: "Dành cho nhà tuyển dụng",
    links: [
      { label: "Đăng tin tuyển dụng", href: "#" },
      { label: "Tìm ứng viên", href: "#" },
      { label: "Bảng giá dịch vụ", href: "#" },
      { label: "Quản lý ứng viên", href: "#" },
      { label: "Hỗ trợ doanh nghiệp", href: "#" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { label: "Về chúng tôi", href: "#" },
      { label: "Liên hệ", href: "#" },
      { label: "Tuyển dụng nội bộ", href: "#" },
      { label: "Báo chí & truyền thông", href: "#" },
      { label: "Điều khoản & chính sách", href: "#" },
    ],
  },
];
