"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Globe2,
  Factory,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  SearchX,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
} from "lucide-react";
import { buildJobDataset, countries, sortOptions, type Country, type XkldJob } from "@/lib/xkld-data";
import { JobListCard } from "@/components/jobs/job-list-card";
import { JobApplyModal } from "@/components/job-detail/job-apply-modal";
import { toApplySummary } from "@/lib/job-details";
import { Dropdown } from "@/components/common/dropdown";
import { CountryFlag } from "@/components/common/country-flag";
import {
  JobFilterSidebar,
  ActiveFilterChips,
  emptyFilters,
  countActiveFilters,
  type JobFilters,
} from "@/components/jobs/job-filter-sidebar";

const PAGE_SIZE = 20;

function matchSalary(usd: number, range: string): boolean {
  switch (range) {
    case "0-500":
      return usd < 500;
    case "500-1000":
      return usd >= 500 && usd < 1000;
    case "1000-2000":
      return usd >= 1000 && usd < 2000;
    case "2000-3000":
      return usd >= 2000 && usd < 3000;
    case "3000+":
      return usd >= 3000;
    default:
      return true;
  }
}

const regions: { key: Country["region"]; label: string }[] = [
  { key: "asia", label: "Châu Á" },
  { key: "europe", label: "Châu Âu" },
  { key: "middle-east", label: "Trung Đông & Bắc Phi" },
  { key: "other", label: "Khác" },
];

/** Giá trị cho dropdown 1 lựa chọn khi sidebar cho chọn nhiều: nhiều mục -> "" (hiện placeholder "N mục") */
const pickValue = (arr: string[]) => (arr.length === 0 ? "all" : arr.length === 1 ? arr[0] : "");


const feeOrder: Record<XkldJob["fee"], number> = {
  "Miễn phí": 0,
  "Phí thấp": 1,
  "Phí vừa": 2,
};

/** Build the page-number sequence with ellipsis for the pagination control. */
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "ellipsis")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) items.push("ellipsis");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

export function JobsExplorer() {
  const allJobs = useMemo(() => buildJobDataset(), []);

  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<JobFilters>(emptyFilters);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<XkldJob | null>(null);
  const listTopRef = useRef<HTMLDivElement>(null);

  const countryJobCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const j of allJobs) map.set(j.country, (map.get(j.country) ?? 0) + 1);
    return map;
  }, [allJobs]);
  const industryOptions = useMemo(
    () => Array.from(new Set(allJobs.map((j) => j.industry))),
    [allJobs]
  );

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    const result = allJobs.filter((j) => {
      if (k) {
        const haystack = `${j.title} ${j.employer} ${j.industry} ${j.country}`.toLowerCase();
        if (!haystack.includes(k)) return false;
      }
      if (filters.countries.length && !filters.countries.includes(j.country)) return false;
      if (filters.industries.length && !filters.industries.includes(j.industry)) return false;
      if (filters.fees.length && !filters.fees.includes(j.fee)) return false;
      if (filters.genders.length && !filters.genders.includes(j.gender)) return false;
      if (!matchSalary(j.salaryUsd, filters.salary)) return false;
      if (filters.continuousOnly && j.recruitmentType !== "Liên tục") return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "salary_desc":
          return b.salaryUsd - a.salaryUsd;
        case "fee_asc":
          return feeOrder[a.fee] - feeOrder[b.fee] || b.salaryUsd - a.salaryUsd;
        case "match":
          return Number(b.isHot ?? false) - Number(a.isHot ?? false) || b.views - a.views;
        case "newest":
        default:
          return b.id - a.id;
      }
    });
    return result;
  }, [allJobs, keyword, filters, sort]);

  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const toggleSave = (id: number) =>
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const resetFilters = () => {
    setFilters(emptyFilters);
    setKeyword("");
  };

  useEffect(() => {
    setPage(1);
  }, [keyword, filters, sort]);

  // Drawer mobile: khóa cuộn trang nền, Esc để đóng
  useEffect(() => {
    if (!mobileFilterOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileFilterOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileFilterOpen]);

  const activeCount = countActiveFilters(filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageJobs = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const rangeTo = Math.min(startIndex + PAGE_SIZE, filtered.length);

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="jobs-page">
      {/* ============= TOP: SEARCH ============= */}
      <section className="jobs-search">
        <div className="jobs-search__bg" aria-hidden />
        <div className="jobs-container jobs-search__inner">
          <h1 className="jobs-search__title">
            Tìm việc làm <span className="jobs-search__title-accent">xuất khẩu lao động</span>
          </h1>

          <form
            className="jobs-search__form"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <div className="jobs-search__field jobs-search__field--keyword">
              <span className="jobs-search__icon">
                <Search size={18} />
              </span>
              <label className="jobs-search__control">
                <span className="jobs-search__label">Từ khóa</span>
                <input
                  className="jobs-search__input"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tên đơn hàng, công ty, ngành nghề..."
                  type="search"
                />
              </label>
              {keyword && (
                <button type="button" className="jobs-search__clear" onClick={() => setKeyword("")} aria-label="Xóa từ khóa">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="jobs-search__field">
              <span className="jobs-search__icon">
                <Globe2 size={18} />
              </span>
              <div className="jobs-search__control">
                <span className="jobs-search__label">Quốc gia</span>
                <Dropdown
                  className="jobs-search__select"
                  aria-label="Quốc gia"
                  searchPlaceholder="Tìm quốc gia..."
                  value={pickValue(filters.countries)}
                  placeholder={`${filters.countries.length} quốc gia`}
                  onChange={(v) => setFilters((f) => ({ ...f, countries: v === "all" ? [] : [v] }))}
                  groups={[
                    { label: "", options: [{ value: "all", label: "Tất cả quốc gia" }] },
                    ...regions.map((r) => ({
                      label: r.label,
                      options: countries
                        .filter((c) => c.region === r.key)
                        .map((c) => ({
                          value: c.name,
                          label: c.name,
                          meta: countryJobCounts.has(c.name) ? String(countryJobCounts.get(c.name)) : undefined,
                          icon: <CountryFlag code={c.flagCode} />,
                        })),
                    })),
                  ]}
                />
              </div>
            </div>

            <div className="jobs-search__field">
              <span className="jobs-search__icon">
                <Factory size={18} />
              </span>
              <div className="jobs-search__control">
                <span className="jobs-search__label">Ngành nghề</span>
                <Dropdown
                  className="jobs-search__select"
                  aria-label="Ngành nghề"
                  searchPlaceholder="Tìm ngành nghề..."
                  value={pickValue(filters.industries)}
                  placeholder={`${filters.industries.length} ngành nghề`}
                  onChange={(v) => setFilters((f) => ({ ...f, industries: v === "all" ? [] : [v] }))}
                  options={[
                    { value: "all", label: "Mọi ngành nghề" },
                    ...industryOptions.map((i) => ({ value: i, label: i })),
                  ]}
                />
              </div>
            </div>

            <button type="submit" className="btn btn--primary jobs-search__submit">
              <Search size={18} />
              <span>Tìm kiếm</span>
            </button>
          </form>

        </div>
      </section>

      {/* ============= MAIN ============= */}
      <section className="jobs-container jobs-main">
        <div className="jobs-layout">
          {/* Sidebar (desktop) */}
          <aside className="jobs-sidebar">
            <JobFilterSidebar jobs={allJobs} filters={filters} onChange={setFilters} onReset={resetFilters} />
          </aside>

          {/* Kết quả */}
          <div className="jobs-results">
            {/* Toolbar */}
            <div className="jobs-toolbar" ref={listTopRef}>
              <p className="jobs-toolbar__count">
                Tìm thấy <strong>{filtered.length.toLocaleString("vi-VN")}</strong> đơn hàng
              </p>

              <div className="jobs-toolbar__actions">
                <button
                  type="button"
                  className="btn btn--outline btn--sm jobs-filter-trigger"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <SlidersHorizontal size={14} />
                  Bộ lọc
                  {activeCount > 0 && <span className="jobs-filter-trigger__count">{activeCount}</span>}
                </button>

                <div className="jobs-sort">
                  <span className="jobs-sort__icon">
                    <ArrowDownWideNarrow size={14} />
                  </span>
                  <Dropdown
                    className="jobs-sort__select"
                    aria-label="Sắp xếp"
                    value={sort}
                    onChange={setSort}
                    options={sortOptions}
                  />
                </div>
              </div>
            </div>

            {/* Chip đang lọc (mobile/tablet) */}
            {activeCount > 0 && (
              <div className="jobs-chipbar">
                <ActiveFilterChips filters={filters} onChange={setFilters} className="jobs-chipbar__chips" />
                <button type="button" className="jobs-chipbar__reset" onClick={resetFilters}>
                  Xóa tất cả
                </button>
              </div>
            )}

            {/* List */}
            {filtered.length === 0 ? (
              <div className="jobs-empty">
                <div className="jobs-empty__icon">
                  <SearchX size={24} />
                </div>
                <h3 className="jobs-empty__title">Không tìm thấy đơn hàng phù hợp</h3>
                <p className="jobs-empty__text">
                  Thử xóa bớt bộ lọc hoặc thay đổi từ khóa tìm kiếm để xem thêm kết quả.
                </p>
                <button type="button" className="btn btn--outline btn--sm jobs-empty__action" onClick={resetFilters}>
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="job-list">
                  {pageJobs.map((job) => (
                    <JobListCard
                      key={job.id}
                      job={job}
                      saved={savedJobs.has(job.id)}
                      onToggleSave={() => toggleSave(job.id)}
                      onApply={() => setApplyJob(job)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="jobs-pagination">
                    <nav className="pagination" aria-label="Phân trang">
                      <ul className="pagination__list">
                        <li>
                          <button
                            type="button"
                            className="pagination__link"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Trang trước"
                          >
                            <ChevronLeft size={16} />
                            <span className="pagination__nav-label">Trước</span>
                          </button>
                        </li>

                        {getPageItems(currentPage, totalPages).map((item, i) =>
                          item === "ellipsis" ? (
                            <li key={`e-${i}`}>
                              <span className="pagination__ellipsis">
                                <MoreHorizontal size={16} />
                              </span>
                            </li>
                          ) : (
                            <li key={item}>
                              <button
                                type="button"
                                className={`pagination__link${item === currentPage ? " pagination__link--active" : ""}`}
                                onClick={() => goToPage(item)}
                                aria-current={item === currentPage ? "page" : undefined}
                              >
                                {item}
                              </button>
                            </li>
                          )
                        )}

                        <li>
                          <button
                            type="button"
                            className="pagination__link"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Trang sau"
                          >
                            <span className="pagination__nav-label">Sau</span>
                            <ChevronRight size={16} />
                          </button>
                        </li>
                      </ul>
                    </nav>

                    <span className="jobs-pagination__range">
                      Hiển thị {rangeFrom}–{rangeTo} trong {filtered.length.toLocaleString("vi-VN")} đơn hàng
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {applyJob && (
        <JobApplyModal key={applyJob.id} job={toApplySummary(applyJob)} autoOpen onClosed={() => setApplyJob(null)} />
      )}

      {/* ============= MOBILE FILTER DRAWER ============= */}
      <div className={`drawer${mobileFilterOpen ? " drawer--open" : ""}`} aria-hidden={!mobileFilterOpen}>
        <div className="drawer__overlay" onClick={() => setMobileFilterOpen(false)} />
        <div className="drawer__panel" role="dialog" aria-label="Bộ lọc">
          <JobFilterSidebar jobs={allJobs} filters={filters} onChange={setFilters} onReset={resetFilters} />
        </div>
      </div>
    </div>
  );
}
