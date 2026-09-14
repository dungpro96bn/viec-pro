"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Building2, FileText, CheckCircle2 } from "lucide-react";

const candidateBenefits = [
  "Tạo CV miễn phí với 50+ mẫu chuyên nghiệp",
  "AI gợi ý việc làm phù hợp 95%",
  "Ứng tuyển 1 click với CV đã lưu",
  "Nhận thông báo việc làm mới tức thì",
];

const employerBenefits = [
  "Tiếp cận 2.5M+ ứng viên đang tìm việc",
  "Bộ lọc AI thông minh tìm đúng ứng viên",
  "Quản lý hồ sơ ứng viên tập trung",
  "Hỗ trợ chuyên gia 1-1 trong suốt quá trình",
];

export function CtaSection() {
  return (
    <section className="cta">
      <div className="u-container">
        <div className="cta__grid">
          {/* Ứng viên */}
          <div className="cta-card">
            <div className="cta-card__glow cta-card__glow--primary" />
            <div className="cta-card__inner">
              <div className="cta-card__icon u-gradient-primary">
                <FileText size={28} />
              </div>
              <h3 className="cta-card__title">Bạn đang tìm việc làm?</h3>
              <p className="cta-card__text">
                Đăng ký miễn phí, tạo CV chuyên nghiệp và nhận việc làm phù hợp ngay hôm nay.
              </p>
              <ul className="cta-list">
                {candidateBenefits.map((item) => (
                  <li key={item} className="cta-list__item">
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="cta-card__actions">
                <Link href="#" className="btn btn--primary btn--lg">
                  <Sparkles size={16} />
                  Đăng ký miễn phí
                </Link>
                <Link href="#" className="btn btn--outline btn--lg">
                  Tạo CV ngay
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Nhà tuyển dụng */}
          <div className="cta-card cta-card--dark">
            <div className="cta-card__glow cta-card__glow--accent" />
            <div className="cta-card__dots" />
            <div className="cta-card__inner">
              <div className="cta-card__icon cta-card__icon--accent">
                <Building2 size={28} />
              </div>
              <h3 className="cta-card__title">Bạn là nhà tuyển dụng?</h3>
              <p className="cta-card__text">
                Đăng tin tuyển dụng, tiếp cận 2.5M+ ứng viên chất lượng và tuyển dụng hiệu quả với bộ công cụ AI.
              </p>
              <ul className="cta-list">
                {employerBenefits.map((item) => (
                  <li key={item} className="cta-list__item">
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="cta-card__actions">
                <Link href="#" className="btn btn--lg" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                  Đăng tin tuyển dụng
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#"
                  className="btn btn--lg"
                  style={{ background: "transparent", color: "var(--background)", border: "1px solid color-mix(in srgb, var(--background) 20%, transparent)" }}
                >
                  Xem bảng giá
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
