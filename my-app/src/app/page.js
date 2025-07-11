import { HeroBanner } from "./sections/HeroBanner";
import PhilosophySection from "./sections/Info";
import TimelineSection from "./sections/Timeline";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PhilosophySection />
      <TimelineSection />
    </div>
  );
}
