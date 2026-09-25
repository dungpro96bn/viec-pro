import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Briefcase,
  Building2,
  CalendarClock,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Clock,
  Eye,
  FileText,
  Gift,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { JobGallery } from "@/components/job-detail/job-gallery";
import { JobSectionNav, type SectionLink } from "@/components/job-detail/job-section-nav";
import { JobSaveShare } from "@/components/job-detail/job-save-share";
import { JobApplyCard } from "@/components/job-detail/job-apply-card";
import { ApplyButton, JobApplyModal } from "@/components/job-detail/job-apply-modal";
import {
  getAllJobSlugs,
  getJobBySlug,
  getRelatedJobs,
  jobDetails,
  jobHref,
  jobSlug,
  splitTitleTag,
  toApplySummary,
} from "@/lib/job-details";
import type { XkldJob } from "@/lib/xkld-data";

const feeClass: Record<XkldJob["fee"], string> = {
  "Miễn phí": "badge--fee-free",
  "Phí thấp": "badge--fee-low",
  "Phí vừa": "badge--fee-mid",
};

const sections: SectionLink[] = [
  { id: "tong-quan", label: "Tổng quan" },
  { id: "cong-viec", label: "Công việc" },
  { id: "yeu-cau", label: "Yêu cầu" },
  { id: "thu-nhap", label: "Thu nhập & phúc lợi" },
  { id: "chi-phi", label: "Chi phí & hồ sơ" },
  { id: "quy-trinh", label: "Quy trình" },
];

export function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/viec-lam/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const found = getJobBySlug(slug);
  if (!found) return { title: "Không tìm thấy đơn hàng | ViecPro" };
  const { job, detail } = found;
  const { title } = splitTitleTag(job.title);
  return {
    title: `${title} | ViecPro`,
    description: detail.summary,
    openGraph: { title, description: detail.summary, images: [detail.gallery[0]] },
  };
}

export default async function JobDetailPage(props: PageProps<"/viec-lam/[slug]">) {
  const { slug } = await props.params;
  const found = getJobBySlug(slug);
  if (!found) notFound();

  const { job, detail } = found;
  // Id đúng nhưng phần chữ của slug sai -> chuyển về URL chuẩn
  if (slug !== jobSlug(job)) permanentRedirect(jobHref(job));

  const { tag, title } = splitTitleTag(job.title);
  const related = getRelatedJobs(job);
  const facts = [
    { icon: <Users size={16} />, label: "Số lượng", value: detail.quantityNote },
    { icon: <CalendarDays size={16} />, label: "Năm sinh", value: job.birthRange },
    { icon: <Briefcase size={16} />, label: "Ngành nghề", value: job.industry },
    { icon: <UserCheck size={16} />, label: "Hình thức tuyển", value: detail.interview },
    { icon: <Plane size={16} />, label: "Dự kiến xuất cảnh", value: detail.departure },
    { icon: <CalendarClock size={16} />, label: "Hợp đồng", value: detail.contract },
  ];

  return (
    <div className="jobs-shell">
      <SiteHeader />
      <main className="jobs-shell__main jd">
        {/* ============================== HERO ============================== */}
        <div className="jd-top">
          <div className="jobs-container">
            <nav className="jd-crumbs" aria-label="Breadcrumb">
              <Link href="/">Trang chủ</Link>
              <ChevronRight size={14} />
              <Link href="/viec-lam">Việc làm</Link>
              <ChevronRight size={14} />
              <span>{job.country}</span>
              <ChevronRight size={14} />
              <span aria-current="page" className="jd-crumbs__current">
                {title}
              </span>
            </nav>

            <div className="jd-hero">
              <JobGallery images={detail.gallery} alt={title} tag={tag} isHot={job.isHot} isNew={job.isNew} />

              <div className="jd-hero__info">
                <div className="jd-hero__labels">
                  <span className={`badge badge--fee ${feeClass[job.fee]}`}>{job.fee}</span>
                  <span className="jd-hero__code">Mã đơn: {detail.code}</span>
                  <span className="jd-hero__verified">
                    <BadgeCheck size={14} />
                    Đơn đã xác thực
                  </span>
                </div>

                <h1 className="jd-hero__title">{title}</h1>

                <div className="jd-hero__where">
                  <span>
                    <Building2 size={16} />
                    {detail.company}
                  </span>
                  <span>
                    <img src={`/flags/${job.flagCode}.svg`} alt="" className="jd-flag" />
                    {detail.workplace}
                  </span>
                </div>

                <div className="jd-salary">
                  <div className="jd-salary__item">
                    <span className="jd-salary__label">Lương cơ bản</span>
                    <span className="jd-salary__value">{detail.salary.basic}</span>
                  </div>
                  <div className="jd-salary__item jd-salary__item--accent">
                    <span className="jd-salary__label">
                      <TrendingUp size={14} />
                      Thu nhập dự kiến
                    </span>
                    <span className="jd-salary__value">{detail.salary.expected}</span>
                    <span className="jd-salary__sub">{detail.salary.expectedVnd}</span>
                  </div>
                </div>

                <dl className="jd-facts">
                  {facts.map((fact) => (
                    <div key={fact.label} className="jd-facts__item">
                      <span className="jd-facts__icon">{fact.icon}</span>
                      <div>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="jd-hero__actions">
                  <ApplyButton className="btn btn--primary btn--lg jd-hero__apply">
                    Ứng tuyển ngay
                    <ArrowRight size={16} />
                  </ApplyButton>
                  <a href={`tel:${detail.consultant.phone}`} className="btn btn--outline btn--lg">
                    <Phone size={16} />
                    {detail.consultant.phone}
                  </a>
                  <JobSaveShare title={title} />
                </div>

                <div className="jd-hero__meta">
                  <span>
                    <Clock size={12} />
                    Đăng {job.postedAt}
                  </span>
                  <span>
                    <Eye size={12} />
                    {job.views} lượt xem
                  </span>
                  <span>
                    <MapPin size={12} />
                    Nhận hồ sơ tại {job.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <JobSectionNav sections={sections} />

        {/* ============================== BODY ============================== */}
        <div className="jobs-container jd-body">
          <div className="jd-layout">
            <div className="jd-main">
              <Section id="tong-quan" icon={<ClipboardList size={18} />} title="Tổng quan đơn hàng">
                <p className="jd-lead">{detail.summary}</p>
                <ul className="jd-highlights">
                  {detail.highlights.map((item) => (
                    <li key={item}>
                      <span className="jd-highlights__icon">
                        <Check size={14} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="cong-viec" icon={<Briefcase size={18} />} title="Mô tả công việc">
                <h3 className="jd-subtitle">Nhiệm vụ chính</h3>
                <ul className="jd-list">
                  {detail.duties.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="jd-subtitle">Môi trường làm việc</h3>
                <ul className="jd-list">
                  {detail.environment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Section>

              <Section id="yeu-cau" icon={<UserCheck size={18} />} title="Yêu cầu ứng viên">
                <dl className="jd-table">
                  {detail.requirements.map((row) => (
                    <div key={row.label} className="jd-table__row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </Section>

              <Section id="thu-nhap" icon={<Wallet size={18} />} title="Thu nhập & phúc lợi">
                <div className="jd-money">
                  <MoneyCard icon={<Banknote size={18} />} label="Lương cơ bản" value={detail.salary.basic} />
                  <MoneyCard
                    icon={<TrendingUp size={18} />}
                    label="Thu nhập dự kiến"
                    value={detail.salary.expected}
                    sub={detail.salary.expectedVnd}
                    accent
                  />
                  <MoneyCard icon={<Clock size={18} />} label="Tăng ca" value={detail.salary.overtime} />
                  <MoneyCard icon={<Building2 size={18} />} label="Khấu trừ hàng tháng" value={detail.salary.deduction} />
                </div>

                <h3 className="jd-subtitle">Thời gian làm việc</h3>
                <dl className="jd-table">
                  {detail.schedule.map((row) => (
                    <div key={row.label} className="jd-table__row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="jd-subtitle">Chế độ phúc lợi</h3>
                <ul className="jd-benefits">
                  {detail.benefits.map((item) => (
                    <li key={item}>
                      <Gift size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="chi-phi" icon={<FileText size={18} />} title="Chi phí & hồ sơ">
                <div className="jd-fee">
                  <div className="jd-fee__amount">
                    <span>Chi phí tham gia</span>
                    <strong>{detail.fee.amount}</strong>
                  </div>
                  <div className="jd-fee__includes">
                    <span>Đã bao gồm</span>
                    <ul>
                      {detail.fee.includes.map((item) => (
                        <li key={item}>
                          <Check size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {detail.fee.note && <p className="jd-note">{detail.fee.note}</p>}

                <h3 className="jd-subtitle">Hồ sơ cần chuẩn bị</h3>
                <ol className="jd-docs">
                  {detail.documents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </Section>

              <Section id="quy-trinh" icon={<Plane size={18} />} title="Quy trình tuyển dụng">
                <ol className="jd-steps">
                  {detail.process.map((step, i) => (
                    <li key={step.title} className="jd-steps__item">
                      <span className="jd-steps__num">{i + 1}</span>
                      <div className="jd-steps__body">
                        <div className="jd-steps__head">
                          <h3>{step.title}</h3>
                          {step.time && <span className="jd-steps__time">{step.time}</span>}
                        </div>
                        <p>{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>

              <div className="jd-tags">
                {detail.tags.map((item) => (
                  <Link key={item} href="/viec-lam" className="jd-tags__item">
                    #{item}
                  </Link>
                ))}
              </div>

              <div className="jd-warning" role="note">
                <AlertTriangle size={20} />
                <p>
                  <strong>Lưu ý an toàn:</strong> ViecPro là nền tảng kết nối thông tin. Không chuyển tiền đặt cọc trước khi ký hợp
                  đồng, hãy kiểm tra giấy phép XKLĐ của doanh nghiệp và xác minh thông tin trực tiếp với nhà tuyển dụng.
                </p>
              </div>
            </div>

            <aside className="jd-aside">
              <JobApplyCard
                salary={detail.salary.basic}
                expected={detail.salary.expected}
                expectedVnd={detail.salary.expectedVnd}
                fee={job.fee}
                deadline={detail.deadline}
                phone={detail.consultant.phone}
              />

              <section className="jd-card jd-consultant" aria-label="Cán bộ tuyển dụng">
                <p className="jd-card__eyebrow">Cán bộ phụ trách</p>
                <div className="jd-consultant__head">
                  <img src={detail.consultant.avatar} alt={detail.consultant.name} className="jd-consultant__avatar" />
                  <div>
                    <p className="jd-consultant__name">
                      {detail.consultant.name}
                      <BadgeCheck size={16} />
                    </p>
                    <p className="jd-consultant__role">{detail.consultant.role}</p>
                    <div className="jd-consultant__stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < detail.consultant.rating ? "star star--on" : "star"} />
                      ))}
                    </div>
                  </div>
                </div>
                <dl className="jd-consultant__stats">
                  <div>
                    <dt>{detail.consultant.experienceYears} năm</dt>
                    <dd>Kinh nghiệm</dd>
                  </div>
                  <div>
                    <dt>{detail.consultant.placed.toLocaleString("vi-VN")}+</dt>
                    <dd>Lao động đã bay</dd>
                  </div>
                  <div>
                    <dt>{detail.consultant.office}</dt>
                    <dd>Văn phòng</dd>
                  </div>
                </dl>
                <div className="jd-consultant__actions">
                  <a href={`tel:${detail.consultant.phone}`} className="btn btn--primary-outline btn--md">
                    <Phone size={14} />
                    Gọi
                  </a>
                  <a href={`https://zalo.me/${detail.consultant.phone}`} target="_blank" rel="noreferrer" className="btn btn--primary-outline btn--md">
                    <MessageCircle size={14} />
                    Zalo
                  </a>
                </div>
              </section>
            </aside>
          </div>

          {/* ========================== RELATED ========================== */}
          {related.length > 0 && (
            <section className="jd-related" aria-labelledby="jd-related-title">
              <div className="jd-related__head">
                <h2 id="jd-related-title">Đơn hàng tương tự</h2>
                <Link href="/viec-lam" className="section__link">
                  Xem tất cả
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="jd-related__grid">
                {related.map((item) => (
                  <RelatedCard key={item.id} job={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Thanh hành động cố định trên mobile */}
        <div className="jd-mobilebar">
          <a href={`tel:${detail.consultant.phone}`} className="btn btn--outline btn--lg btn--icon-lg" aria-label="Gọi cán bộ tuyển dụng">
            <Phone size={18} />
          </a>
          <a
            href={`https://zalo.me/${detail.consultant.phone}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--outline btn--lg btn--icon-lg"
            aria-label="Chat Zalo"
          >
            <MessageCircle size={18} />
          </a>
          <ApplyButton className="btn btn--primary btn--lg jd-mobilebar__apply">
            Ứng tuyển ngay
          </ApplyButton>
        </div>

        <JobApplyModal job={toApplySummary(job, false)} />
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="jd-card jd-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="jd-section__title">
        <span className="jd-section__icon">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function MoneyCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className={`jd-money__card${accent ? " jd-money__card--accent" : ""}`}>
      <span className="jd-money__icon">{icon}</span>
      <span className="jd-money__label">{label}</span>
      <span className="jd-money__value">{value}</span>
      {sub && <span className="jd-money__sub">{sub}</span>}
    </div>
  );
}

function RelatedCard({ job }: { job: XkldJob }) {
  const { tag, title } = splitTitleTag(job.title);
  const detail = jobDetails[job.id % 100];
  return (
    <Link href={jobHref(job)} className="jd-rcard">
      <div className="jd-rcard__media">
        <img src={job.image} alt="" loading="lazy" />
        <div className="jd-rcard__badges">
          {tag && <span className="badge badge--tag">{tag}</span>}
          {job.isHot && <span className="badge badge--hot">HOT</span>}
        </div>
        <span className={`badge badge--fee ${feeClass[job.fee]} jd-rcard__fee`}>{job.fee}</span>
        <span className="jd-rcard__flag">
          <img src={`/flags/${job.flagCode}.svg`} alt="" className="jd-flag" />
          {detail?.workplace ?? job.country}
        </span>
      </div>

      <div className="jd-rcard__body">
        {detail && (
          <p className="jd-rcard__company">
            <Building2 size={12} />
            {detail.company}
          </p>
        )}
        <h3 className="jd-rcard__title">{title}</h3>

        <div className="jd-rcard__pay">
          <p className="jd-rcard__salary">
            <TrendingUp size={14} />
            {job.salary}
          </p>
          {detail && <p className="jd-rcard__expected">Thu nhập {detail.salary.expected}</p>}
        </div>

        <ul className="jd-rcard__meta">
          <li>
            <Users size={13} />
            {detail?.quantityNote ?? job.gender}
          </li>
          <li>
            <CalendarDays size={13} />
            {job.birthRange}
          </li>
          <li>
            <Clock size={13} />
            {job.recruitmentType === "Liên tục" ? "Tuyển liên tục" : `HSD ${job.recruitmentType}`}
          </li>
          <li>
            <Briefcase size={13} />
            {job.industry.split(" / ")[0]}
          </li>
          {detail && (
            <li className="jd-rcard__meta-wide">
              <Plane size={13} />
              Xuất cảnh: {detail.departure}
            </li>
          )}
        </ul>

        <div className="jd-rcard__footer">
          <img src={job.employerAvatar} alt="" className="jd-rcard__avatar" />
          <div className="jd-rcard__employer">
            <span>{job.employer}</span>
            <div className="jd-rcard__stars" aria-label={`Đánh giá ${job.employerRating}/5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className={i < job.employerRating ? "star star--on" : "star"} />
              ))}
              <em>{job.employerRating}.0</em>
            </div>
          </div>
          <small className="jd-rcard__stat">
            <span>
              <Eye size={11} />
              {job.views}
            </span>
            {job.postedAt}
          </small>
        </div>
      </div>
    </Link>
  );
}
