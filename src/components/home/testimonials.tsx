"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/home-data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  return (
    <section className="tm">
      <div className="u-container">
        <div className="section__head section__head--center">
          <div>
            <h2 className="section__title">
              Hàng triệu ứng viên & doanh nghiệp <span className="u-gradient-text">đã tin chọn ViecPro</span>
            </h2>
            <p className="section__desc">
              Những câu chuyện thật từ cộng đồng ứng viên và nhà tuyển dụng trên ViecPro.
            </p>
          </div>
        </div>

        <div className="tm__wrap">
          <div className="tm__card">
            <Quote size={80} className="tm__quote-icon" />
            <div className="tm__inner">
              <div className="tm__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} className={i < t.rating ? "star star--on" : "star"} />
                ))}
              </div>

              <blockquote className="tm__quote">&ldquo;{t.content}&rdquo;</blockquote>

              <div className="tm__author">
                <div className="tm__author-info">
                  <img className="tm__avatar" src={t.avatar} alt={t.name} loading="lazy" />
                  <div>
                    <p className="tm__name">{t.name}</p>
                    <p className="tm__role">{t.role} • {t.company}</p>
                  </div>
                </div>

                <div className="tm__nav">
                  <button type="button" className="btn btn--outline btn--icon" onClick={prev} aria-label="Trước" style={{ borderRadius: 9999 }}>
                    <ChevronLeft size={16} />
                  </button>
                  <button type="button" className="btn btn--outline btn--icon" onClick={next} aria-label="Sau" style={{ borderRadius: 9999 }}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="tm__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`tm__dot${i === active ? " tm__dot--active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Đánh giá ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
