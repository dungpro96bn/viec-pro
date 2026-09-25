"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  FileText,
  Building2,
  ChevronDown,
  SlidersHorizontal,
  X,
  Sparkles,
  Wallet,
  Clock,
  Users,
  Globe2,
  CalendarDays,
  Tag,
  Factory,
} from "lucide-react";
import { Dropdown } from "@/components/common/dropdown";
import { CountryFlag } from "@/components/common/country-flag";
import {
  countries,
  orderFeeTypes,
  genderOptions,
  birthYearRanges,
  currencyOptions,
  salaryRanges,
  industries,
  recruitmentTypes,
  registrationLocations,
  postedWithin,
} from "@/lib/xkld-data";
import { HeroBannerSlider } from "@/components/home/hero-banner-slider";

type SearchTab = "jobs" | "cvs" | "companies";

const tabs: { id: SearchTab; label: string; short: string; icon: typeof Briefcase }[] = [
  { id: "jobs", label: "Tìm đơn hàng", short: "Đơn hàng", icon: Briefcase },
  { id: "cvs", label: "Tìm hồ sơ ứng viên", short: "CV", icon: FileText },
  { id: "companies", label: "Tìm công ty XKLĐ", short: "Công ty", icon: Building2 },
];

const regions: { key: string; label: string }[] = [
  { key: "asia", label: "Châu Á" },
  { key: "europe", label: "Châu Âu" },
  { key: "middle-east", label: "Trung Đông & Bắc Phi" },
  { key: "other", label: "Khác" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<SearchTab>("jobs");
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("all");
  const [regLocation, setRegLocation] = useState("all");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [feeType, setFeeType] = useState("all");
  const [gender, setGender] = useState("all");
  const [birthYear, setBirthYear] = useState("all");
  const [currency, setCurrency] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [recruitType, setRecruitType] = useState("all");
  const [posted, setPosted] = useState("all");
  const [skillsInput, setSkillsInput] = useState("");
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const searchboxRef = useRef<HTMLDivElement>(null);

  // Đóng panel nâng cao khi click ra ngoài searchbox (form + panel giữ mở).
  useEffect(() => {
    if (!advancedOpen) return;
    const onDown = (e: MouseEvent) => {
      if (searchboxRef.current && !searchboxRef.current.contains(e.target as Node)) {
        setAdvancedOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [advancedOpen]);

  const activeFilterCount =
    (feeType !== "all" ? 1 : 0) +
    (gender !== "all" ? 1 : 0) +
    (birthYear !== "all" ? 1 : 0) +
    (currency !== "all" ? 1 : 0) +
    (salaryRange !== "all" ? 1 : 0) +
    (industry !== "all" ? 1 : 0) +
    (recruitType !== "all" ? 1 : 0) +
    (posted !== "all" ? 1 : 0) +
    (skillsInput.trim() ? 1 : 0) +
    (onlyFree ? 1 : 0) +
    (onlyUrgent ? 1 : 0);

  const clearAll = () => {
    setFeeType("all");
    setGender("all");
    setBirthYear("all");
    setCurrency("all");
    setSalaryRange("all");
    setIndustry("all");
    setRecruitType("all");
    setPosted("all");
    setSkillsInput("");
    setOnlyFree(false);
    setOnlyUrgent(false);
  };

  const tabPlaceholder =
    activeTab === "jobs"
      ? "Từ khóa, tên đơn hàng, công ty XKLĐ..."
      : activeTab === "cvs"
      ? "Kỹ năng, vị trí ứng viên, quốc gia..."
      : "Tên công ty, lĩnh vực xuất khẩu...";

  const findLabel = (arr: { label: string; value: string }[], val: string) =>
    arr.find((x) => x.value === val)?.label;

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__dots" />
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />

      <div className="u-container hero__inner">
        {/* Search box */}
        <div className="searchbox" ref={searchboxRef}>
          {/* Tabs */}
          <div className="searchbox__tabrow">
            <div className="search-tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`search-tab${activeTab === tab.id ? " search-tab--active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={14} />
                    <span className="search-tab__long">{tab.label}</span>
                    <span className="search-tab__short">{tab.short}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className={`searchbox__adv-toggle${advancedOpen || activeFilterCount > 0 ? " searchbox__adv-toggle--on" : ""}`}
              onClick={() => setAdvancedOpen((v) => !v)}
              aria-expanded={advancedOpen}
            >
              <SlidersHorizontal size={14} />
              <span>Nâng cao</span>
              {activeFilterCount > 0 && <span className="badge badge--count">{activeFilterCount}</span>}
              <ChevronDown size={14} className="chevron" />
            </button>
          </div>

          {/* Main search */}
          <div className="searchbox__main">
            <div className="search-row">
              <div className="hfield">
                <span className="hfield__icon"><Search size={16} /></span>
                <input
                  className="hinput"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={tabPlaceholder}
                />
              </div>

              <div className="hfield">
                <span className="hfield__icon"><Globe2 size={16} /></span>
                <Dropdown
                  className="hselect"
                  aria-label="Quốc gia"
                  value={country}
                  onChange={setCountry}
                  searchPlaceholder="Tìm quốc gia..."
                  groups={[
                    { label: "", options: [{ value: "all", label: "Tất cả quốc gia" }] },
                    ...regions.map((r) => ({
                      label: r.label,
                      options: countries
                        .filter((c) => c.region === r.key)
                        .map((c) => ({
                          value: c.id,
                          label: c.name,
                          meta: c.count.toLocaleString("vi-VN"),
                          icon: <CountryFlag code={c.flagCode} />,
                        })),
                    })),
                  ]}
                />
              </div>

              <div className="hfield">
                <span className="hfield__icon"><MapPin size={16} /></span>
                <Dropdown
                  className="hselect"
                  aria-label="Nơi đăng ký"
                  value={regLocation}
                  onChange={setRegLocation}
                  options={[{ value: "all", label: "Nơi đăng ký" }, ...registrationLocations.slice(1)]}
                />
              </div>

              <button type="button" className="btn btn--primary btn--lg">
                <Search size={16} />
                <span>Tìm</span>
              </button>
            </div>

            {/* Advanced */}
            {advancedOpen && (
              <div className="adv" role="dialog" aria-label="Tìm kiếm nâng cao">
                <div className="adv__header">
                  <h3 className="adv__title">
                    <SlidersHorizontal size={16} color="var(--primary-text)" />
                    Tìm kiếm nâng cao
                    {activeFilterCount > 0 && (
                      <span className="badge badge--count">{activeFilterCount} bộ lọc</span>
                    )}
                  </h3>
                  <button type="button" className="btn btn--ghost btn--icon" aria-label="Đóng" onClick={() => setAdvancedOpen(false)}>
                    <X size={16} />
                  </button>
                </div>

                {/* Chips đang áp dụng */}
                {activeFilterCount > 0 && (
                  <div className="chips" style={{ marginBottom: 16 }}>
                    {feeType !== "all" && <Chip label={findLabel(orderFeeTypes, feeType)!} onClear={() => setFeeType("all")} />}
                    {gender !== "all" && <Chip label={findLabel(genderOptions, gender)!} onClear={() => setGender("all")} />}
                    {birthYear !== "all" && <Chip label={findLabel(birthYearRanges, birthYear)!} onClear={() => setBirthYear("all")} />}
                    {currency !== "all" && <Chip label={findLabel(currencyOptions, currency)!} onClear={() => setCurrency("all")} />}
                    {salaryRange !== "all" && <Chip label={findLabel(salaryRanges, salaryRange)!} onClear={() => setSalaryRange("all")} />}
                    {industry !== "all" && <Chip label={findLabel(industries, industry)!} onClear={() => setIndustry("all")} />}
                    {recruitType !== "all" && <Chip label={findLabel(recruitmentTypes, recruitType)!} onClear={() => setRecruitType("all")} />}
                    {posted !== "all" && <Chip label={findLabel(postedWithin, posted)!} onClear={() => setPosted("all")} />}
                    {skillsInput.trim() && <Chip label={`Kỹ năng: ${skillsInput}`} onClear={() => setSkillsInput("")} />}
                    {onlyFree && <Chip label="Chỉ đơn miễn phí" onClear={() => setOnlyFree(false)} />}
                    {onlyUrgent && <Chip label="Tuyển gấp" onClear={() => setOnlyUrgent(false)} />}
                  </div>
                )}

                <div className="adv__grid">
                  <AdvSelect label="Loại đơn hàng" icon={<Tag size={12} />} value={feeType} onChange={setFeeType} options={orderFeeTypes} />
                  <AdvSelect label="Giới tính yêu cầu" icon={<Users size={12} />} value={gender} onChange={setGender} options={genderOptions} />
                  <AdvSelect label="Năm sinh" icon={<CalendarDays size={12} />} value={birthYear} onChange={setBirthYear} options={birthYearRanges} />
                  <AdvSelect label="Loại tiền tệ lương" icon={<Wallet size={12} />} value={currency} onChange={setCurrency} options={currencyOptions} />
                  <AdvSelect label="Mức lương (quy đổi USD)" icon={<Wallet size={12} />} value={salaryRange} onChange={setSalaryRange} options={salaryRanges} />
                  <AdvSelect label="Ngành nghề" icon={<Factory size={12} />} value={industry} onChange={setIndustry} options={industries} />
                  <AdvSelect label="Hình thức tuyển" icon={<Clock size={12} />} value={recruitType} onChange={setRecruitType} options={recruitmentTypes} />
                  <AdvSelect label="Đăng trong" icon={<Clock size={12} />} value={posted} onChange={setPosted} options={postedWithin} />
                  <div className="adv-field">
                    <label className="adv-field__label"><Sparkles size={12} />Kỹ năng (cách nhau bởi dấu phẩy)</label>
                    <input className="hinput" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="Tiếng Nhật N3, lái xe, hàn..." />
                  </div>
                </div>

                <div className="adv__toggles">
                  <button type="button" className={`toggle-chip${onlyFree ? " toggle-chip--active" : ""}`} onClick={() => setOnlyFree((v) => !v)}>
                    <span className="toggle-chip__dot" />
                    Chỉ đơn miễn phí
                  </button>
                  <button type="button" className={`toggle-chip${onlyUrgent ? " toggle-chip--active" : ""}`} onClick={() => setOnlyUrgent((v) => !v)}>
                    <span className="toggle-chip__dot" />
                    Tuyển gấp
                  </button>
                  <div className="adv__actions">
                    <button type="button" className="btn btn--outline btn--md" onClick={clearAll} disabled={activeFilterCount === 0}>
                      <X size={14} />
                      Đặt lại
                    </button>
                    <button type="button" className="btn btn--primary btn--md">
                      <Search size={14} />
                      Áp dụng bộ lọc
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banner */}
        <div className="hero__banner">
          <HeroBannerSlider />
        </div>
      </div>
    </section>
  );
}

function AdvSelect({
  label,
  icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="adv-field">
      <label className="adv-field__label">
        {icon}
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      </label>
      <Dropdown className="hselect" aria-label={label} value={value} onChange={onChange} options={options} />
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="chip">
      <span className="chip__label">{label}</span>
      <button type="button" className="chip__remove" onClick={onClear} aria-label="Xóa bộ lọc">
        <X size={12} />
      </button>
    </span>
  );
}
