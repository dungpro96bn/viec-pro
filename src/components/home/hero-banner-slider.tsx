"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroBanners } from "@/lib/home-data";

const AUTOPLAY_MS = 4000;
const BANNER_ASPECT_RATIO = `${heroBanners[0].width} / ${heroBanners[0].height}`;

export function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroBanners.length;

  const goTo = (idx: number) => setCurrent(((idx % count) + count) % count);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <div className="banner" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="banner__viewport">
        <div className="banner__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {heroBanners.map((banner) => (
            <div key={banner.id} className="banner__slide">
              <Link href={banner.href} className="banner__link" aria-label={banner.alt}>
                <div style={{ width: "100%", aspectRatio: BANNER_ASPECT_RATIO }}>
                  <img className="banner__img" src={banner.image} alt={banner.alt} loading="lazy" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="banner__arrow banner__arrow--prev" onClick={prev} aria-label="Slide trước">
        <ChevronLeft size={20} />
      </button>
      <button type="button" className="banner__arrow banner__arrow--next" onClick={next} aria-label="Slide sau">
        <ChevronRight size={20} />
      </button>

      <div className="banner__dots">
        {heroBanners.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`banner__dot${i === current ? " banner__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Đi tới slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
