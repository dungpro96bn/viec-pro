"use client";

import Link from "next/link";
import {
  MapPin,
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
  Clock,
} from "lucide-react";
import type { XkldJob } from "@/lib/xkld-data";
import { jobHref } from "@/lib/job-details";

const feeClass: Record<XkldJob["fee"], string> = {
  "Miễn phí": "badge--fee-free",
  "Phí thấp": "badge--fee-low",
  "Phí vừa": "badge--fee-mid",
};

export function JobListCard({
  job,
  saved,
  onToggleSave,
  onApply,
}: {
  job: XkldJob;
  saved: boolean;
  onToggleSave: () => void;
  /** Mở popup ứng tuyển ngay tại trang danh sách */
  onApply: () => void;
}) {
  const tagMatch = job.title.match(/^\[([^\]]+)\]/);
  const tag = tagMatch?.[1];
  const cleanTitle = tag ? job.title.replace(/^\[[^\]]+\]\s*/, "") : job.title;

  return (
    <article className="job-card">
      {/* Ảnh */}
      <div className="job-card__media">
        <img className="job-card__img" src={job.image} alt={cleanTitle} loading="lazy" />
        <div className="job-card__overlay" />

        <div className="job-card__badges">
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

        {/* Nút lưu — trên ảnh (mobile) */}
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? "Bỏ lưu" : "Lưu đơn hàng"}
          className={`job-card__save job-card__save--onImage${saved ? " job-card__save--active" : ""}`}
        >
          <Heart size={16} />
        </button>

        <div className="job-card__flag">
          <span className="job-card__flag-emoji">{job.countryFlag}</span>
          <span className="job-card__flag-name">{job.country}</span>
        </div>
      </div>

      {/* Nội dung */}
      <div className="job-card__body">
        <div className="job-card__head">
          <h3 className="job-card__title">
            <Link href={jobHref(job)}>{cleanTitle}</Link>
          </h3>
          {/* Nút lưu — cạnh tiêu đề (desktop) */}
          <button
            type="button"
            onClick={onToggleSave}
            aria-label={saved ? "Bỏ lưu" : "Lưu đơn hàng"}
            className={`job-card__save job-card__save--besideTitle${saved ? " job-card__save--active" : ""}`}
          >
            <Heart size={16} />
          </button>
        </div>

        {/* Lương + phí */}
        <div className="job-card__salary">
          <span className="job-card__salary-pill">
            <TrendingUp size={14} />
            <span className="job-card__salary-amount">{job.salary}</span>
          </span>
          <span className={`badge badge--fee ${feeClass[job.fee]}`}>{job.fee}</span>
        </div>

        {/* Meta */}
        <div className="job-card__meta">
          <MetaItem icon={<Users size={14} />} text={job.gender} />
          <MetaItem icon={<Calendar size={14} />} text={`SN: ${job.birthRange}`} />
          <MetaItem icon={<Tag size={14} />} text={job.industry.split(" / ")[0]} />
          <MetaItem
            icon={<Clock size={14} />}
            text={job.recruitmentType === "Liên tục" ? "Tuyển liên tục" : `HSD: ${job.recruitmentType}`}
          />
        </div>

        {/* Footer: nhà tuyển dụng + hành động */}
        <div className="job-card__footer">
          <div className="job-card__employer">
            <img className="job-card__avatar" src={job.employerAvatar} alt={job.employer} loading="lazy" />
            <div style={{ minWidth: 0 }}>
              <p className="job-card__employer-name">{job.employer}</p>
              <div className="job-card__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < job.employerRating ? "star star--on" : "star"}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="job-card__actions">
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
            <button type="button" onClick={onApply} className="btn btn--primary btn--sm">
              <span className="job-card__apply-short">Ứng tuyển</span>
              <span className="job-card__apply-full">Ứng tuyển ngay</span>
              <ArrowRight size={12} className="job-card__apply-full" />
            </button>
          </div>
        </div>

        {/* Micro footer */}
        <div className="job-card__micro">
          <span className="job-card__micro-item">
            <MapPin size={10} />
            {job.location}
          </span>
          <span className="job-card__micro-group">
            <span className="job-card__micro-item">
              <Eye size={10} />
              {job.views}
            </span>
            <span>{job.postedAt}</span>
          </span>
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
