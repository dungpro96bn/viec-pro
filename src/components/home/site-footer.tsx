import Link from "next/link";
import { Briefcase, Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { footerLinks } from "@/lib/home-data";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
  { icon: Instagram, label: "Instagram" },
];

const legalLinks = ["Điều khoản sử dụng", "Chính sách bảo mật", "Cookie"];

export function SiteFooter() {
  return (
    <footer className="footer">
      {/* Tầng trên (nền sáng): thương hiệu + cột link */}
      <div className="footer__top">
        <div className="u-container footer__grid">
          <div className="footer__brand-col">
            <Link href="/" className="footer__brand">
              <span className="brand__logo u-gradient-primary">
                <Briefcase size={20} strokeWidth={2.5} />
              </span>
              <span className="footer__brand-name">
                Viec<span className="brand__name-accent">Pro</span>
              </span>
            </Link>
            <p className="footer__desc">
              Nền tảng kết nối việc làm xuất khẩu lao động hàng đầu Việt Nam. Tìm đơn hàng uy tín tại Nhật Bản, Đài
              Loan, Châu Âu… hoặc tìm ứng viên phù hợp chỉ trong vài cú click.
            </p>
          </div>

          {footerLinks.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
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
            </nav>
          ))}
        </div>
      </div>

      {/* Tầng dưới (nền tối): liên hệ + mạng xã hội + bản quyền */}
      <div className="footer__bottom">
        <div className="u-container">
          <div className="footer__contact-row">
            <div className="footer__contacts">
              <a href="tel:19001234" className="footer__contact-card">
                <span className="footer__contact-icon">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="footer__contact-label">Hotline</span>
                  <span className="footer__contact-value">
                    1900 1234 <small>(Giờ hành chính)</small>
                  </span>
                </span>
              </a>
              <a href="mailto:hotro@viecpro.vn" className="footer__contact-card">
                <span className="footer__contact-icon">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="footer__contact-label">Email</span>
                  <span className="footer__contact-value">hotro@viecpro.vn</span>
                </span>
              </a>
            </div>

            <div className="footer__social">
              <span className="footer__social-label">Kết nối với ViecPro</span>
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="footer__social-link">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer__bottom-inner">
            <p>© 2026 ViecPro. Tất cả quyền được bảo lưu.</p>
            <nav className="footer__legal" aria-label="Pháp lý">
              {legalLinks.map((label) => (
                <Link key={label} href="#">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
