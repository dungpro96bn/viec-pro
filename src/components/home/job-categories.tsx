"use client";

import Link from "next/link";
import {
  Code2,
  Megaphone,
  TrendingUp,
  Wallet,
  Users,
  Palette,
  Truck,
  HeartPulse,
  GraduationCap,
  Settings,
  UtensilsCrossed,
  Scale,
  ArrowRight,
} from "lucide-react";
import { categories } from "@/lib/home-data";

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Megaphone,
  TrendingUp,
  Wallet,
  Users,
  Palette,
  Truck,
  HeartPulse,
  GraduationCap,
  Settings,
  UtensilsCrossed,
  Scale,
};

export function JobCategories() {
  return (
    <section id="categories" className="section">
      <div className="u-container">
        <div className="section__head">
          <div style={{ maxWidth: "36rem" }}>
            <h2 className="section__title">
              Danh mục ngành nghề
            </h2>
          </div>
          <Link href="#" className="section__link">
            Xem tất cả ngành nghề
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="cats__grid">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <Link key={cat.id} href="#" className="cat-card">
                <div
                  className="cat-card__icon"
                  style={{ backgroundColor: `color-mix(in oklch, ${cat.color} 12%, transparent)` }}
                >
                  <Icon size={24} style={{ color: cat.color }} strokeWidth={2} />
                </div>
                <h3 className="cat-card__title">{cat.name}</h3>
                <div className="cat-card__meta">
                  <span className="cat-card__count">{cat.count.toLocaleString("vi-VN")} việc làm</span>
                  <ArrowRight size={14} className="cat-card__arrow" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="cats__cta">
          <p className="cats__cta-text">
            <strong>Không tìm thấy ngành nghề phù hợp?</strong> Xem tất cả 50+ danh mục việc làm khác.
          </p>
          <Link href="#" className="section__link">
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
