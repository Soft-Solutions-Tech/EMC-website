"use client";

import MeetOurTeam from "../sections/MeetOurTeam";
import OurActivities from "../sections/OurActivities";
import WhoWeAreSection from "../sections/WhoWeAreSection";
import CoreValues from "../sections/CoreValues";
import TimelineSection from "../sections/Timeline";

// Main component
export default function AboutPage() {
  return (
    <>
      <WhoWeAreSection />
      <MeetOurTeam />
      <TimelineSection />
      <CoreValues />
      <OurActivities />
    </>
  );
}
