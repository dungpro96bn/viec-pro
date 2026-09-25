/**
 * Mock data cho ViecPro - phiên bản Sàn XKLD (Xuất khẩu lao động)
 * Dựa trên cấu trúc dữ liệu của sanxuatkhaulaodong.com
 *
 * Domain: Việc làm xuất khẩu lao động (Japan, Taiwan, Korea, Europe, Middle East...)
 */

/* -------------------------------------------------------------------------- */
/*                            QUỐC GIA / CHƯƠNG TRÌNH                          */
/* -------------------------------------------------------------------------- */

export type Country = {
  id: string;
  name: string;
  /** Số đơn hàng đang tuyển */
  count: number;
  /** ISO 3166-1 alpha-2 code (lowercase) - dùng để load /flags/{code}.svg */
  flagCode: string;
  /** Khu vực địa lý */
  region: "asia" | "europe" | "middle-east" | "other";
};

export const countries: Country[] = [
  // Châu Á
  { id: "tts-nhat", name: "TTS Nhật Bản", count: 1203, flagCode: "jp", region: "asia" },
  { id: "ks-nhat", name: "Kỹ sư Nhật Bản", count: 850, flagCode: "jp", region: "asia" },
  { id: "tokutei-nhat", name: "Tokutei Nhật", count: 70, flagCode: "jp", region: "asia" },
  { id: "dai-loan", name: "Đài Loan", count: 876, flagCode: "tw", region: "asia" },
  { id: "ks-dai-loan", name: "Kỹ sư Đài Loan", count: 106, flagCode: "tw", region: "asia" },
  { id: "han-quoc", name: "Kỹ sư Hàn Quốc", count: 64, flagCode: "kr", region: "asia" },
  { id: "trung-quoc", name: "Trung Quốc", count: 10, flagCode: "cn", region: "asia" },
  { id: "malaysia", name: "Malaysia", count: 1, flagCode: "my", region: "asia" },

  // Châu Âu
  { id: "hy-lap", name: "Hy Lạp", count: 145, flagCode: "gr", region: "europe" },
  { id: "bulgaria", name: "Bulgaria", count: 127, flagCode: "bg", region: "europe" },
  { id: "litva", name: "Litva", count: 73, flagCode: "lt", region: "europe" },
  { id: "rumani", name: "Rumani", count: 59, flagCode: "ro", region: "europe" },
  { id: "duc", name: "Đức", count: 38, flagCode: "de", region: "europe" },
  { id: "ba-lan", name: "Ba Lan", count: 28, flagCode: "pl", region: "europe" },
  { id: "hungary", name: "Hungary", count: 25, flagCode: "hu", region: "europe" },
  { id: "slovakia", name: "Slovakia", count: 25, flagCode: "sk", region: "europe" },
  { id: "croatia", name: "Croatia", count: 13, flagCode: "hr", region: "europe" },
  { id: "dan-mach", name: "Đan Mạch", count: 8, flagCode: "dk", region: "europe" },
  { id: "latvia", name: "Latvia", count: 7, flagCode: "lv", region: "europe" },
  { id: "serbia", name: "Serbia", count: 4, flagCode: "rs", region: "europe" },
  { id: "tay-ban-nha", name: "Tây Ban Nha", count: 3, flagCode: "es", region: "europe" },
  { id: "ao", name: "Áo", count: 3, flagCode: "at", region: "europe" },
  { id: "sec", name: "Séc", count: 2, flagCode: "cz", region: "europe" },
  { id: "na-uy", name: "Na Uy", count: 2, flagCode: "no", region: "europe" },
  { id: "ireland", name: "Ireland", count: 2, flagCode: "ie", region: "europe" },
  { id: "albania", name: "Albania", count: 2, flagCode: "al", region: "europe" },

  // Trung Đông & Bắc Phi
  { id: "algeria", name: "Algeria", count: 41, flagCode: "dz", region: "middle-east" },
  { id: "a-rap", name: "Ả Rập Xê Út", count: 5, flagCode: "sa", region: "middle-east" },
  { id: "dubai", name: "Dubai", count: 10, flagCode: "ae", region: "middle-east" },

  // Khác
  { id: "nga", name: "Nga", count: 87, flagCode: "ru", region: "other" },
  { id: "nuoc-khac", name: "Nước khác", count: 11, flagCode: "", region: "other" },
];

/* -------------------------------------------------------------------------- */
/*                          ADVANCED SEARCH OPTIONS                           */
/* -------------------------------------------------------------------------- */

/** Loại đơn hàng (phí tham gia) */
export const orderFeeTypes: { label: string; value: string }[] = [
  { label: "Tất cả loại đơn", value: "all" },
  { label: "Đơn miễn phí", value: "free" },
  { label: "Phí thấp", value: "low-fee" },
  { label: "Phí vừa", value: "medium-fee" },
];

/** Giới tính yêu cầu */
export const genderOptions: { label: string; value: string }[] = [
  { label: "Tất cả giới tính", value: "all" },
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Nam & Nữ", value: "both" },
];

/** Năm sinh (ứng viên) */
export const birthYearRanges: { label: string; value: string }[] = [
  { label: "Mọi năm sinh", value: "all" },
  { label: "2005 - 2010", value: "2005-2010" },
  { label: "2000 - 2005", value: "2000-2005" },
  { label: "1995 - 2000", value: "1995-2000" },
  { label: "1990 - 1995", value: "1990-1995" },
  { label: "Trước 1990", value: "before-1990" },
];

/** Loại tiền tệ lương */
export const currencyOptions: { label: string; value: string }[] = [
  { label: "Mọi loại tiền tệ", value: "all" },
  { label: "USD ($)", value: "usd" },
  { label: "Euro (€)", value: "eur" },
  { label: "Yen Nhật (¥)", value: "jpy" },
  { label: "Đài tệ (NT$)", value: "twd" },
  { label: "Won Hàn (₩)", value: "krw" },
];

/** Mức lương tối thiểu (quy đổi USD/tháng) */
export const salaryRanges: { label: string; value: string }[] = [
  { label: "Mọi mức lương", value: "all" },
  { label: "Dưới 500 USD/tháng", value: "0-500" },
  { label: "500 - 1.000 USD/tháng", value: "500-1000" },
  { label: "1.000 - 2.000 USD/tháng", value: "1000-2000" },
  { label: "2.000 - 3.000 USD/tháng", value: "2000-3000" },
  { label: "Trên 3.000 USD/tháng", value: "3000+" },
];

/** Ngành nghề (lĩnh vực công việc) */
export const industries: { label: string; value: string }[] = [
  { label: "Mọi ngành nghề", value: "all" },
  { label: "Sản xuất / Lắp ráp điện tử", value: "electronics" },
  { label: "Cơ khí / Gia công kim loại", value: "mechanical" },
  { label: "Nông nghiệp / Trồng trọt", value: "agriculture" },
  { label: "Thực phẩm / Đầu bếp", value: "food" },
  { label: "Xây dựng / Vận hành máy", value: "construction" },
  { label: "May mặc / Dệt may", value: "garment" },
  { label: "Chăm sóc / Y tế", value: "care" },
  { label: "Dịch vụ / Nhà hàng", value: "service" },
  { label: "Vận tải / Lái xe", value: "transport" },
  { label: "IT / Kỹ sư phần mềm", value: "it" },
  { label: "Ngành khác", value: "other" },
];

/** Hình thức tuyển */
export const recruitmentTypes: { label: string; value: string }[] = [
  { label: "Mọi hình thức", value: "all" },
  { label: "Tuyển liên tục", value: "continuous" },
  { label: "Tuyển cố định (có hạn)", value: "fixed" },
  { label: "Tuyển gấp", value: "urgent" },
];

/** Khu vực đăng ký / tiếp nhận hồ sơ */
export const registrationLocations: { label: string; value: string }[] = [
  { label: "Mọi khu vực", value: "all" },
  { label: "TP. Hồ Chí Minh", value: "hcm" },
  { label: "Hà Nội", value: "hanoi" },
  { label: "Đà Nẵng", value: "danang" },
  { label: "Hải Phòng", value: "haiphong" },
  { label: "Cần Thơ", value: "cantho" },
  { label: "Tỉnh khác", value: "other" },
];

/** Đăng trong bao lâu */
export const postedWithin: { label: string; value: string }[] = [
  { label: "Mọi thời gian", value: "all" },
  { label: "7 ngày qua", value: "7d" },
  { label: "14 ngày qua", value: "14d" },
  { label: "30 ngày qua", value: "30d" },
  { label: "60 ngày qua", value: "60d" },
];

/** Sắp xếp theo */
export const sortOptions: { label: string; value: string }[] = [
  { label: "Mới nhất", value: "newest" },
  { label: "Lương cao nhất", value: "salary_desc" },
  { label: "Phí thấp nhất", value: "fee_asc" },
  { label: "Phù hợp nhất", value: "match" },
];

/* -------------------------------------------------------------------------- */
/*                              SAMPLE JOB CARDS                              */
/* -------------------------------------------------------------------------- */

export type XkldJob = {
  id: number;
  title: string;
  country: string;
  /** ISO 3166-1 alpha-2 code (lowercase) - dùng để load /flags/{code}.svg */
  flagCode: string;
  /** Emoji cờ (hiển thị trên card) */
  countryFlag: string;
  /** Thumbnail image path */
  image: string;
  salary: string;
  currency: string;
  salaryUsd: number;
  gender: "Nam" | "Nữ" | "Nam & Nữ";
  birthRange: string;
  /** Hình thức tuyển: "Liên tục" hoặc ngày cụ thể "28/09/2026" */
  recruitmentType: string;
  fee: "Miễn phí" | "Phí thấp" | "Phí vừa";
  industry: string;
  location: string;
  employer: string;
  /** Avatar nhà tuyển dụng */
  employerAvatar: string;
  /** Rating sao của nhà tuyển dụng (1-5) */
  employerRating: number;
  /** Số lượt xem */
  views: number;
  /** Số điện thoại liên hệ */
  phone: string;
  postedAt: string;
  isHot?: boolean;
  isNew?: boolean;
  isFree?: boolean;
};

export const sampleJobs: XkldJob[] = [
  {
    id: 1,
    title: "[Đơn miễn phí] Tuyển 25 nữ sản xuất các sản phẩm điện tử tại Tân Bắc, Đài Loan",
    country: "Đài Loan",
    flagCode: "tw",
    countryFlag: "🇹🇼",
    image: "/jobs/job-1.jpg",
    salary: "29.500 Đài tệ/tháng",
    currency: "TWD",
    salaryUsd: 920,
    gender: "Nữ",
    birthRange: "1999 - 2006",
    recruitmentType: "Liên tục",
    fee: "Miễn phí",
    industry: "Sản xuất / Lắp ráp điện tử",
    location: "TP. Hồ Chí Minh",
    employer: "Phạm Xuân Trường",
    employerAvatar: "/avatars/default-male.svg",
    employerRating: 4,
    views: 162,
    phone: "0968803554",
    postedAt: "2 giờ trước",
    isHot: true,
    isNew: true,
    isFree: true,
  },
  {
    id: 2,
    title: "Phí thấp - Liên Bang Nga tuyển 10 nam thợ mộc nội thất",
    country: "Nga",
    flagCode: "ru",
    countryFlag: "🇷🇺",
    image: "/jobs/job-2.jpg",
    salary: "950 USD/tháng",
    currency: "USD",
    salaryUsd: 950,
    gender: "Nam",
    birthRange: "1976 - 2007",
    recruitmentType: "Liên tục",
    fee: "Phí thấp",
    industry: "Xây dựng / Vận hành máy",
    location: "Hà Nội",
    employer: "Phạm Xuân Trường",
    employerAvatar: "/avatars/default-male.svg",
    employerRating: 4,
    views: 89,
    phone: "0968803554",
    postedAt: "5 giờ trước",
    isHot: true,
  },
  {
    id: 3,
    title: "[Lương cao] Tuyển 10 nam Sản xuất phụ tùng, linh kiện ô tô tại Tochigi, Nhật Bản",
    country: "TTS Nhật Bản",
    flagCode: "jp",
    countryFlag: "🇯🇵",
    image: "/jobs/job-3.jpg",
    salary: "186.000 Yên/tháng",
    currency: "JPY",
    salaryUsd: 1240,
    gender: "Nam",
    birthRange: "1996 - 2008",
    recruitmentType: "28/09/2026",
    fee: "Phí thấp",
    industry: "Sản xuất / Lắp ráp điện tử",
    location: "Hà Nội",
    employer: "Phạm Xuân Trường",
    employerAvatar: "/avatars/default-male.svg",
    employerRating: 4,
    views: 245,
    phone: "0968803554",
    postedAt: "1 ngày trước",
    isHot: true,
    isNew: true,
  },
  {
    id: 4,
    title: "[Hồ Chí Minh] ITW Việt Nam tuyển 20 Nam Nữ kỹ thuật viên chế biến thực phẩm tại CHLB Đức",
    country: "Đức",
    flagCode: "de",
    countryFlag: "🇩🇪",
    image: "/jobs/job-4.jpg",
    salary: "2.713 Euro/tháng",
    currency: "EUR",
    salaryUsd: 2950,
    gender: "Nam & Nữ",
    birthRange: "1986 - 2004",
    recruitmentType: "Liên tục",
    fee: "Phí vừa",
    industry: "Thực phẩm / Đầu bếp",
    location: "TP. Hồ Chí Minh",
    employer: "Mr. Cảnh - ITW Việt Nam",
    employerAvatar: "/avatars/default-male.svg",
    employerRating: 5,
    views: 318,
    phone: "0785171899",
    postedAt: "1 ngày trước",
    isNew: true,
  },
  {
    id: 5,
    title: "[Hồ Chí Minh] ITW Việt Nam tuyển 15 nam nữ đứng bếp, phụ bếp lương cao tại Bulgaria",
    country: "Bulgaria",
    flagCode: "bg",
    countryFlag: "🇧🇬",
    image: "/jobs/job-5.jpg",
    salary: "900 Euro/tháng",
    currency: "EUR",
    salaryUsd: 980,
    gender: "Nam & Nữ",
    birthRange: "1981 - 2006",
    recruitmentType: "Liên tục",
    fee: "Phí thấp",
    industry: "Thực phẩm / Đầu bếp",
    location: "TP. Hồ Chí Minh",
    employer: "Mr. Cảnh - ITW Việt Nam",
    employerAvatar: "/avatars/default-male.svg",
    employerRating: 5,
    views: 174,
    phone: "0785171899",
    postedAt: "2 ngày trước",
  },
  {
    id: 6,
    title: "[Phí thấp] Tuyển 16 nam thợ lái máy xây dựng tại Đài Loan",
    country: "Đài Loan",
    flagCode: "tw",
    countryFlag: "🇹🇼",
    image: "/jobs/job-6.jpg",
    salary: "29.500 Đài tệ/tháng",
    currency: "TWD",
    salaryUsd: 920,
    gender: "Nam",
    birthRange: "1981 - 2001",
    recruitmentType: "19/09/2026",
    fee: "Phí thấp",
    industry: "Xây dựng / Vận hành máy",
    location: "TP. Hồ Chí Minh",
    employer: "Nguyễn Quỳnh Nga",
    employerAvatar: "/avatars/default-female.svg",
    employerRating: 4,
    views: 132,
    phone: "0862040999",
    postedAt: "3 ngày trước",
    isHot: true,
  },
];

const postedTimeSamples = [
  "1 giờ trước",
  "3 giờ trước",
  "6 giờ trước",
  "hôm qua",
  "2 ngày trước",
  "3 ngày trước",
  "5 ngày trước",
  "1 tuần trước",
];

/** Expand the seed jobs into a deterministic list for paginated views. */
export function buildJobDataset(): XkldJob[] {
  const jobs: XkldJob[] = [];

  sampleJobs.forEach((job, jobIndex) => {
    for (let repeat = 0; repeat < 4; repeat++) {
      const index = jobIndex * 4 + repeat;
      jobs.push({
        ...job,
        id: job.id + repeat * 100,
        views: Math.max(12, job.views + repeat * 41 - jobIndex * 7),
        postedAt: postedTimeSamples[index % postedTimeSamples.length],
        isNew: repeat === 0 ? job.isNew : false,
        isHot: repeat % 2 === 0 ? job.isHot : false,
      });
    }
  });

  return jobs;
}
