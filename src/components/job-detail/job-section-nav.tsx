"use client";

import { useEffect, useRef, useState } from "react";

export type SectionLink = { id: string; label: string };

/** Thanh mục lục dính dưới header, tự đánh dấu mục đang xem khi cuộn. */
export function JobSectionNav({ sections }: { sections: SectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Mục đang xem = mục cuối cùng có mép trên đã đi qua vạch 160px
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // Mobile: kéo tab đang active vào tầm nhìn của thanh cuộn ngang
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!list || !link) return;
    const offset = link.getBoundingClientRect().left - list.getBoundingClientRect().left;
    const left = list.scrollLeft + offset - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="jd-nav" aria-label="Mục lục đơn hàng">
      <div className="jobs-container">
        <ul ref={listRef} className="jd-nav__list">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={`jd-nav__link${active === id ? " jd-nav__link--active" : ""}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
