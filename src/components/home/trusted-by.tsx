"use client";

import { trustedByLogos } from "@/lib/home-data";
import { Building2 } from "lucide-react";

export function TrustedBy() {
  const logos = [...trustedByLogos, ...trustedByLogos];

  return (
    <section className="trusted">
      <div className="u-container trusted__head">
        <div className="trusted__badge">
          <div className="trusted__badge-icon">
            <Building2 size={16} />
          </div>
          <p className="trusted__label">Được tin dùng bởi hơn</p>
        </div>
        <p className="trusted__count">10,000+ doanh nghiệp hàng đầu Việt Nam</p>
      </div>

      <div className="trusted__viewport">
        <div className="trusted__fade trusted__fade--left" />
        <div className="trusted__fade trusted__fade--right" />
        <div className="trusted__track">
          {logos.map((logo, i) => (
            <div key={i} className="trusted__logo">
              <img
                src={logo}
                alt="Logo công ty"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
