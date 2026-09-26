import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MinistriesSection from "@/components/sections/MinistriesSection";

export default function MinistriesPage() {
  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <MinistriesSection />
      <SiteFooter />
    </div>
  );
}
