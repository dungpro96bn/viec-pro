"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Flame, Sparkles, Images } from "lucide-react";

export function JobGallery({
  images,
  alt,
  tag,
  isHot,
  isNew,
}: {
  images: string[];
  alt: string;
  tag?: string;
  isHot?: boolean;
  isNew?: boolean;
}) {
  const [active, setActive] = useState(0);
  const go = (step: number) => setActive((i) => (i + step + images.length) % images.length);

  return (
    <div className="jd-gallery">
      <div className="jd-gallery__main">
        <img className="jd-gallery__img" src={images[active]} alt={`${alt} – ảnh ${active + 1}`} />
        <div className="jd-gallery__shade" />

        <div className="jd-gallery__badges">
          {tag && <span className="badge badge--tag">{tag}</span>}
          {isHot && (
            <span className="badge badge--hot">
              <Flame size={10} />
              HOT
            </span>
          )}
          {isNew && (
            <span className="badge badge--new">
              <Sparkles size={10} />
              MỚI
            </span>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button type="button" className="jd-gallery__arrow jd-gallery__arrow--prev" onClick={() => go(-1)} aria-label="Ảnh trước">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="jd-gallery__arrow jd-gallery__arrow--next" onClick={() => go(1)} aria-label="Ảnh sau">
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <span className="jd-gallery__counter">
          <Images size={12} />
          {active + 1}/{images.length}
        </span>
      </div>

      {images.length > 1 && (
        <div className="jd-gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`jd-gallery__thumb${i === active ? " jd-gallery__thumb--active" : ""}`}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-current={i === active}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
