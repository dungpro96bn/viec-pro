"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Heart,
  Flame,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Eye,
  Phone,
  MessageCircle,
  Star,
  Users,
  Calendar,
  Tag,
} from "lucide-react";
import { sampleJobs, type XkldJob } from "@/lib/xkld-data";

const feeClass: Record<XkldJob["fee"], string> = {
  "Miễn phí": "badge--fee-free",
  "Phí thấp": "badge--fee-low",
  "Phí vừa": "badge--fee-mid",
};

const tabs = [
  { id: "hot", label: "Việc làm HOT", icon: Flame },
  { id: "new", label: "Mới nhất", icon: Sparkles },
  { id: "high-salary", label: "Lương cao", icon: TrendingUp },
] as const;

export function FeaturedJobs() {
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("hot");

  const toggleSave = (id: number) =>
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const hotJobs = sampleJobs.filter((j) => j.isHot).slice(0, 6);
  const newJobs = [...sampleJobs].sort((a, b) => a.id - b.id).slice(0, 6);
  const highSalaryJobs = [...sampleJobs].sort((a, b) => b.salaryUsd - a.salaryUsd).slice(0, 6);
  const jobs = activeTab === "hot" ? hotJobs : activeTab === "new" ? newJobs : highSalaryJobs;

  return (
    <section id="jobs" className="section section--tinted">
      <div className="u-container">
        <div className="section__head">
          <div style={{ maxWidth: "36rem" }}>
            <h2 className="section__title">
              Việc làm nổi bật
            </h2>
          </div>
          <Link href="/viec-lam" className="section__link">
            Xem tất cả đơn hàng
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="tabs__list" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tabs__trigger${activeTab === tab.id ? " tabs__trigger--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="jgrid">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={savedJobs.has(job.id)}
              onToggleSave={() => toggleSave(job.id)}
            />
          ))}
        </div>

        <div className="featured__cta">
          <Link href="/viec-lam" className="btn btn--primary btn--lg">
            Khám phá thêm 5.000+ đơn hàng XKLĐ
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function JobCard({
  job,
  saved,
  onToggleSave,
}: {
  job: XkldJob;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const tagMatch = job.title.match(/^\[([^\]]+)\]/);
  const tag = tagMatch?.[1];
  const cleanTitle = tag ? job.title.replace(/^\[[^\]]+\]\s*/, "") : job.title;

  return (
    <article className="jcard">
      <div className="jcard__media">
        <img className="jcard__img" src={job.image} alt={cleanTitle} loading="lazy" />
        <div className="jcard__overlay" />

        <div className="jcard__badges">
          {tag && <span className="badge badge--tag">{tag}</span>}
          {job.isHot && (
            <span className="badge badge--hot">
              <Flame size={10} />
              HOT
            </span>
          )}
          {job.isNew && (
            <span className="badge badge--new">
              <Sparkles size={10} />
              MỚI
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? "Bỏ lưu" : "Lưu đơn hàng"}
          className={`jcard__save${saved ? " jcard__save--active" : ""}`}
        >
          <Heart size={16} />
        </button>

        <div className="jcard__flag">
          <span className="jcard__flag-emoji">{job.countryFlag}</span>
          <span className="jcard__flag-name">{job.country}</span>
        </div>

        <div className="jcard__views">
          <Eye size={12} />
          {job.views}
        </div>
      </div>

      <div className="jcard__body">
        <h3 className="jcard__title">
          <Link href="/viec-lam">{cleanTitle}</Link>
        </h3>

        <div className="jcard__salary">
          <span className="jcard__salary-icon">
            <TrendingUp size={14} />
          </span>
          <div className="jcard__salary-body">
            <p className="jcard__salary-label">Mức lương</p>
            <p className="jcard__salary-amount">{job.salary}</p>
          </div>
          <span className={`badge badge--fee ${feeClass[job.fee]}`}>{job.fee}</span>
        </div>

        <div className="jcard__meta">
          <MetaItem icon={<Users size={14} />} text={job.gender} />
          <MetaItem icon={<Calendar size={14} />} text={`SN: ${job.birthRange}`} />
          <MetaItem icon={<Tag size={14} />} text={job.industry.split(" / ")[0]} />
          <MetaItem
            icon={<Clock size={14} />}
            text={job.recruitmentType === "Liên tục" ? "Liên tục" : `HSD: ${job.recruitmentType}`}
          />
        </div>

        <div className="jcard__employer">
          <div className="jcard__avatar">
            <img src={job.employerAvatar} alt={job.employer} loading="lazy" />
            <span className="jcard__verified" title="Nhà tuyển dụng đã xác thực">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="8" height="8">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </div>
          <div className="jcard__employer-info">
            <p className="jcard__employer-name">{job.employer}</p>
            <div className="jcard__employer-sub">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} className={i < job.employerRating ? "star star--on" : "star"} />
              ))}
              <span style={{ fontSize: 10, color: "var(--muted-foreground)", marginLeft: 4 }}>
                NTD xác thực
              </span>
            </div>
          </div>
        </div>

        <div className="jcard__actions">
          <Link href="/viec-lam" className="btn btn--primary btn--sm">
            Ứng tuyển ngay
            <ArrowRight size={12} />
          </Link>
          <Link href={`tel:${job.phone}`} className="btn btn--outline btn--sm btn--icon" aria-label={`Gọi ${job.phone}`}>
            <Phone size={14} />
          </Link>
          <Link
            href={`https://zalo.me/${job.phone}`}
            target="_blank"
            className="btn btn--outline btn--sm btn--icon"
            aria-label="Nhắn tin Zalo"
          >
            <MessageCircle size={14} />
          </Link>
        </div>

        <div className="jcard__footer">
          <span className="jcard__footer-item">
            <MapPin size={10} />
            {job.location}
          </span>
          <span>{job.postedAt}</span>
        </div>
      </div>
    </article>
  );
}

function MetaItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="job-meta-item">
      <span className="job-meta-item__icon">{icon}</span>
      <span className="job-meta-item__text">{text}</span>
    </div>
  );
}
