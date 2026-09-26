import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LocationsSection from "@/components/sections/LocationsSection";

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <LocationsSection />
      <SiteFooter />
    </div>
  );
}
