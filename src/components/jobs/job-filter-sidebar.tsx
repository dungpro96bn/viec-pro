"use client";

import { Children, useMemo, useState } from "react";
import { SlidersHorizontal, X, RotateCcw, ChevronDown } from "lucide-react";
import { countries, salaryRanges, type XkldJob } from "@/lib/xkld-data";
import { CountryFlag } from "@/components/common/country-flag";

/** Số lựa chọn hiện sẵn trong mỗi nhóm; nhiều hơn thì có nút "Xem thêm" */
const VISIBLE_LIMIT = 10;

const flagByCountry = Object.fromEntries(countries.map((c) => [c.name, c.flagCode]));

export type JobFilters = {
  countries: string[];
  industries: string[];
  fees: string[];
  genders: string[];
  salary: string;
  continuousOnly: boolean;
};

export const emptyFilters: JobFilters = {
  countries: [],
  industries: [],
  fees: [],
  genders: [],
  salary: "all",
  continuousOnly: false,
};

export function countActiveFilters(f: JobFilters): number {
  return (
    f.countries.length +
    f.industries.length +
    f.fees.length +
    f.genders.length +
    (f.salary !== "all" ? 1 : 0) +
    (f.continuousOnly ? 1 : 0)
  );
}

function facetCounts(jobs: XkldJob[], key: (j: XkldJob) => string) {
  const map = new Map<string, number>();
  for (const j of jobs) {
    const v = key(j);
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

type Chip = { key: string; label: string; onRemove: () => void };

/** Flatten every active selection into a flat list of removable chips. */
export function getActiveChips(
  filters: JobFilters,
  onChange: (next: JobFilters) => void
): Chip[] {
  return [
    ...filters.countries.map((c) => ({
      key: `country-${c}`,
      label: c,
      onRemove: () =>
        onChange({ ...filters, countries: filters.countries.filter((x) => x !== c) }),
    })),
    ...filters.industries.map((i) => ({
      key: `industry-${i}`,
      label: i,
      onRemove: () =>
        onChange({ ...filters, industries: filters.industries.filter((x) => x !== i) }),
    })),
    ...filters.fees.map((f) => ({
      key: `fee-${f}`,
      label: f,
      onRemove: () => onChange({ ...filters, fees: filters.fees.filter((x) => x !== f) }),
    })),
    ...filters.genders.map((g) => ({
      key: `gender-${g}`,
      label: g,
      onRemove: () =>
        onChange({ ...filters, genders: filters.genders.filter((x) => x !== g) }),
    })),
    ...(filters.salary !== "all"
      ? [
          {
            key: "salary",
            label: salaryRanges.find((s) => s.value === filters.salary)?.label ?? "Mức lương",
            onRemove: () => onChange({ ...filters, salary: "all" }),
          },
        ]
      : []),
    ...(filters.continuousOnly
      ? [
          {
            key: "continuous",
            label: "Tuyển liên tục",
            onRemove: () => onChange({ ...filters, continuousOnly: false }),
          },
        ]
      : []),
  ];
}

/** Row of removable chips for the currently active filters. */
export function ActiveFilterChips({
  filters,
  onChange,
  className,
}: {
  filters: JobFilters;
  onChange: (next: JobFilters) => void;
  className?: string;
}) {
  const chips = getActiveChips(filters, onChange);
  if (chips.length === 0) return null;

  return (
    <div className={`chips${className ? ` ${className}` : ""}`}>
      {chips.map((chip) => (
        <span key={chip.key} className="chip">
          <span className="chip__label">{chip.label}</span>
          <button
            type="button"
            className="chip__remove"
            onClick={chip.onRemove}
            aria-label={`Bỏ lọc ${chip.label}`}
          >
            <X size={12} />
          </button>
        </span>
      ))}
    </div>
  );
}

export function JobFilterSidebar({
  jobs,
  filters,
  onChange,
  onReset,
}: {
  jobs: XkldJob[];
  filters: JobFilters;
  onChange: (next: JobFilters) => void;
  onReset: () => void;
}) {
  // Liệt kê đủ mọi quốc gia; nước có nhiều đơn lên trước (sort ổn định giữ thứ tự gốc)
  const countryFacets = useMemo(() => {
    const counts = new Map(facetCounts(jobs, (j) => j.country).map((f) => [f.value, f.count]));
    const names = [...countries.map((c) => c.name), ...[...counts.keys()].filter((n) => !countries.some((c) => c.name === n))];
    return names.map((value) => ({ value, count: counts.get(value) ?? 0 })).sort((a, b) => b.count - a.count);
  }, [jobs]);
  const industryFacets = useMemo(() => facetCounts(jobs, (j) => j.industry), [jobs]);
  const feeFacets = useMemo(() => facetCounts(jobs, (j) => j.fee), [jobs]);
  const genderFacets = useMemo(() => facetCounts(jobs, (j) => j.gender), [jobs]);

  const activeCount = countActiveFilters(filters);
  const activeChips = getActiveChips(filters, onChange);

  const toggleIn = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  return (
    <div className="filter">
      {/* Header */}
      <div className="filter__header">
        <div className="filter__title-wrap">
          <SlidersHorizontal size={16} color="var(--primary-text)" />
          <h2 className="filter__title">Bộ lọc</h2>
          {activeCount > 0 && <span className="badge badge--count">{activeCount}</span>}
        </div>
        <button type="button" className="filter__reset" onClick={onReset} disabled={activeCount === 0}>
          <RotateCcw size={12} />
          Đặt lại
        </button>
      </div>

      {/* Chip đang lọc */}
      {activeChips.length > 0 && (
        <div className="filter__chips">
          <ActiveFilterChips filters={filters} onChange={onChange} />
        </div>
      )}

      {/* Thân cuộn */}
      <div className="filter__body">
        <FilterSection label="Quốc gia / Chương trình" defaultOpen>
          {countryFacets.map((f) => (
            <CheckboxRow
              key={f.value}
              label={f.value}
              icon={<CountryFlag code={flagByCountry[f.value]} />}
              count={f.count}
              checked={filters.countries.includes(f.value)}
              onChange={() => onChange({ ...filters, countries: toggleIn(filters.countries, f.value) })}
            />
          ))}
        </FilterSection>

        <FilterSection label="Ngành nghề" defaultOpen>
          {industryFacets.map((f) => (
            <CheckboxRow
              key={f.value}
              label={f.value}
              count={f.count}
              checked={filters.industries.includes(f.value)}
              onChange={() => onChange({ ...filters, industries: toggleIn(filters.industries, f.value) })}
            />
          ))}
        </FilterSection>

        <FilterSection label="Mức lương (quy đổi USD)" defaultOpen>
          {salaryRanges.map((s) => (
            <label key={s.value} className="filter-option">
              <input
                type="radio"
                name="jobs-salary"
                className="filter-option__control"
                value={s.value}
                checked={filters.salary === s.value}
                onChange={() => onChange({ ...filters, salary: s.value })}
              />
              <span className="filter-option__label">{s.label}</span>
            </label>
          ))}
        </FilterSection>

        <FilterSection label="Loại phí" defaultOpen>
          {feeFacets.map((f) => (
            <CheckboxRow
              key={f.value}
              label={f.value}
              count={f.count}
              checked={filters.fees.includes(f.value)}
              onChange={() => onChange({ ...filters, fees: toggleIn(filters.fees, f.value) })}
            />
          ))}
        </FilterSection>

        <FilterSection label="Giới tính" defaultOpen>
          {genderFacets.map((f) => (
            <CheckboxRow
              key={f.value}
              label={f.value}
              count={f.count}
              checked={filters.genders.includes(f.value)}
              onChange={() => onChange({ ...filters, genders: toggleIn(filters.genders, f.value) })}
            />
          ))}
        </FilterSection>

        <FilterSection label="Hình thức tuyển" defaultOpen>
          <CheckboxRow
            label="Chỉ đơn tuyển liên tục"
            checked={filters.continuousOnly}
            onChange={() => onChange({ ...filters, continuousOnly: !filters.continuousOnly })}
          />
        </FilterSection>
      </div>

      {/* Footer */}
      {activeCount > 0 && (
        <div className="filter__footer">
          <button type="button" className="btn btn--outline btn--sm btn--block" onClick={onReset}>
            <X size={14} />
            Xóa tất cả bộ lọc ({activeCount})
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSection({
  label,
  defaultOpen,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hidden = items.length - VISIBLE_LIMIT;

  return (
    <details className="filter-section" open={defaultOpen}>
      <summary className="filter-section__summary">
        {label}
        <span className="filter-section__chevron">
          <ChevronDown size={16} />
        </span>
      </summary>
      <div className="filter-section__content">
        {expanded || hidden <= 0 ? items : items.slice(0, VISIBLE_LIMIT)}
        {hidden > 0 && (
          <button type="button" className="filter-more" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? "Thu gọn" : `Xem thêm ${hidden} lựa chọn`}
            <ChevronDown size={14} className={expanded ? "filter-more__icon--up" : undefined} />
          </button>
        )}
      </div>
    </details>
  );
}

function CheckboxRow({
  label,
  icon,
  count,
  checked,
  onChange,
}: {
  label: string;
  icon?: React.ReactNode;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="filter-option">
      <input type="checkbox" className="filter-option__control" checked={checked} onChange={onChange} />
      {icon && <span className="filter-option__icon">{icon}</span>}
      <span className="filter-option__label">{label}</span>
      {typeof count === "number" && <span className="filter-option__count">{count}</span>}
    </label>
  );
}
