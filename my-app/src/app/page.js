import { HeroBanner } from "./sections/HeroBanner";
import InfoSection from "./sections/Info";
import PortoflioSection from "./sections/Portoflio";
import PartnersSection from "./sections/Partners";
import ClientsSection from "./sections/ClientsSection";
import OurServicesSection from "./sections/OurServicesSection";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <InfoSection />
      <OurServicesSection />
      <PortoflioSection />
      <PartnersSection />
      <ClientsSection/>
    </div>
  );
}
