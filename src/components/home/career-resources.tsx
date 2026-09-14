"use client";

import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/home-data";

const categoryClass: Record<string, string> = {
  Trends: "cat-badge--trends",
  "CV Guide": "cat-badge--cv",
  Interview: "cat-badge--interview",
  Salary: "cat-badge--salary",
};

export function CareerResources() {
  const [featured, ...rest] = articles;

  return (
    <section id="blog" className="section section--tinted">
      <div className="u-container">
        <div className="section__head">
          <div style={{ maxWidth: "36rem" }}>
            <h2 className="section__title">
              Kiến thức & <span className="u-gradient-text">mẹo phát triển sự nghiệp</span>
            </h2>
          </div>
          <Link href="#" className="section__link">
            Xem tất cả bài viết
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="blog__grid">
          {/* Featured */}
          <Link href="#" className="blog-feat">
            <div className="blog-feat__media">
              <img src={featured.image} alt={featured.title} loading="lazy" />
            </div>
            <div className="blog-feat__overlay" />
            <div className="blog-feat__body">
              <span className={`cat-badge ${categoryClass[featured.category] ?? "cat-badge--trends"}`}>
                {featured.category}
              </span>
              <h3 className="blog-feat__title">{featured.title}</h3>
              <p className="blog-feat__excerpt">{featured.excerpt}</p>
              <div className="blog-feat__meta">
                <span style={{ fontWeight: 500 }}>{featured.author}</span>
                <span>•</span>
                <span>{featured.publishedAt}</span>
                <span>•</span>
                <span className="blog-feat__meta-item">
                  <Clock size={12} />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </Link>

          {/* Rest */}
          <div className="blog__list">
            {rest.map((article) => (
              <Link key={article.id} href="#" className="blog-card">
                <div className="blog-card__media">
                  <img src={article.image} alt={article.title} loading="lazy" />
                </div>
                <div className="blog-card__body">
                  <div>
                    <span className={`cat-badge ${categoryClass[article.category] ?? "cat-badge--trends"}`}>
                      {article.category}
                    </span>
                    <h3 className="blog-card__title">{article.title}</h3>
                    <p className="blog-card__excerpt">{article.excerpt}</p>
                  </div>
                  <div className="blog-card__meta">
                    <span style={{ fontWeight: 500 }}>{article.author}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span className="blog-feat__meta-item">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
