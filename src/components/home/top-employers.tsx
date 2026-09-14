"use client";

import Link from "next/link";
import { Star, MapPin, Briefcase, Users, ArrowRight, Plus } from "lucide-react";
import { companies } from "@/lib/home-data";

export function TopEmployers() {
  return (
    <section id="companies" className="section">
      <div className="u-container">
        <div className="section__head">
          <div style={{ maxWidth: "36rem" }}>
            <h2 className="section__title">
              Top công ty hàng đầu
            </h2>
          </div>
          <Link href="#" className="section__link">
            Xem tất cả công ty
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="companies__grid">
          {companies.map((company) => (
            <article key={company.id} className="company-card">
              <div className="company-card__cover">
                <img src={company.cover} alt={`${company.name} cover`} loading="lazy" />
                <div className="company-card__cover-overlay" />
              </div>

              <div className="company-card__body">
                <div className="company-card__logo">
                  <img src={company.logo} alt={`${company.name} logo`} loading="lazy" />
                </div>

                <div className="company-card__head">
                  <h3 className="company-card__name">
                    <Link href="#">{company.name}</Link>
                  </h3>
                  <span className="badge company-card__rating">
                    <Star size={10} style={{ fill: "currentColor" }} />
                    {company.rating}
                  </span>
                </div>

                <p className="company-card__industry">{company.industry}</p>

                <div className="company-card__info">
                  <div className="company-card__info-item">
                    <MapPin size={14} />
                    <span className="job-meta-item__text">{company.location}</span>
                  </div>
                  <div className="company-card__info-item">
                    <Users size={14} />
                    <span>{company.size} nhân viên</span>
                  </div>
                </div>

                <div className="company-card__stats">
                  <div className="company-stat">
                    <p className="company-stat__label">Việc làm</p>
                    <p className="company-stat__value">{company.jobCount}</p>
                  </div>
                  <div className="company-stat">
                    <p className="company-stat__label">Người theo dõi</p>
                    <p className="company-stat__value">{company.followerCount}</p>
                  </div>
                </div>

                <div className="company-card__actions">
                  <Link href="#" className="btn btn--outline btn--sm">
                    <Plus size={14} />
                    Theo dõi
                  </Link>
                  <Link href="#" className="btn btn--primary btn--sm">
                    <Briefcase size={14} />
                    {company.jobCount} việc làm
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
