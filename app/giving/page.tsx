import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GivingSection from "@/components/sections/GivingSection";

export default function GivingPage() {
  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <GivingSection />
      <SiteFooter />
    </div>
  );
}
