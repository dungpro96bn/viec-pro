import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import "./ui.css";
import { Toaster } from "@/components/ui/toaster";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ViecPro - Sàn Tuyển Dụng Việc Làm Hàng Đầu Việt Nam",
  description:
    "ViecPro là nền tảng tuyển dụng việc làm hàng đầu Việt Nam với hơn 50,000+ việc làm chất lượng, 10,000+ nhà tuyển dụng uy tín. Tạo CV miễn phí, tìm việc nhanh chóng với AI thông minh.",
  keywords: [
    "việc làm",
    "tuyển dụng",
    "tìm việc",
    "sàn việc làm",
    "ViecPro",
    "việc làm IT",
    "việc làm Hà Nội",
    "việc làm TP HCM",
    "tạo CV",
  ],
  authors: [{ name: "ViecPro Team" }],
  openGraph: {
    title: "ViecPro - Sàn Tuyển Dụng Việc Làm Hàng Đầu Việt Nam",
    description:
      "Hơn 50,000+ việc làm chất lượng, 10,000+ nhà tuyển dụng uy tín. Tạo CV miễn phí, tìm việc nhanh chóng với AI thông minh.",
    siteName: "ViecPro",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={beVietnamPro.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
