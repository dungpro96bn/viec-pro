import type { Metadata } from "next";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { JobsExplorer } from "@/components/jobs/jobs-explorer";

export const metadata: Metadata = {
  title: "Việc làm XKLĐ - Tìm đơn hàng xuất khẩu lao động | ViecPro",
  description:
    "Danh sách đơn hàng xuất khẩu lao động Nhật Bản, Đài Loan, Hàn Quốc, Châu Âu... Lọc theo quốc gia, ngành nghề, mức lương và ứng tuyển nhanh trên ViecPro.",
};

export default function ViecLamPage() {
  return (
    <div className="jobs-shell">
      <SiteHeader />
      <main className="jobs-shell__main">
        <JobsExplorer />
      </main>
      <SiteFooter />
    </div>
  );
}
