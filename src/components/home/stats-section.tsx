"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, Users, TrendingUp } from "lucide-react";
import { stats } from "@/lib/home-data";

const iconMap: Record<string, typeof Briefcase> = {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function StatCounter({
  value,
  suffix,
  visible,
}: {
  value: number;
  suffix: string;
  visible: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) return;
    let startTime: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, visible]);

  return (
    <span>
      {formatNumber(display)}
      <span className="stat__value-suffix">{suffix}</span>
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="stats">
      <div className="u-container">
        <div className="stats__card">
          <div className="stats__grid">
            {stats.map((stat, i) => {
              const Icon = iconMap[stat.icon] ?? Briefcase;
              return (
                <div key={i} className="stat">
                  <div className="stat__icon">
                    <Icon size={24} />
                  </div>
                  <p className="stat__value">
                    <StatCounter value={stat.value} suffix={stat.suffix} visible={visible} />
                  </p>
                  <p className="stat__label">{stat.label}</p>
                  <span className="u-sr-only">
                    {stat.value}
                    {stat.suffix}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
