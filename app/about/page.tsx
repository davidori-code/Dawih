import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AboutSection from "@/components/sections/AboutSection";
import PastorSection from "@/components/sections/PastorSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <AboutSection />
      <PastorSection />
      <SiteFooter />
    </div>
  );
}
