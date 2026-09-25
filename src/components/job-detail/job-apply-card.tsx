import { Clock, ShieldCheck, Send, Phone, MessageCircle, Check } from "lucide-react";
import { ApplyButton } from "@/components/job-detail/job-apply-modal";

/** Thẻ tóm tắt lương + nút ứng tuyển ở cột phải (mở popup ứng tuyển). */
export function JobApplyCard({
  salary,
  expected,
  expectedVnd,
  fee,
  deadline,
  phone,
}: {
  salary: string;
  expected: string;
  expectedVnd: string;
  fee: string;
  deadline?: string;
  phone: string;
}) {
  return (
    <section className="jd-card jd-apply" aria-label="Ứng tuyển đơn hàng">
      <div className="jd-apply__head">
        <p className="jd-apply__label">Lương cơ bản</p>
        <p className="jd-apply__salary">{salary}</p>
        <p className="jd-apply__expected">
          Thu nhập dự kiến <strong>{expected}</strong>
          <span>{expectedVnd}</span>
        </p>
        <div className="jd-apply__chips">
          <span className="jd-apply__chip jd-apply__chip--fee">
            <ShieldCheck size={12} />
            {fee}
          </span>
          <span className="jd-apply__chip">
            <Clock size={12} />
            {deadline ? `Hạn: ${deadline}` : "Tuyển liên tục"}
          </span>
        </div>
      </div>

      <div className="jd-apply__body">
        <ul className="jd-apply__points">
          <li>
            <Check size={14} />
            Đăng ký chỉ mất 30 giây
          </li>
          <li>
            <Check size={14} />
            Cán bộ gọi lại tư vấn trong 30 phút
          </li>
          <li>
            <Check size={14} />
            Không thu phí khi đăng ký
          </li>
        </ul>
        <ApplyButton className="btn btn--primary btn--lg btn--block">
          <Send size={16} />
          Ứng tuyển ngay
        </ApplyButton>
      </div>

      <div className="jd-apply__contact">
        <a href={`tel:${phone}`} className="btn btn--outline btn--md">
          <Phone size={16} />
          Gọi ngay
        </a>
        <a href={`https://zalo.me/${phone}`} target="_blank" rel="noreferrer" className="btn btn--outline btn--md">
          <MessageCircle size={16} />
          Chat Zalo
        </a>
      </div>
    </section>
  );
}
