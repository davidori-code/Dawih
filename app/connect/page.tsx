import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConnectSection from "@/components/sections/ConnectSection";

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <ConnectSection />
      <SiteFooter />
    </div>
  );
}
