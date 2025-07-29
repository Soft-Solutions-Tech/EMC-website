"use client";

import React, { useEffect } from "react";

export default function LoadingSpinner({ onFinish }) {
  useEffect(() => {
    // Set a timeout to simulate video duration or listen to video ended event
    const timeout = setTimeout(() => {
      onFinish();
    }, 3000); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <video
        src="/videos/Logo-6-[remix].mp4"
        autoPlay
        muted
        playsInline
        className="max-w-full max-h-full"
      />
    </div>
  );
}
