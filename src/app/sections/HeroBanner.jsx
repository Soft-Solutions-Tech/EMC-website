"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Briefcase } from "lucide-react";
import { hero } from "../../../data/hero.js";

export function HeroBanner() {
  const ref = React.useRef(null);
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const isInView = useInView(ref, {
    once: false,
    threshold: 0.3,
    margin: "-100px",
  });

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, []);

  const handleVideoLoad = React.useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Hero banner"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black"
    >
      <div
        className={`absolute inset-0 z-5 transition-opacity duration-500 ${
          videoLoaded ? "opacity-0" : "opacity-60"
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 105, 150, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 105, 150, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, transparent 0%, rgba(0, 105, 150, 0.03) 50%, transparent 100%)
          `,
        }}
        aria-hidden="true"
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        width={1920}
        height={1080}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={handleVideoLoad}
        onCanPlayThrough={handleVideoLoad}
      >
        <source src={hero.video.mp4} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 z-15"
        aria-hidden="true"
      />

      {/* Main Content - Always Visible */}
      <motion.div className="relative z-30 w-full flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-7xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 backdrop-blur-md border border-primary/30 bg-black/20 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 shadow-[0_4px_16px_rgba(0,105,150,0.15)] hover:shadow-[0_6px_20px_rgba(0,105,150,0.25)] transition-shadow duration-300">
                <motion.div
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-primary-foreground font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap">
                  {hero.badge}
                </span>
              </div>
            </motion.div>

            {/* Logo */}
            <motion.div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10">
              <motion.img
                src={hero.logo}
                alt="EMC Company Logo"
                className="mx-auto h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto filter drop-shadow-[0_0_20px_rgba(0,105,150,0.5)]"
                initial={{
                  scale: 0.8,
                  rotateX: -90,
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        rotateX: 0,
                        opacity: 1,
                      }
                    : {
                        scale: 0.8,
                        rotateX: -90,
                        opacity: 0,
                      }
                }
                transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
                loading="eager"
              />
            </motion.div>

            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-10 sm:mb-12 md:mb-14 lg:mb-16"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-primary-foreground/90 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed font-medium px-4 sm:px-6 md:px-8 lg:px-0">
                {hero.subheading}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group"
              >
                <Button
                  asChild
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-primary-dark text-primary-foreground border-0 rounded-xl sm:rounded-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 xl:px-14 xl:py-6 text-base sm:text-lg lg:text-xl font-bold shadow-[0_15px_40px_rgba(0,105,150,0.4)] hover:shadow-[0_30px_70px_rgba(0,105,150,0.6)] transition-all duration-500 w-full sm:w-auto min-h-[56px] sm:min-h-[64px] lg:min-h-[68px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Link
                    href="#services"
                    className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 relative z-10"
                    aria-label="View our services"
                  >
                    <span>{hero.ctaPrimary}</span>
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="relative overflow-hidden text-primary border border-primary/60 sm:border-2 hover:bg-primary/15 backdrop-blur-md bg-black/10 rounded-xl sm:rounded-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 xl:px-14 xl:py-6 text-base sm:text-lg lg:text-xl font-bold shadow-[0_15px_40px_rgba(0,105,150,0.3)] hover:shadow-[0_30px_70px_rgba(0,105,150,0.5)] transition-all duration-500 w-full sm:w-auto min-h-[56px] sm:min-h-[64px] lg:min-h-[68px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 relative z-10"
                    aria-label="Contact us"
                  >
                    <span>{hero.ctaSecondary}</span>
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroBanner;
