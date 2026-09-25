"use client";

import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";

export const THEME_STORAGE_KEY = "viecpro-theme";

const themes = [
  { id: "blue", label: "Giao diện xanh" },
  { id: "gold", label: "Giao diện vàng" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

/**
 * Script chạy trước khi trang render để gắn data-theme đã lưu,
 * tránh nháy màu xanh -> vàng khi tải lại trang.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="gold")document.documentElement.dataset.theme=t}catch(e){}`;

// Theme hiện tại = thuộc tính data-theme trên <html> (script khởi tạo đã gắn sẵn)
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const getTheme = (): ThemeId => (document.documentElement.dataset.theme === "gold" ? "gold" : "blue");
const getServerTheme = (): ThemeId => "blue";

/** Gắn theme lên <html> và lưu lại cho lần sau */
function applyTheme(next: ThemeId) {
  const root = document.documentElement;
  if (next === "blue") delete root.dataset.theme;
  else root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Trình duyệt chặn lưu trữ: vẫn đổi được theme trong phiên hiện tại
  }
}

/** 2 nút tròn ở góc dưới phải để đổi màu giao diện. */
export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  return (
    <div className="theme-switch" role="group" aria-label="Chọn màu giao diện">
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`theme-switch__btn theme-switch__btn--${t.id}${theme === t.id ? " theme-switch__btn--active" : ""}`}
          onClick={() => applyTheme(t.id)}
          aria-label={t.label}
          aria-pressed={theme === t.id}
          title={t.label}
        >
          {theme === t.id && <Check size={16} strokeWidth={3} />}
        </button>
      ))}
    </div>
  );
}
