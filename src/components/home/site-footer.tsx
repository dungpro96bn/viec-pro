"use client";

import Link from "next/link";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Youtube,
  Send,
  ShieldCheck,
  Award,
  Headphones,
} from "lucide-react";
import { footerLinks } from "@/lib/home-data";

const trustBadges = [
  { icon: ShieldCheck, title: "Bảo mật & An toàn", desc: "Thông tin được mã hóa, xác thực 2 lớp" },
  { icon: Award, title: "Chất lượng hàng đầu", desc: "Top 1 sàn tuyển dụng Việt Nam 2026" },
  { icon: Headphones, title: "Hỗ trợ 24/7", desc: "Đội ngũ CSKH tận tình, sẵn sàng hỗ trợ" },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
  { icon: Send, label: "Telegram" },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      {/* Trust badges */}
      <div className="footer__trust">
        <div className="u-container footer__trust-grid">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="trust-item">
                <div className="trust-item__icon">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="trust-item__title">{badge.title}</p>
                  <p className="trust-item__desc">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main footer */}
      <div className="u-container footer__main">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <Link href="/" className="footer__brand">
              <div className="brand__logo u-gradient-primary">
                <Briefcase size={20} strokeWidth={2.5} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="footer__brand-name">
                  Viec<span className="brand__name-accent">Pro</span>
                </span>
              </div>
            </Link>
            <p className="footer__desc">
              ViecPro là nền tảng tuyển dụng việc làm hàng đầu Việt Nam, kết nối hàng triệu ứng
              viên với hàng nghìn doanh nghiệp uy tín thông qua công nghệ AI tiên tiến.
            </p>

            <ul className="footer__contact">
              <li className="footer__contact-item">
                <MapPin size={16} />
                <span>Tầng 12, Toà nhà ABC, 123 Nguyễn Trãi, Thanh Xuân, Hà Nội</span>
              </li>
              <li className="footer__contact-item">
                <Phone size={16} />
                <a href="tel:19001234">1900 1234</a>
                <span className="topbar__sep">|</span>
                <a href="mailto:hello@viecpro.vn">hello@viecpro.vn</a>
              </li>
            </ul>

            <div className="footer__social">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href="#" aria-label={s.label} className="footer__social-link">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <div className="newsletter">
            <div>
              <h4 className="newsletter__title">Đăng ký nhận tin việc làm</h4>
              <p className="newsletter__text">
                Nhận thông báo việc làm mới và cẩm nang nghề nghiệp qua email mỗi tuần.
              </p>
            </div>
            <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
              <div className="newsletter__field">
                <Mail size={16} />
                <input type="email" placeholder="Email của bạn" className="newsletter__input" />
              </div>
              <button type="submit" className="btn btn--primary btn--md">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <div className="u-container footer__bottom-inner">
          <p>© 2026 ViecPro. Bảo lưu mọi quyền. Giấy phép MXH số 123/GP-BTTTT.</p>
          <div className="footer__legal">
            <Link href="#">Điều khoản</Link>
            <Link href="#">Bảo mật</Link>
            <Link href="#">Cookie</Link>
            <Link href="#">Sơ đồ site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
