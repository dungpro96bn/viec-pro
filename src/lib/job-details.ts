/**
 * Dữ liệu demo cho trang chi tiết đơn hàng (/viec-lam/[slug]).
 *
 * Mỗi đơn gốc trong `sampleJobs` (id 1-6) có một bản chi tiết ở đây.
 * `buildJobDataset()` nhân bản đơn gốc với id = gốc + 100 * n, nên
 * bản sao dùng chung chi tiết với đơn gốc (tra theo `id % 100`).
 *
 * Đơn #1 dựng theo tin thật: "Nhà máy Tường Mậu tuyển 25 nữ lắp ráp,
 * kiểm tra sản phẩm quang điện, điện tử tại Tân Bắc, Đài Loan" (mã 17517)
 * trên sanxuatkhaulaodong.com. Các đơn còn lại là dữ liệu minh hoạ.
 */

import { buildJobDataset, type XkldJob } from "@/lib/xkld-data";

export type InfoRow = { label: string; value: string };

export type ProcessStep = {
  title: string;
  desc: string;
  /** Thời gian dự kiến, VD "Tuần 1", "11/2026" */
  time?: string;
};

export type Consultant = {
  name: string;
  role: string;
  avatar: string;
  phone: string;
  office: string;
  /** Số năm kinh nghiệm tư vấn */
  experienceYears: number;
  /** Số lao động đã đưa đi */
  placed: number;
  rating: number;
};

export type JobDetail = {
  /** Mã đơn hàng hiển thị */
  code: string;
  /** Doanh nghiệp / nhà máy tiếp nhận */
  company: string;
  /** Nơi làm việc (thành phố, quốc gia) */
  workplace: string;
  /** Tổng số lượng tuyển */
  quantity: number;
  /** Mô tả ngắn số lượng, VD "25 nữ" */
  quantityNote: string;
  gallery: string[];
  /** Đoạn giới thiệu đầu trang */
  summary: string;
  highlights: string[];
  duties: string[];
  environment: string[];
  requirements: InfoRow[];
  salary: {
    basic: string;
    expected: string;
    overtime: string;
    /** Khoản trừ hàng tháng (ký túc xá, ăn uống...) */
    deduction: string;
    /** Quy đổi thu nhập dự kiến sang VNĐ */
    expectedVnd: string;
  };
  schedule: InfoRow[];
  benefits: string[];
  fee: {
    amount: string;
    includes: string[];
    note?: string;
  };
  contract: string;
  documents: string[];
  process: ProcessStep[];
  interview: string;
  departure: string;
  /** Hạn nhận hồ sơ; không có nghĩa là tuyển liên tục */
  deadline?: string;
  consultant: Consultant;
  tags: string[];
};

/* -------------------------------------------------------------------------- */
/*                                  CỐ VẤN                                    */
/* -------------------------------------------------------------------------- */

const consultants = {
  quyet: {
    name: "Lê Quyết",
    role: "Trưởng phòng tuyển dụng",
    avatar: "/avatars/default-male.svg",
    phone: "0968803554",
    office: "Hà Nội",
    experienceYears: 12,
    placed: 1850,
    rating: 5,
  },
  truong: {
    name: "Phạm Xuân Trường",
    role: "Chuyên viên tư vấn XKLĐ",
    avatar: "/avatars/default-male.svg",
    phone: "0968803554",
    office: "Hà Nội",
    experienceYears: 8,
    placed: 920,
    rating: 4,
  },
  canh: {
    name: "Mr. Cảnh - ITW Việt Nam",
    role: "Giám đốc tuyển dụng Châu Âu",
    avatar: "/avatars/default-male.svg",
    phone: "0785171899",
    office: "TP. Hồ Chí Minh",
    experienceYears: 10,
    placed: 1240,
    rating: 5,
  },
  nga: {
    name: "Nguyễn Quỳnh Nga",
    role: "Chuyên viên tư vấn Đài Loan",
    avatar: "/avatars/default-female.svg",
    phone: "0862040999",
    office: "TP. Hồ Chí Minh",
    experienceYears: 6,
    placed: 540,
    rating: 4,
  },
} satisfies Record<string, Consultant>;

/* -------------------------------------------------------------------------- */
/*                             QUY TRÌNH MẪU                                  */
/* -------------------------------------------------------------------------- */

const taiwanProcess = (departure: string): ProcessStep[] => [
  { title: "Đăng ký & tư vấn", desc: "Để lại thông tin, cán bộ gọi lại trong 30 phút để tư vấn chi tiết đơn hàng.", time: "Ngày 1" },
  { title: "Khám sức khỏe & sơ tuyển", desc: "Khám tại bệnh viện được chỉ định, kiểm tra thị lực, tay nghề cơ bản.", time: "Ngày 2 – 5" },
  { title: "Phỏng vấn với chủ sử dụng", desc: "Phỏng vấn online hoặc trực tiếp, kết quả trong 1 – 3 ngày.", time: "Tuần 1 – 2" },
  { title: "Hoàn thiện hồ sơ & visa", desc: "Làm hộ chiếu, lý lịch tư pháp, xin giấy phép lao động và visa.", time: "Tuần 3 – 8" },
  { title: "Đào tạo trước xuất cảnh", desc: "Học tiếng Trung giao tiếp, tác phong công nghiệp, luật lao động Đài Loan.", time: "Tuần 4 – 8" },
  { title: "Xuất cảnh", desc: "Bay sang Đài Loan, được đại diện công ty đón tại sân bay.", time: departure },
];

/* -------------------------------------------------------------------------- */
/*                               CHI TIẾT ĐƠN                                 */
/* -------------------------------------------------------------------------- */

export const jobDetails: Record<number, JobDetail> = {
  1: {
    code: "17517",
    company: "Nhà máy Tường Mậu",
    workplace: "Tân Bắc, Đài Loan",
    quantity: 25,
    quantityNote: "25 nữ",
    gallery: ["/jobs/job-1.jpg", "/jobs/job-3.jpg", "/jobs/job-6.jpg"],
    summary:
      "Nhà máy Tường Mậu tại Tân Bắc chuyên sản xuất linh kiện quang điện và điện tử, cần tuyển 25 lao động nữ lắp ráp, kiểm tra sản phẩm. Làm việc trong phòng sạch, ca đêm cố định, thu nhập ổn định và có tăng ca vào ngày nghỉ, ngày lễ.",
    highlights: [
      "Đơn miễn phí – đăng ký trực tiếp, không qua trung gian",
      "Làm trong phòng sạch, không nặng nhọc",
      "Thu nhập 35.000 – 50.000 Đài tệ/tháng",
      "Phỏng vấn liên tục, xuất cảnh nhanh",
    ],
    duties: [
      "Lắp ráp linh kiện sản phẩm quang điện, điện tử theo quy trình",
      "Kiểm tra sản phẩm bằng kính hiển vi, phát hiện và loại bỏ lỗi",
      "Cắm linh kiện lên bảng mạch",
      "Ghi chép số liệu kiểm tra, báo cáo tổ trưởng",
    ],
    environment: [
      "Làm việc trong công xưởng, phòng không bụi (phòng sạch)",
      "Mặc đồng phục chống bụi trong suốt ca làm",
      "Làm ca đêm cố định",
    ],
    requirements: [
      { label: "Giới tính", value: "Nữ" },
      { label: "Năm sinh", value: "1999 – 2006 (18 – 27 tuổi)" },
      { label: "Thị lực", value: "Tốt, không mù màu" },
      { label: "Sức khỏe", value: "Tốt, không có mồ hôi tay" },
      { label: "Học vấn", value: "Biết làm toán cơ bản" },
      { label: "Kinh nghiệm", value: "Không yêu cầu" },
      { label: "Khác", value: "Ngồi lâu được, mặc được đồ chống bụi, chấp nhận làm ca đêm" },
    ],
    salary: {
      basic: "29.500 Đài tệ/tháng",
      expected: "35.000 – 50.000 Đài tệ/tháng",
      overtime: "Tăng ca ngày nghỉ, ngày lễ theo luật Đài Loan",
      deduction: "3.500 Đài tệ/tháng (ký túc xá + 3 bữa ăn)",
      expectedVnd: "≈ 28 – 40 triệu VNĐ/tháng",
    },
    schedule: [
      { label: "Thời gian làm", value: "8 giờ/ngày, 5 ngày/tuần" },
      { label: "Ca làm", value: "Ca đêm cố định" },
      { label: "Tăng ca", value: "Phối hợp tăng ca vào ngày nghỉ và ngày lễ" },
      { label: "Hợp đồng", value: "3 năm, có thể gia hạn" },
    ],
    benefits: [
      "Ký túc xá và 3 bữa ăn/ngày (trừ 3.500 Đài tệ/tháng)",
      "Bảo hiểm lao động, bảo hiểm y tế theo luật Đài Loan",
      "Hỗ trợ chi phí đi lại",
      "Hỗ trợ chi phí khám sức khỏe",
      "Tặng vali khi xuất cảnh",
      "Đăng ký trực tiếp với cán bộ tuyển dụng",
    ],
    fee: {
      amount: "Miễn phí",
      includes: ["Phí dịch vụ tuyển dụng", "Phí đào tạo tiếng & định hướng", "Vé máy bay chiều đi"],
      note: "Lao động tự chi trả hộ chiếu, lý lịch tư pháp và khám sức khỏe ban đầu (được hỗ trợ một phần).",
    },
    contract: "3 năm, có thể gia hạn",
    documents: [
      "CCCD và sổ hộ khẩu / xác nhận cư trú (bản sao công chứng)",
      "Hộ chiếu (nếu đã có)",
      "4 ảnh 4x6 nền trắng",
      "Sơ yếu lý lịch có xác nhận của địa phương",
      "Bằng tốt nghiệp cao nhất (bản sao)",
    ],
    process: taiwanProcess("11/2026"),
    interview: "Đăng ký + phỏng vấn liên tục",
    departure: "11/2026",
    consultant: consultants.quyet,
    tags: ["Điện tử", "Phòng sạch", "Ca đêm", "Đơn miễn phí", "Tân Bắc"],
  },

  2: {
    code: "17482",
    company: "Công ty Nội thất Mebel Grad",
    workplace: "Kaluga, Liên Bang Nga",
    quantity: 10,
    quantityNote: "10 nam",
    gallery: ["/jobs/job-2.jpg", "/jobs/job-6.jpg", "/jobs/job-4.jpg"],
    summary:
      "Xưởng sản xuất đồ gỗ nội thất Mebel Grad tại Kaluga cần tuyển 10 nam thợ mộc có tay nghề. Công việc ổn định lâu dài, được bao chỗ ở, lương trả bằng USD.",
    highlights: [
      "Lương 950 USD/tháng, chưa tính tăng ca",
      "Bao chỗ ở, hỗ trợ tiền ăn",
      "Tuyển độ tuổi rộng: 1976 – 2007",
      "Phí thấp, hoàn tất hồ sơ trong 6 – 8 tuần",
    ],
    duties: [
      "Gia công, lắp ráp tủ, bàn ghế và đồ nội thất gỗ",
      "Vận hành máy cưa, máy bào, máy khoan cơ bản",
      "Sơn, đánh bóng và hoàn thiện bề mặt sản phẩm",
    ],
    environment: [
      "Xưởng sản xuất có hệ thống sưởi vào mùa đông",
      "Đồ bảo hộ được cấp đầy đủ",
    ],
    requirements: [
      { label: "Giới tính", value: "Nam" },
      { label: "Năm sinh", value: "1976 – 2007" },
      { label: "Kinh nghiệm", value: "Tối thiểu 1 năm làm mộc" },
      { label: "Sức khỏe", value: "Tốt, không mắc bệnh truyền nhiễm" },
      { label: "Tay nghề", value: "Thi tay nghề thực tế khi tuyển" },
    ],
    salary: {
      basic: "950 USD/tháng",
      expected: "1.100 – 1.300 USD/tháng",
      overtime: "Tăng ca tính 150% lương giờ",
      deduction: "Tự túc tiền ăn (≈ 100 USD/tháng)",
      expectedVnd: "≈ 28 – 33 triệu VNĐ/tháng",
    },
    schedule: [
      { label: "Thời gian làm", value: "8 giờ/ngày, 6 ngày/tuần" },
      { label: "Ca làm", value: "Ca ngày" },
      { label: "Tăng ca", value: "2 – 3 giờ/ngày khi có đơn gấp" },
      { label: "Hợp đồng", value: "2 năm, có thể gia hạn" },
    ],
    benefits: [
      "Miễn phí chỗ ở tại ký túc xá công ty",
      "Bảo hiểm y tế theo luật Nga",
      "Cấp đồ bảo hộ lao động",
      "Thưởng chuyên cần hàng tháng",
    ],
    fee: {
      amount: "2.500 USD",
      includes: ["Phí dịch vụ", "Visa lao động", "Vé máy bay chiều đi"],
    },
    contract: "2 năm, có thể gia hạn",
    documents: [
      "CCCD bản sao công chứng",
      "Hộ chiếu còn hạn tối thiểu 18 tháng",
      "6 ảnh 3,5x4,5 nền trắng",
      "Giấy khám sức khỏe",
    ],
    process: [
      { title: "Đăng ký & tư vấn", desc: "Cán bộ tư vấn điều kiện, chi phí, lịch thi tay nghề.", time: "Ngày 1" },
      { title: "Thi tay nghề", desc: "Thi thực hành làm mộc tại xưởng liên kết ở Hà Nội.", time: "Tuần 1" },
      { title: "Làm hồ sơ & visa", desc: "Xin giấy mời lao động và visa làm việc tại Nga.", time: "Tuần 2 – 7" },
      { title: "Xuất cảnh", desc: "Bay sang Moscow, di chuyển về Kaluga.", time: "Tuần 8" },
    ],
    interview: "Thi tay nghề liên tục",
    departure: "Sau 8 tuần trúng tuyển",
    consultant: consultants.truong,
    tags: ["Mộc", "Nội thất", "Lương USD", "Phí thấp"],
  },

  3: {
    code: "17455",
    company: "Tochigi Auto Parts Co., Ltd.",
    workplace: "Tochigi, Nhật Bản",
    quantity: 10,
    quantityNote: "10 nam",
    gallery: ["/jobs/job-3.jpg", "/jobs/job-6.jpg", "/jobs/job-2.jpg"],
    summary:
      "Xí nghiệp sản xuất phụ tùng ô tô tại Tochigi tuyển 10 thực tập sinh nam. Công việc sạch sẽ, dây chuyền hiện đại, tăng ca đều, phù hợp với lao động trẻ muốn tích luỹ tay nghề cơ khí.",
    highlights: [
      "Lương cơ bản 186.000 Yên/tháng",
      "Tăng ca đều 30 – 40 giờ/tháng",
      "Nhà xưởng hiện đại, sạch sẽ",
      "Thi tuyển ngày 28/09/2026",
    ],
    duties: [
      "Vận hành máy dập, máy ép phụ tùng ô tô",
      "Kiểm tra ngoại quan, kích thước sản phẩm",
      "Đóng gói, xếp hàng lên pallet",
    ],
    environment: ["Nhà xưởng có điều hoà", "Làm việc theo dây chuyền, có người Việt cùng làm"],
    requirements: [
      { label: "Giới tính", value: "Nam" },
      { label: "Năm sinh", value: "1996 – 2008" },
      { label: "Chiều cao / cân nặng", value: "Từ 1m60, từ 50kg" },
      { label: "Học vấn", value: "Tốt nghiệp THCS trở lên" },
      { label: "Thị lực", value: "Không mù màu, không cận quá 3 độ" },
      { label: "Khác", value: "Không hình xăm lộ ra ngoài" },
    ],
    salary: {
      basic: "186.000 Yên/tháng",
      expected: "220.000 – 250.000 Yên/tháng",
      overtime: "Tăng ca 125%, ngày nghỉ 135%",
      deduction: "≈ 35.000 Yên/tháng (nhà ở, điện nước, bảo hiểm)",
      expectedVnd: "≈ 37 – 42 triệu VNĐ/tháng",
    },
    schedule: [
      { label: "Thời gian làm", value: "8 giờ/ngày, 5 ngày/tuần" },
      { label: "Ca làm", value: "2 ca xoay vòng theo tuần" },
      { label: "Tăng ca", value: "30 – 40 giờ/tháng" },
      { label: "Hợp đồng", value: "3 năm (TTS kỹ năng)" },
    ],
    benefits: [
      "Hỗ trợ nhà ở gần công ty",
      "Bảo hiểm xã hội, y tế, hưu trí theo luật Nhật",
      "Trợ cấp tháng đầu 60.000 Yên",
      "Được về nước giữa kỳ",
    ],
    fee: {
      amount: "85.000.000 VNĐ",
      includes: ["Phí dịch vụ", "Đào tạo tiếng Nhật 4 – 6 tháng", "Ký túc xá khi học", "Vé máy bay"],
    },
    contract: "3 năm",
    documents: [
      "CCCD và giấy khai sinh (bản sao công chứng)",
      "Bằng tốt nghiệp cao nhất",
      "10 ảnh 3x4, 4x6 nền trắng",
      "Giấy khám sức khỏe",
    ],
    process: [
      { title: "Đăng ký & sơ tuyển", desc: "Kiểm tra thể lực, IQ, thị lực tại trung tâm.", time: "Trước 28/09/2026" },
      { title: "Thi tuyển với xí nghiệp", desc: "Phỏng vấn trực tiếp với đại diện xí nghiệp Nhật.", time: "28/09/2026" },
      { title: "Đào tạo tiếng Nhật", desc: "Học tiếng và văn hoá Nhật tại trung tâm.", time: "10/2026 – 03/2027" },
      { title: "Xuất cảnh", desc: "Bay sang Nhật, học 1 tháng tại nghiệp đoàn rồi vào xí nghiệp.", time: "04/2027" },
    ],
    interview: "Thi tuyển ngày 28/09/2026",
    departure: "04/2027",
    deadline: "28/09/2026",
    consultant: consultants.truong,
    tags: ["Cơ khí", "Ô tô", "TTS Nhật", "Lương cao"],
  },

  4: {
    code: "17430",
    company: "ITW Việt Nam – đối tác Fleischwerk Bayern GmbH",
    workplace: "Bayern, CHLB Đức",
    quantity: 20,
    quantityNote: "20 nam/nữ",
    gallery: ["/jobs/job-4.jpg", "/jobs/job-5.jpg", "/jobs/job-2.jpg"],
    summary:
      "Chương trình kỹ thuật viên chế biến thực phẩm tại Đức, làm việc tại nhà máy chế biến thịt quy mô lớn ở bang Bayern. Lương theo thang bảng lương Đức, có lộ trình định cư sau 5 năm.",
    highlights: [
      "Lương 2.713 Euro/tháng trước thuế",
      "Lộ trình thẻ xanh, bảo lãnh gia đình",
      "Được học tiếng Đức đến B1",
      "Nghỉ phép 25 ngày/năm",
    ],
    duties: [
      "Sơ chế, pha lọc và đóng gói sản phẩm thịt",
      "Vận hành máy chế biến theo tiêu chuẩn vệ sinh an toàn thực phẩm",
      "Kiểm tra chất lượng, dán nhãn sản phẩm",
    ],
    environment: ["Nhà máy nhiệt độ thấp (4 – 8°C), được cấp đồ giữ ấm", "Tiêu chuẩn vệ sinh IFS/BRC"],
    requirements: [
      { label: "Giới tính", value: "Nam và nữ" },
      { label: "Năm sinh", value: "1986 – 2004" },
      { label: "Tiếng Đức", value: "A2 khi phỏng vấn, B1 trước xuất cảnh" },
      { label: "Học vấn", value: "Tốt nghiệp THPT trở lên" },
      { label: "Sức khỏe", value: "Tốt, chịu được môi trường lạnh" },
    ],
    salary: {
      basic: "2.713 Euro/tháng",
      expected: "2.900 – 3.200 Euro/tháng (gồm phụ cấp)",
      overtime: "Phụ cấp ca đêm 25%, cuối tuần 50%",
      deduction: "Thuế & bảo hiểm ≈ 30%; nhà ở ≈ 350 Euro/tháng",
      expectedVnd: "≈ 52 – 58 triệu VNĐ/tháng sau thuế",
    },
    schedule: [
      { label: "Thời gian làm", value: "40 giờ/tuần" },
      { label: "Ca làm", value: "Ca sáng / ca chiều" },
      { label: "Nghỉ phép", value: "25 ngày/năm" },
      { label: "Hợp đồng", value: "Không thời hạn sau thử việc 6 tháng" },
    ],
    benefits: [
      "Bảo hiểm y tế, hưu trí, thất nghiệp theo luật Đức",
      "Hỗ trợ tìm nhà ở",
      "Được bảo lãnh vợ/chồng, con sang Đức",
      "Lộ trình định cư lâu dài",
    ],
    fee: {
      amount: "Phí vừa – liên hệ tư vấn",
      includes: ["Khoá tiếng Đức A1 – B1", "Công nhận bằng cấp", "Visa lao động", "Vé máy bay"],
    },
    contract: "Không thời hạn",
    documents: [
      "Hộ chiếu, CCCD",
      "Bằng THPT và học bạ (dịch thuật công chứng)",
      "Chứng chỉ tiếng Đức A2 trở lên",
      "CV tiếng Đức theo mẫu",
    ],
    process: [
      { title: "Đăng ký & kiểm tra tiếng", desc: "Kiểm tra trình độ tiếng Đức đầu vào.", time: "Tuần 1" },
      { title: "Phỏng vấn online với nhà máy", desc: "Phỏng vấn bằng tiếng Đức qua video.", time: "Tuần 2 – 4" },
      { title: "Học tiếng đến B1", desc: "Học tập trung tại TP. Hồ Chí Minh.", time: "4 – 6 tháng" },
      { title: "Xin visa & xuất cảnh", desc: "Nộp hồ sơ visa tại ĐSQ Đức.", time: "Tháng 7 – 9" },
    ],
    interview: "Phỏng vấn online liên tục",
    departure: "Q2/2027",
    consultant: consultants.canh,
    tags: ["Chế biến thực phẩm", "Châu Âu", "Định cư", "Tiếng Đức"],
  },

  5: {
    code: "17411",
    company: "ITW Việt Nam – chuỗi nhà hàng Sunny Beach",
    workplace: "Varna, Bulgaria",
    quantity: 15,
    quantityNote: "15 nam/nữ",
    gallery: ["/jobs/job-5.jpg", "/jobs/job-4.jpg", "/jobs/job-1.jpg"],
    summary:
      "Chuỗi nhà hàng khu nghỉ dưỡng ven biển tại Varna tuyển 15 đầu bếp và phụ bếp. Bao ăn ở, môi trường quốc tế, có cơ hội chuyển sang các nước khối Schengen sau hợp đồng.",
    highlights: [
      "Lương 900 Euro/tháng",
      "Bao ăn ở miễn phí",
      "Không yêu cầu ngoại ngữ",
      "Phí thấp, bay nhanh",
    ],
    duties: [
      "Sơ chế nguyên liệu, chuẩn bị món theo thực đơn",
      "Nấu món Âu – Á dưới sự hướng dẫn của bếp trưởng",
      "Vệ sinh khu bếp và dụng cụ",
    ],
    environment: ["Bếp nhà hàng trong khu resort", "Làm việc cùng đồng nghiệp quốc tế"],
    requirements: [
      { label: "Giới tính", value: "Nam và nữ" },
      { label: "Năm sinh", value: "1981 – 2006" },
      { label: "Kinh nghiệm", value: "Ưu tiên đã làm bếp 6 tháng trở lên" },
      { label: "Ngoại ngữ", value: "Không yêu cầu, biết tiếng Anh là lợi thế" },
      { label: "Sức khỏe", value: "Tốt, có giấy chứng nhận an toàn thực phẩm" },
    ],
    salary: {
      basic: "900 Euro/tháng",
      expected: "1.000 – 1.200 Euro/tháng",
      overtime: "Tăng ca mùa cao điểm tính 150%",
      deduction: "Không – bao ăn ở",
      expectedVnd: "≈ 27 – 33 triệu VNĐ/tháng",
    },
    schedule: [
      { label: "Thời gian làm", value: "8 giờ/ngày, 6 ngày/tuần" },
      { label: "Ca làm", value: "Ca xoay theo lịch nhà hàng" },
      { label: "Tăng ca", value: "Mùa hè (06 – 09)" },
      { label: "Hợp đồng", value: "2 năm, có thể gia hạn" },
    ],
    benefits: ["Bao ăn 3 bữa và chỗ ở", "Bảo hiểm y tế", "Thưởng cuối mùa du lịch", "Hỗ trợ gia hạn thẻ cư trú"],
    fee: {
      amount: "3.500 USD",
      includes: ["Phí dịch vụ", "Visa D", "Vé máy bay chiều đi"],
    },
    contract: "2 năm, có thể gia hạn",
    documents: ["Hộ chiếu còn hạn trên 2 năm", "CCCD", "Chứng chỉ nghề bếp (nếu có)", "4 ảnh 3,5x4,5"],
    process: [
      { title: "Đăng ký & thi tay nghề bếp", desc: "Nấu thử 2 món theo yêu cầu.", time: "Tuần 1" },
      { title: "Phỏng vấn với nhà hàng", desc: "Phỏng vấn online có phiên dịch.", time: "Tuần 2" },
      { title: "Xin giấy phép lao động & visa", desc: "Thời gian xét duyệt 2 – 3 tháng.", time: "Tháng 1 – 3" },
      { title: "Xuất cảnh", desc: "Bay sang Sofia, di chuyển về Varna.", time: "Tháng 4" },
    ],
    interview: "Thi tay nghề liên tục",
    departure: "Sau 3 – 4 tháng trúng tuyển",
    consultant: consultants.canh,
    tags: ["Đầu bếp", "Nhà hàng", "Châu Âu", "Bao ăn ở"],
  },

  6: {
    code: "17398",
    company: "Công ty Xây dựng Hoa Thịnh",
    workplace: "Đài Trung, Đài Loan",
    quantity: 16,
    quantityNote: "16 nam",
    gallery: ["/jobs/job-6.jpg", "/jobs/job-2.jpg", "/jobs/job-3.jpg"],
    summary:
      "Công ty xây dựng Hoa Thịnh tuyển 16 nam lái máy xúc, máy ủi cho các công trình hạ tầng tại Đài Trung. Yêu cầu có kinh nghiệm vận hành máy, lương cơ bản theo luật và nhiều giờ tăng ca.",
    highlights: [
      "Thu nhập 38.000 – 45.000 Đài tệ/tháng",
      "Công trình hạ tầng dài hạn",
      "Ưu tiên có chứng chỉ vận hành máy",
      "Hạn hồ sơ 19/09/2026",
    ],
    duties: [
      "Vận hành máy xúc, máy ủi, máy lu tại công trình",
      "Kiểm tra, bảo dưỡng máy hằng ngày",
      "Phối hợp với tổ thi công theo bản vẽ",
    ],
    environment: ["Công trình ngoài trời", "Được cấp mũ, giày, áo phản quang"],
    requirements: [
      { label: "Giới tính", value: "Nam" },
      { label: "Năm sinh", value: "1981 – 2001" },
      { label: "Kinh nghiệm", value: "Tối thiểu 2 năm vận hành máy công trình" },
      { label: "Chứng chỉ", value: "Chứng chỉ vận hành máy là lợi thế" },
      { label: "Sức khỏe", value: "Tốt, không sợ độ cao" },
    ],
    salary: {
      basic: "29.500 Đài tệ/tháng",
      expected: "38.000 – 45.000 Đài tệ/tháng",
      overtime: "Tăng ca theo luật Đài Loan",
      deduction: "2.500 Đài tệ/tháng (ký túc xá)",
      expectedVnd: "≈ 30 – 36 triệu VNĐ/tháng",
    },
    schedule: [
      { label: "Thời gian làm", value: "8 giờ/ngày, 6 ngày/tuần" },
      { label: "Ca làm", value: "Ca ngày" },
      { label: "Tăng ca", value: "2 – 4 giờ/ngày" },
      { label: "Hợp đồng", value: "3 năm, có thể gia hạn" },
    ],
    benefits: [
      "Ký túc xá gần công trình",
      "Bảo hiểm lao động, y tế",
      "Hỗ trợ tiền ăn trưa tại công trình",
      "Thưởng Tết Âm lịch",
    ],
    fee: {
      amount: "4.500 USD",
      includes: ["Phí dịch vụ", "Phí đào tạo", "Vé máy bay chiều đi"],
    },
    contract: "3 năm, có thể gia hạn",
    documents: [
      "CCCD bản sao công chứng",
      "Chứng chỉ vận hành máy (nếu có)",
      "4 ảnh 4x6 nền trắng",
      "Sơ yếu lý lịch",
    ],
    process: taiwanProcess("12/2026"),
    interview: "Thi tay nghề trước 19/09/2026",
    departure: "12/2026",
    deadline: "19/09/2026",
    consultant: consultants.nga,
    tags: ["Xây dựng", "Lái máy", "Đài Loan", "Phí thấp"],
  },
};

/* -------------------------------------------------------------------------- */
/*                                 HELPERS                                    */
/* -------------------------------------------------------------------------- */

/** Bỏ tag đầu tiêu đề, VD "[Đơn miễn phí] ..." -> { tag, title } */
export function splitTitleTag(title: string) {
  const match = title.match(/^\[([^\]]+)\]\s*/);
  return match ? { tag: match[1], title: title.slice(match[0].length) } : { tag: undefined, title };
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Slug dạng "tuyen-25-nu-...-p1" (giống cấu trúc URL của site gốc) */
export function jobSlug(job: XkldJob) {
  return `${slugify(splitTitleTag(job.title).title)}-p${job.id}`;
}

export function jobHref(job: XkldJob) {
  return `/viec-lam/${jobSlug(job)}`;
}

export function getJobBySlug(slug: string) {
  const id = Number(slug.match(/-p(\d+)$/)?.[1]);
  if (!id) return undefined;
  const job = buildJobDataset().find((item) => item.id === id);
  if (!job) return undefined;
  const detail = jobDetails[id % 100];
  return detail ? { job, detail } : undefined;
}

export function getAllJobSlugs() {
  return buildJobDataset().map(jobSlug);
}

/** Đơn tương tự: cùng quốc gia hoặc ngành, bỏ bản sao của chính đơn này */
export function getRelatedJobs(job: XkldJob, limit = 4) {
  const seedId = job.id % 100;
  return buildJobDataset()
    .filter((item) => item.id % 100 !== seedId)
    .map((item) => ({
      item,
      score: (item.country === job.country ? 2 : 0) + (item.industry === job.industry ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((entry, index, list) => list.findIndex((other) => other.item.id % 100 === entry.item.id % 100) === index)
    .slice(0, limit)
    .map((entry) => entry.item);
}

/** Dữ liệu tóm tắt đơn hiển thị trong popup ứng tuyển */
export type ApplyJobSummary = {
  title: string;
  image: string;
  company: string;
  workplace: string;
  flagCode: string;
  salary: string;
  expected: string;
  fee: string;
  consultant: { name: string; role: string; avatar: string; phone: string; rating: number };
  /** Link trang chi tiết — có thì màn thành công hiện nút "Xem chi tiết đơn" */
  href?: string;
};

export function toApplySummary(job: XkldJob, withHref = true): ApplyJobSummary {
  const detail = jobDetails[job.id % 100];
  return {
    title: splitTitleTag(job.title).title,
    image: detail?.gallery[0] ?? job.image,
    company: detail?.company ?? job.employer,
    workplace: detail?.workplace ?? job.country,
    flagCode: job.flagCode,
    salary: detail?.salary.basic ?? job.salary,
    expected: detail?.salary.expected ?? job.salary,
    fee: job.fee,
    consultant: detail?.consultant ?? {
      name: job.employer,
      role: "Cán bộ tuyển dụng",
      avatar: job.employerAvatar,
      phone: job.phone,
      rating: job.employerRating,
    },
    href: withHref ? jobHref(job) : undefined,
  };
}
