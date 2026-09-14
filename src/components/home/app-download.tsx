"use client";

import Link from "next/link";
import { Smartphone, Star, Download, QrCode } from "lucide-react";

const features = [
  { label: "Ứng tuyển 1 chạm", icon: "⚡" },
  { label: "Thông báo tức thì", icon: "🔔" },
  { label: "Chat trực tiếp", icon: "💬" },
  { label: "Quản lý CV", icon: "📄" },
];

const previewJobs = [
  { c: "Frontend Dev", s: "30-50tr", t: "HOT" },
  { c: "UX Designer", s: "25-35tr", t: "NEW" },
  { c: "Product Mgr", s: "40-60tr", t: "HOT" },
];

export function AppDownload() {
  return (
    <section className="appdl">
      <div className="u-container">
        <div className="appdl__card">
          <div className="appdl__mesh" />

          <div className="appdl__grid">
            {/* Left */}
            <div>
              <h2 className="appdl__title">
                Kiến tạo sự nghiệp của riêng bạn với ứng dụng <span className="u-gradient-text">Viecpro</span>
              </h2>
              <p className="appdl__text">
                Ứng tuyển việc làm, nhận thông báo tức thì, quản lý CV và trò chuyện trực tiếp với nhà tuyển dụng - Bắt đầu ngay hôm nay!
              </p>

              <div className="appdl__features">
                {features.map((f) => (
                  <div key={f.label} className="appdl__feature">
                    <span className="appdl__feature-emoji">{f.icon}</span>
                    <span className="appdl__feature-label">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="appdl__stores">
                <Link href="#" className="store-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
                    <path d="M17.523 15.34l2.387-4.13a.5.5 0 00-.866-.5l-2.418 4.187a14.96 14.96 0 00-9.252 0L4.956 10.71a.5.5 0 10-.866.5l2.387 4.13A14.05 14.05 0 000 19.5h24a14.05 14.05 0 00-6.477-4.16zM6.5 18a1 1 0 110-2 1 1 0 010 2zm11 0a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  <div>
                    <p className="store-btn__label">Tải về trên</p>
                    <p className="store-btn__name">Google Play</p>
                  </div>
                </Link>
                <Link href="#" className="store-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div>
                    <p className="store-btn__label">Tải về trên</p>
                    <p className="store-btn__name">App Store</p>
                  </div>
                </Link>
              </div>

              <div className="appdl__rating">
                <div className="appdl__rating-item">
                  <Star size={14} className="star--on" />
                  <strong>4.9/5</strong>
                  <span>(120K đánh giá)</span>
                </div>
                <div className="appdl__rating-item">
                  <Download size={14} />
                  <strong>2M+</strong>
                  <span>lượt tải</span>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="appdl__visual">
              <div className="qr-card">
                <div className="qr-card__box">
                  <QrCode size={112} strokeWidth={1} />
                </div>
                <p className="qr-card__title">Quét để tải app</p>
                <p className="qr-card__sub">iOS & Android</p>
              </div>

              <div className="phone">
                <div className="phone__screen">
                  <div className="phone__notch" />
                  <div className="phone__content">
                    <div className="phone__topbar">
                      <div className="phone__brand">
                        <div className="phone__brand-logo u-gradient-primary" />
                        <span className="phone__brand-name">
                          Viec<span className="brand__name-accent">Pro</span>
                        </span>
                      </div>
                      <div className="phone__avatar" />
                    </div>
                    <div className="phone__hello">
                      <p className="phone__hello-sub">Xin chào 👋</p>
                      <p className="phone__hello-title">12 việc làm mới cho bạn</p>
                    </div>
                    {previewJobs.map((j, i) => (
                      <div key={i} className="phone__job">
                        <div className="phone__job-row">
                          <p className="phone__job-title">{j.c}</p>
                          <span className="phone__job-tag">{j.t}</span>
                        </div>
                        <p className="phone__job-salary">{j.s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
