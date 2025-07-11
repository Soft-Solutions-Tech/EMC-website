import { HeroBanner } from "./sections/HeroBanner";
import InfoSection from "./sections/Info";
import PortoflioSection from "./sections/Portoflio";


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <InfoSection />
      <PortoflioSection />
    </div>
  );
}
