/** Cờ quốc gia từ /public/flags/{code}.svg; không có mã thì hiện icon quả địa cầu. */
import { Globe2 } from "lucide-react";

export function CountryFlag({ code }: { code?: string }) {
  if (!code) return <Globe2 size={14} className="flag flag--none" aria-hidden />;
  return <img src={`/flags/${code}.svg`} alt="" className="flag" loading="lazy" />;
}
