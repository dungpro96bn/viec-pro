"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Menu, X, Phone } from "lucide-react";
import { mainNav } from "@/lib/home-data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="site-header__topbar">
        <div className="topbar__inner">
          <div className="topbar__group">
            <a href="#" className="topbar__link">
              <Phone size={12} />
              Hotline: 1900 1234
            </a>
            <a href="#" className="topbar__link">Hỗ trợ nhà tuyển dụng</a>
            <a href="#" className="topbar__link">ViecPro cho doanh nghiệp</a>
          </div>
          <div className="topbar__group">
            <a href="#" className="topbar__link">Trung tâm trợ giúp</a>
            <span className="topbar__sep">|</span>
            <a href="#" className="topbar__link">Tiếng Việt</a>
            <a href="#" className="topbar__link topbar__link--dim">English</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="header__inner">
          <div className="header__left">
            <Link href="/" className="brand">
              <div className="brand__logo u-gradient-primary">
                <Briefcase size={20} strokeWidth={2.5} />
              </div>
              <span className="brand__name">
                Viec<span className="brand__name-accent">Pro</span>
              </span>
            </Link>

            <nav className="nav">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="nav__link">
                  {item.label}
                  {item.badge && <span className="nav__badge">{item.badge}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="header__actions">
            <div className="header__actions-desktop">
              <Link href="#" className="btn btn--primary-outline btn--sm">Đăng nhập</Link>
              <Link href="#" className="btn btn--primary btn--sm">Đăng ký miễn phí</Link>
              <Link href="#" className="btn btn--primary-outline btn--sm">
                Nhà tuyển dụng
              </Link>
            </div>

            <button
              type="button"
              className="btn btn--ghost btn--icon header__menu-btn"
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div className={`mobile-menu${mobileOpen ? " mobile-menu--open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__panel" role="dialog" aria-label="Menu">
          <div className="mobile-menu__header">
            <div className="brand__logo u-gradient-primary" style={{ width: 36, height: 36 }}>
              <Briefcase size={16} strokeWidth={2.5} />
            </div>
            <span className="brand__name">
              Viec<span className="brand__name-accent">Pro</span>
            </span>
            <button
              type="button"
              className="btn btn--ghost btn--icon"
              aria-label="Đóng"
              style={{ marginLeft: "auto" }}
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="mobile-menu__list">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="mobile-menu__link"
              >
                {item.label}
                {item.badge && <span className="nav__badge">{item.badge}</span>}
              </Link>
            ))}
            <div className="mobile-menu__divider" />
            <Link href="#" className="btn btn--outline btn--md" style={{ justifyContent: "flex-start" }}>
              Đăng nhập
            </Link>
            <Link href="#" className="btn btn--primary btn--md" style={{ justifyContent: "flex-start" }}>
              Đăng ký miễn phí
            </Link>
            <Link href="#" className="btn btn--ghost btn--md" style={{ justifyContent: "flex-start", color: "var(--primary-text)" }}>
              Dành cho nhà tuyển dụng
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
