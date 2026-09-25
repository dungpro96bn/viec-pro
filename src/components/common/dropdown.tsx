"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type DropdownOption = {
  value: string;
  label: string;
  /** Thông tin phụ hiển thị bên phải, VD số đơn hàng */
  meta?: string;
  /** Icon bên trái nhãn, VD cờ quốc gia; cũng hiện trên trigger khi được chọn */
  icon?: ReactNode;
  disabled?: boolean;
};

export type DropdownGroup = { label: string; options: DropdownOption[] };

type Item = DropdownOption & { group?: string };

/** Bỏ dấu tiếng Việt để tìm "da nang" ra "Đà Nẵng" */
const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();

/**
 * Dropdown thay cho <select> native (danh sách <option> không style được).
 *
 * - Controlled (`value` + `onChange`) hoặc uncontrolled (`defaultValue`).
 * - `name` tạo <input type="hidden"> để dùng được với FormData.
 * - `className` gắn lên nút trigger, nên dùng lại được class ô nhập sẵn có
 *   (VD "hselect", "jd-input") để giữ nguyên kích thước & khoảng cách icon.
 * - Panel dùng position: fixed để không bị cắt bởi khung có overflow (popup, card).
 */
export function Dropdown({
  options,
  groups,
  value,
  defaultValue,
  onChange,
  placeholder = "Chọn",
  className = "",
  name,
  id,
  searchable,
  searchPlaceholder = "Tìm nhanh...",
  "aria-label": ariaLabel,
  invalid: ariaInvalid,
}: {
  options?: DropdownOption[];
  groups?: DropdownGroup[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  /** Mặc định bật khi có hơn 10 lựa chọn */
  searchable?: boolean;
  searchPlaceholder?: string;
  "aria-label"?: string;
  /** Đánh dấu lỗi (viền đỏ); button không hỗ trợ aria-invalid */
  invalid?: boolean;
}) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [inner, setInner] = useState(defaultValue ?? "");
  const current = value ?? inner;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const typeahead = useRef({ text: "", timer: 0 });

  const allItems: Item[] = useMemo(
    () => (groups ? groups.flatMap((g) => g.options.map((o) => ({ ...o, group: g.label }))) : (options ?? [])),
    [groups, options],
  );
  const canSearch = searchable ?? allItems.length > 10;
  const items = useMemo(() => {
    const q = normalize(query.trim());
    return q ? allItems.filter((item) => normalize(item.label).includes(q)) : allItems;
  }, [allItems, query]);
  const selected = allItems.find((item) => item.value === current);

  const place = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width, 220), window.innerWidth - 16);
    // Trigger ở nửa phải màn hình -> căn panel theo mép phải của trigger
    const start = rect.left > window.innerWidth / 2 ? rect.right - width : rect.left;
    const left = Math.min(Math.max(start, 8), window.innerWidth - width - 8);
    const below = window.innerHeight - rect.bottom;
    const upward = below < 300 && rect.top > below;
    setPanelStyle(
      upward
        ? { left, width, bottom: window.innerHeight - rect.top + 6, maxHeight: rect.top - 16 }
        : { left, width, top: rect.bottom + 6, maxHeight: below - 16 },
    );
  };

  const openPanel = () => {
    place();
    setQuery("");
    setActive(Math.max(0, allItems.findIndex((item) => item.value === current)));
    setOpen(true);
  };

  const close = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const choose = (item: Item | undefined) => {
    if (!item || item.disabled) return;
    if (value === undefined) setInner(item.value);
    if (item.value !== current) onChange?.(item.value);
    close();
  };

  // Focus + giữ vị trí panel khi cuộn / đổi kích thước; đóng khi bấm ra ngoài
  useEffect(() => {
    if (!open) return;
    (canSearch ? searchRef.current : listRef.current)?.focus();
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close(false);
    };
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Giữ lựa chọn đang active trong tầm nhìn
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const move = (step: number) => {
    if (items.length === 0) return;
    let next = active;
    for (let i = 0; i < items.length; i++) {
      next = (next + step + items.length) % items.length;
      if (!items[next].disabled) break;
    }
    setActive(next);
  };

  const onPanelKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(items.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        choose(items[active]);
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation(); // không đóng luôn <dialog> chứa dropdown
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        // Gõ chữ để nhảy tới lựa chọn (khi không có ô tìm kiếm)
        if (!canSearch && e.key.length === 1) {
          const t = typeahead.current;
          window.clearTimeout(t.timer);
          t.text += normalize(e.key);
          t.timer = window.setTimeout(() => (t.text = ""), 600);
          const hit = items.findIndex((item) => normalize(item.label).startsWith(t.text));
          if (hit >= 0) setActive(hit);
        }
    }
  };

  const onTriggerKey = (e: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openPanel();
    }
  };

  return (
    <div ref={wrapRef} className={`dd${open ? " dd--open" : ""}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`dd__trigger ${className}`}
        onClick={() => (open ? close() : openPanel())}
        onKeyDown={onTriggerKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        data-invalid={ariaInvalid || undefined}
      >
        {selected?.icon && <span className="dd__icon">{selected.icon}</span>}
        <span className={`dd__value${selected ? "" : " dd__value--placeholder"}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown size={16} className="dd__chevron" aria-hidden />
      </button>
      {name && <input type="hidden" name={name} value={current} />}

      {open && (
        <div className="dd__panel" style={panelStyle} onKeyDown={onPanelKey}>
          {canSearch && (
            <div className="dd__search">
              <Search size={14} />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-controls={listId}
                aria-activedescendant={items[active] ? `${listId}-${active}` : undefined}
              />
            </div>
          )}
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            className="dd__list"
            aria-label={ariaLabel}
            aria-activedescendant={items[active] ? `${listId}-${active}` : undefined}
          >
            {items.length === 0 && <li className="dd__empty">Không tìm thấy kết quả</li>}
            {items.map((item, index) => {
              const header = item.group && item.group !== items[index - 1]?.group ? item.group : undefined;
              const isSelected = item.value === current;
              return [
                header && (
                  <li key={`g-${header}`} role="presentation" className="dd__group">
                    {header}
                  </li>
                ),
                <li
                  key={item.value}
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={item.disabled}
                  className={`dd__option${index === active ? " dd__option--active" : ""}${isSelected ? " dd__option--selected" : ""}`}
                  onPointerMove={() => !item.disabled && setActive(index)}
                  onClick={() => choose(item)}
                >
                  {item.icon && <span className="dd__icon">{item.icon}</span>}
                  <span className="dd__label">{item.label}</span>
                  {item.meta && <span className="dd__meta">{item.meta}</span>}
                  <Check size={14} className="dd__check" aria-hidden />
                </li>,
              ];
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
