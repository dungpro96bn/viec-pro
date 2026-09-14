import "./home.css";
import { SiteHeader } from "@/components/home/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { JobCategories } from "@/components/home/job-categories";
import { FeaturedJobs } from "@/components/home/featured-jobs";
import { TopEmployers } from "@/components/home/top-employers";
import { StatsSection } from "@/components/home/stats-section";
import { CareerResources } from "@/components/home/career-resources";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";
import { AppDownload } from "@/components/home/app-download";
import { SiteFooter } from "@/components/home/site-footer";

export default function Home() {
  return (
    <div className="home">
      <SiteHeader />
      <main className="home__main">
        <HeroSection />
        <FeaturedJobs />
        <JobCategories />
        <TopEmployers />
        <StatsSection />
        <CareerResources />
        <Testimonials />
        <CtaSection />
        <AppDownload />
      </main>
      <SiteFooter />
    </div>
  );
}
