"use client";

import React, { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { HeroBanner } from "./sections/HeroBanner";
import TimelineSection from "./sections/Timeline";
import InfoSection from "./sections/Info";
import PortoflioSection from "./sections/Portoflio";
import ClientsSection from "./sections/Clients";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingFinish = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner onFinish={handleLoadingFinish} />;
  }

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
