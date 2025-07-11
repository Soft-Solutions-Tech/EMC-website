import { HeroBanner } from "./sections/HeroBanner";
import PhilosophySection from "./sections/Info";
import TimelineSection from "./sections/Timeline";
import InfoSection from "./sections/Info";
import PortoflioSection from "./sections/Portoflio";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PhilosophySection />
      <TimelineSection />
      <InfoSection />
      <PortoflioSection />
    </div>
  );
}
