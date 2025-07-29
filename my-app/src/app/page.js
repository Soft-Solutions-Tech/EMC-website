import { HeroBanner } from "./sections/HeroBanner";
import TimelineSection from "./sections/Timeline";
import InfoSection from "./sections/Info";
import PortoflioSection from "./sections/Portoflio";
import ClientsSection from "./sections/clients";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <InfoSection />
      <PortoflioSection />
      <ClientsSection />
      <TimelineSection />
    </div>
  );
}
