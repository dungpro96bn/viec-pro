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

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  company: string;
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
/*                                ARTICLES                                    */
/* -------------------------------------------------------------------------- */

export const articles: Article[] = [
  {
    id: 1,
    title: "10 Xu hướng tuyển dụng IT năm 2026 bạn cần biết",
    excerpt:
      "AI, Cloud Computing và Cybersecurity tiếp tục dẫn đầu. Tìm hiểu những kỹ năng nóng nhất và cách chuẩn bị CV ghi điểm với nhà tuyển dụng.",
    category: "Trends",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    author: "Nguyễn Minh Anh",
    publishedAt: "12/09/2026",
    readTime: "5 phút",
  },
  {
    id: 2,
    title: "Cách viết CV xin việc ấn tượng - Hướng dẫn chi tiết 2026",
    excerpt:
      "Mẫu CV chuyên nghiệp được thiết kế bởi chuyên gia HR. Tăng 80% tỷ lệ được mời phỏng vấn với những tips viết CV thực chiến.",
    category: "CV Guide",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    author: "Trần Quốc Bảo",
    publishedAt: "10/09/2026",
    readTime: "8 phút",
  },
  {
    id: 3,
    title: "Phỏng vấn kỹ thuật: 30 câu hỏi thường gặp cho Developer",
    excerpt:
      "Tổng hợp các câu hỏi phỏng vấn Frontend, Backend, DevOps từ các công ty IT hàng đầu. Kèm câu trả lời mẫu và chiến thuật trả lời.",
    category: "Interview",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    author: "Lê Thị Hồng",
    publishedAt: "08/09/2026",
    readTime: "12 phút",
  },
  {
    id: 4,
    title: "Mức lương ngành Marketing 2026 - Báo cáo chi tiết",
    excerpt:
      "Khảo sát 500+ ứng viên và 200+ doanh nghiệp. Cập nhật mức lương theo cấp bậc, khu vực và lĩnh vực trong ngành Marketing.",
    category: "Salary",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    author: "Phạm Đức Trung",
    publishedAt: "05/09/2026",
    readTime: "6 phút",
  },
];

/* -------------------------------------------------------------------------- */
/*                              TESTIMONIALS                                  */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nguyễn Hoàng Nam",
    role: "Senior Software Engineer",
    avatar: "https://images.pravatar.cc/150?img=12",
    content:
      "ViecPro giúp tôi tìm được công việc mơ ước chỉ trong 2 tuần. AI gợi ý việc làm rất thông minh, phù hợp với kỹ năng và mong muốn của mình. Đặc biệt tính năng tạo CV miễn phí rất chuyên nghiệp.",
    rating: 5,
    company: "FPT Software",
  },
  {
    id: 2,
    name: "Trần Thị Mai Phương",
    role: "Marketing Manager",
    avatar: "https://images.pravatar.cc/150?img=47",
    content:
      "Sau nhiều tháng tìm việc không thành công, tôi đã nhận được 5 lời mời phỏng vấn chỉ sau 1 tuần đăng CV lên ViecPro. Nền tảng thực sự hiệu quả cho người tìm việc chuyên nghiệp.",
    rating: 5,
    company: "Shopee",
  },
  {
    id: 3,
    name: "Lê Văn Hùng",
    role: "Product Designer",
    avatar: "https://images.pravatar.cc/150?img=33",
    content:
      "Giao diện đẹp, dễ sử dụng, việc làm chất lượng cao. Tôi đã giới thiệu ViecPro cho rất nhiều bạn bè. Đây thực sự là sàn tuyển dụng tốt nhất Việt Nam hiện nay.",
    rating: 5,
    company: "MoMo",
  },
  {
    id: 4,
    name: "Phạm Thu Hà",
    role: "HR Director",
    avatar: "https://images.pravatar.cc/150?img=23",
    content:
      "Đội ngũ tuyển dụng của chúng tôi tiết kiệm được 60% thời gian sourcing nhờ ViecPro. Hồ sơ ứng viên chất lượng, bộ lọc thông minh giúp tìm đúng người trong thời gian ngắn.",
    rating: 5,
    company: "Vietcombank",
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
/*                                  STATS                                     */
/* -------------------------------------------------------------------------- */

export const stats = [
  {
    label: "Việc làm mới mỗi ngày",
    value: 1200,
    suffix: "+",
    icon: "Briefcase",
  },
  {
    label: "Nhà tuyển dụng uy tín",
    value: 10000,
    suffix: "+",
    icon: "Building2",
  },
  {
    label: "Ứng viên đăng ký",
    value: 2500000,
    suffix: "+",
    icon: "Users",
  },
  {
    label: "Tỷ lệ đặt việc thành công",
    value: 92,
    suffix: "%",
    icon: "TrendingUp",
  },
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

export const footerLinks = {
  column1: {
    title: "Về ViecPro",
    links: [
      { label: "Giới thiệu", href: "#" },
      { label: "Liên hệ", href: "#" },
      { label: "Tuyển dụng ViecPro", href: "#" },
      { label: "Báo chí", href: "#" },
      { label: "Điều khoản sử dụng", href: "#" },
      { label: "Chính sách bảo mật", href: "#" },
    ],
  },
  column2: {
    title: "Dành cho ứng viên",
    links: [
      { label: "Tìm việc làm", href: "#" },
      { label: "Tạo CV online", href: "#" },
      { label: "Cẩm nang nghề nghiệp", href: "#" },
      { label: "Công cụ tính lương", href: "#" },
      { label: "Top công ty", href: "#" },
      { label: "Việc làm theo ngành", href: "#" },
    ],
  },
  column3: {
    title: "Dành cho nhà tuyển dụng",
    links: [
      { label: "Đăng tin tuyển dụng", href: "#" },
      { label: "Tìm ứng viên", href: "#" },
      { label: "Bảng giá dịch vụ", href: "#" },
      { label: "Quản lý hồ sơ", href: "#" },
      { label: "Hỗ trợ doanh nghiệp", href: "#" },
      { label: "Liên hệ kinh doanh", href: "#" },
    ],
  },
  column4: {
    title: "Hỗ trợ",
    links: [
      { label: "Trung tâm trợ giúp", href: "#" },
      { label: "Câu hỏi thường gặp", href: "#" },
      { label: "Hướng dẫn sử dụng", href: "#" },
      { label: "Báo cáo lỗi", href: "#" },
      { label: "Góp ý cải tiến", href: "#" },
      { label: "Hotline: 1900 1234", href: "#" },
    ],
  },
};
