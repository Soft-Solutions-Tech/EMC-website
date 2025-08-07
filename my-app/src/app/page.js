import { HeroBanner } from "./sections/HeroBanner";
import InfoSection from "./sections/Info";
import PortoflioSection from "./sections/Portoflio";
import ClientsSection from "./sections/Clients";
import OurServicesSection from "./sections/OurServicesSection";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <InfoSection />
      <OurServicesSection />
      <PortoflioSection />
      <ClientsSection />
    </div>
  );
}
