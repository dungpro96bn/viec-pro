"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  Stethoscope,
  Star,
  UserRoundCheck,
  X,
} from "lucide-react";
import { registrationLocations } from "@/lib/xkld-data";
import { Dropdown } from "@/components/common/dropdown";
import type { ApplyJobSummary } from "@/lib/job-details";

/** Hash dùng để mở popup từ link ngoài trang, VD card ở /viec-lam */
const APPLY_HASH = "#ung-tuyen";
const OPEN_EVENT = "jd:apply-open";

/** Nút mở popup ứng tuyển — đặt ở bất kỳ đâu trong trang chi tiết. */
export function ApplyButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  );
}

export type ApplyModalJob = ApplyJobSummary;

type Errors = Partial<Record<"name" | "phone" | "birthYear" | "consent", string>>;
type Status = "idle" | "submitting" | "success";

const currentYear = new Date().getFullYear();
const birthYears = Array.from({ length: 45 }, (_, i) => currentYear - 18 - i);
const areas = registrationLocations.filter((loc) => loc.value !== "all");

/**
 * Popup ứng tuyển. Bản demo: kiểm tra dữ liệu phía client, giả lập gửi
 * rồi hiển thị màn thành công — chưa gửi dữ liệu lên server.
 *
 * - Trang chi tiết: mở qua <ApplyButton> hoặc hash #ung-tuyen.
 * - Trang danh sách: mount khi người dùng bấm "Ứng tuyển" với `autoOpen`,
 *   và gỡ ra trong `onClosed`.
 */
export function JobApplyModal({
  job,
  autoOpen,
  onClosed: onClosedProp,
}: {
  job: ApplyModalJob;
  autoOpen?: boolean;
  onClosed?: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [applicant, setApplicant] = useState({ name: "", code: "" });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const open = () => {
      if (!dialog.open) dialog.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    if (autoOpen || window.location.hash === APPLY_HASH) open();
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, [autoOpen]);

  const close = () => dialogRef.current?.close();

  // Màn thành công luôn hiển thị từ đầu (panel và cột phải có thể đang cuộn)
  useEffect(() => {
    if (status !== "success") return;
    panelRef.current?.scrollTo({ top: 0 });
    panelRef.current?.querySelector(".jd-modal__main")?.scrollTo({ top: 0 });
  }, [status]);

  // Chạy cả khi đóng bằng phím Esc (sự kiện "close" của <dialog>)
  const onClosed = () => {
    if (window.location.hash === APPLY_HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (status === "success") {
      setStatus("idle");
      setErrors({});
    }
    onClosedProp?.();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/[\s.]/g, "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Vui lòng nhập họ và tên";
    if (!/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone)) next.phone = "Số điện thoại chưa đúng định dạng";
    if (!data.get("birthYear")) next.birthYear = "Vui lòng chọn năm sinh";
    if (!data.get("consent")) next.consent = "Bạn cần đồng ý để cán bộ liên hệ";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Chờ React render xong trạng thái lỗi rồi mới focus ô lỗi đầu tiên
      const form = event.currentTarget;
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid='true']")?.focus(),
      );
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setApplicant({ name, code: `VP-${Math.floor(100000 + Math.random() * 900000)}` });
      setStatus("success");
    }, 900);
  };

  return (
    <dialog
      ref={dialogRef}
      className="jd-modal"
      aria-labelledby="jd-modal-title"
      onClose={onClosed}
      onClick={(e) => e.target === dialogRef.current && close()}
    >
      <button type="button" className="jd-modal__close" onClick={close} aria-label="Đóng">
        <X size={18} />
      </button>
      <div ref={panelRef} className="jd-modal__panel">

        {/* -------------------- Cột trái: tóm tắt đơn -------------------- */}
        <aside className="jd-modal__side">
          <div className="jd-modal__job">
            <img src={job.image} alt="" className="jd-modal__thumb" />
            <div className="jd-modal__job-info">
              <p className="jd-modal__eyebrow">Bạn đang ứng tuyển</p>
              <p className="jd-modal__job-title">{job.title}</p>
              <p className="jd-modal__job-meta">
                <Building2 size={12} />
                {job.company}
              </p>
            </div>
          </div>

          <div className="jd-modal__pay">
            <div>
              <span>Lương cơ bản</span>
              <strong>{job.salary}</strong>
            </div>
            <div>
              <span>Thu nhập dự kiến</span>
              <strong>{job.expected}</strong>
            </div>
          </div>
          <div className="jd-modal__chips">
            <span className="jd-modal__chip jd-modal__chip--fee">
              <ShieldCheck size={12} />
              {job.fee}
            </span>
            <span className="jd-modal__chip">
              <img src={`/flags/${job.flagCode}.svg`} alt="" className="jd-flag" />
              {job.workplace}
            </span>
          </div>

          <ul className="jd-modal__perks">
            <li>
              <Clock size={16} />
              <span>
                <strong>Gọi lại trong 30 phút</strong>
                Trong giờ hành chính, kể cả thứ 7
              </span>
            </li>
            <li>
              <BadgeCheck size={16} />
              <span>
                <strong>Tư vấn hoàn toàn miễn phí</strong>
                Không thu bất kỳ khoản nào khi đăng ký
              </span>
            </li>
            <li>
              <Lock size={16} />
              <span>
                <strong>Bảo mật thông tin</strong>
                Chỉ cán bộ phụ trách đơn được xem hồ sơ
              </span>
            </li>
          </ul>

          <div className="jd-modal__consultant">
            <img src={job.consultant.avatar} alt="" />
            <div>
              <p>{job.consultant.name}</p>
              <span>{job.consultant.role}</span>
              <div className="jd-modal__stars" aria-label={`Đánh giá ${job.consultant.rating}/5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < job.consultant.rating ? "star star--on" : "star"} />
                ))}
                <em>{job.consultant.rating.toFixed(1)}</em>
              </div>
            </div>
            <a href={`tel:${job.consultant.phone}`} className="jd-modal__call" aria-label={`Gọi ${job.consultant.phone}`}>
              <PhoneCall size={16} />
            </a>
          </div>
        </aside>

        {/* ----------------------- Cột phải: form ----------------------- */}
        <div className="jd-modal__main">
          {status === "success" ? (
            <div className="jd-modal__success" role="status">
              <div className="jd-modal__success-icon">
                <CheckCircle2 size={36} />
              </div>
              <h2 id="jd-modal-title">Đã gửi hồ sơ thành công!</h2>
              <p>
                Cảm ơn <strong>{applicant.name}</strong>. Cán bộ <strong>{job.consultant.name}</strong> sẽ liên hệ với bạn sớm nhất.
              </p>
              <p className="jd-modal__code">
                Mã hồ sơ <strong>{applicant.code}</strong>
              </p>

              <ol className="jd-modal__next">
                <li>
                  <span className="jd-modal__next-icon">
                    <PhoneCall size={16} />
                  </span>
                  <div>
                    <strong>Cán bộ gọi điện xác nhận</strong>
                    <span>Trong vòng 30 phút</span>
                  </div>
                </li>
                <li>
                  <span className="jd-modal__next-icon">
                    <Stethoscope size={16} />
                  </span>
                  <div>
                    <strong>Tư vấn & hẹn lịch khám sức khỏe</strong>
                    <span>Chuẩn bị CCCD và ảnh 4x6</span>
                  </div>
                </li>
                <li>
                  <span className="jd-modal__next-icon">
                    <UserRoundCheck size={16} />
                  </span>
                  <div>
                    <strong>Phỏng vấn với chủ sử dụng</strong>
                    <span>Online hoặc trực tiếp</span>
                  </div>
                </li>
              </ol>

              <div className="jd-modal__success-actions">
                <a href={`https://zalo.me/${job.consultant.phone}`} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
                  <MessageCircle size={16} />
                  Nhắn Zalo ngay
                </a>
                {job.href ? (
                  <Link href={job.href} className="btn btn--outline btn--lg">
                    Xem chi tiết đơn
                  </Link>
                ) : (
                  <button type="button" className="btn btn--outline btn--lg" onClick={close}>
                    Tiếp tục xem đơn
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form
              className="jd-modal__form"
              onSubmit={onSubmit}
              onChange={(e) => {
                // Sửa ô nào thì ẩn lỗi của ô đó
                const field = (e.nativeEvent.target as HTMLInputElement).name as keyof Errors;
                if (errors[field]) setErrors(({ [field]: _removed, ...rest }) => rest);
              }}
              noValidate
            >
              <header className="jd-modal__head">
                <h2 id="jd-modal-title">Ứng tuyển nhanh</h2>
                <p>Chỉ mất 30 giây. Cán bộ tuyển dụng sẽ gọi lại tư vấn chi tiết.</p>
              </header>

              <ModalField label="Họ và tên" required error={errors.name} id="jd-f-name">
                <input
                  id="jd-f-name"
                  name="name"
                  className="jd-input"
                  placeholder="VD: Nguyễn Thị Lan"
                  autoComplete="name"
                  autoFocus
                  aria-invalid={!!errors.name}
                />
              </ModalField>

              <ModalField label="Số điện thoại / Zalo" required error={errors.phone} id="jd-f-phone">
                <input
                  id="jd-f-phone"
                  name="phone"
                  className="jd-input"
                  placeholder="09xx xxx xxx"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                />
              </ModalField>

              <div className="jd-modal__grid">
                <ModalField label="Năm sinh" required error={errors.birthYear} id="jd-f-year">
                  <Dropdown
                    id="jd-f-year"
                    name="birthYear"
                    className="jd-input jd-input--select"
                    placeholder="Chọn năm sinh"
                    searchPlaceholder="Gõ năm sinh..."
                    invalid={!!errors.birthYear}
                    onChange={() => errors.birthYear && setErrors(({ birthYear: _removed, ...rest }) => rest)}
                    options={birthYears.map((year) => ({ value: String(year), label: String(year) }))}
                  />
                </ModalField>
                <ModalField label="Khu vực" id="jd-f-area">
                  <Dropdown id="jd-f-area" name="area" className="jd-input jd-input--select" defaultValue="hanoi" options={areas} />
                </ModalField>
              </div>

              <fieldset className="jd-segment">
                <legend className="jd-field__label">Giới tính</legend>
                <div className="jd-segment__options">
                  {["Nữ", "Nam"].map((gender, i) => (
                    <label key={gender} className="jd-segment__option">
                      <input type="radio" name="gender" value={gender} defaultChecked={i === 0} />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <ModalField label="Ghi chú" hint="Không bắt buộc" id="jd-f-note">
                <textarea
                  id="jd-f-note"
                  name="note"
                  className="jd-input jd-input--area"
                  rows={2}
                  placeholder="VD: Đã có hộ chiếu, muốn được gọi sau 18h..."
                />
              </ModalField>

              <label className={`jd-consent${errors.consent ? " jd-consent--error" : ""}`}>
                <input type="checkbox" name="consent" defaultChecked aria-invalid={!!errors.consent} />
                <span>
                  Tôi đồng ý để ViecPro và cán bộ tuyển dụng liên hệ tư vấn về đơn hàng này.
                  {errors.consent && <em>{errors.consent}</em>}
                </span>
              </label>

              <button type="submit" className="btn btn--primary btn--lg btn--block jd-modal__submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="jd-spin" />
                    Đang gửi hồ sơ...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Gửi hồ sơ ứng tuyển
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

function ModalField({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="jd-field">
      <label htmlFor={id} className="jd-field__label">
        {label}
        {required && <span className="jd-field__req">*</span>}
        {hint && <span className="jd-field__hint">{hint}</span>}
      </label>
      {children}
      {error && <span className="jd-field__error">{error}</span>}
    </div>
  );
}
