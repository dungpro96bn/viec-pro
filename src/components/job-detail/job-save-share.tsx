"use client";

import { useState } from "react";
import { Heart, Share2, Check } from "lucide-react";

export function JobSaveShare({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Người dùng đóng hộp thoại chia sẻ
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        className={`btn btn--outline btn--md btn--icon-lg jd-save${saved ? " jd-save--active" : ""}`}
        aria-label={saved ? "Bỏ lưu đơn hàng" : "Lưu đơn hàng"}
        aria-pressed={saved}
      >
        <Heart size={18} />
      </button>
      <button type="button" onClick={share} className="btn btn--outline btn--md btn--icon-lg" aria-label="Chia sẻ đơn hàng">
        {copied ? <Check size={18} /> : <Share2 size={18} />}
      </button>
      <span className="u-sr-only" aria-live="polite">
        {copied ? "Đã sao chép liên kết" : ""}
      </span>
    </>
  );
}
