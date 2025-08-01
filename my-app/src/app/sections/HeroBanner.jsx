"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, LineChart } from "lucide-react";
import { hero } from "../../../data/hero";

export function HeroBanner() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: false,
    threshold: 0.3,
    margin: "-100px",
  });

  return (
    <section
      ref={ref}
      aria-label="Hero banner"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* === Video Background === */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 animate-fadeIn"
        src="/videos/mixkit-buildings-under-construction-aerial-view-4010-full-hd.mp4"
        width={1920}
        height={1080}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* === Overlay Gradients === */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-teal/5 z-15"
        aria-hidden="true"
      />

      {/* === Background Effects === */}
      <div className="absolute inset-0 z-5" aria-hidden="true">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent transform -skew-y-12 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_24%,rgba(0,174,239,0.1)_25%,rgba(0,174,239,0.1)_26%,transparent_27%,transparent_74%,rgba(0,174,239,0.1)_75%,rgba(0,174,239,0.1)_76%,transparent_77%,transparent)] bg-[length:30px_30px] sm:bg-[length:40px_40px] lg:bg-[length:50px_50px]" />
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
          <div
            className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>

      {/* === Main Content === */}
      <motion.div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          {/* === Badge === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center mt-2 mb-4 sm:mb-6 lg:mb-10"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 backdrop-blur-md border border-accent/30 sm:border-2 bg-black/20 rounded-full px-8 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 shadow-[0_8px_32px_rgba(0,174,239,0.2)] hover:shadow-[0_12px_40px_rgba(0,174,239,0.3)] transition-shadow duration-300 max-w-fit">
              <motion.div
                className="w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-accent rounded-full flex-shrink-0"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-white font-semibold text-lg sm:text-base lg:text-lg xl:text-xl tracking-wide whitespace-nowrap">
                {hero.badge}
              </span>
            </div>
          </motion.div>

          {/* === Heading === */}
          <motion.div className="relative mb-4 sm:mb-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] sm:leading-tight tracking-tight"
            >
              <span className="relative block">
                {hero.heading}
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-teal/20 blur-xl"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.h1>
          </motion.div>

          {/* === Logo Line === */}
          <motion.div className="mb-8 sm:mb-10 lg:mb-12">
            <motion.img
              src="/logos/EMC-LOGO.png"
              alt="EMC Company Logo"
              className="mx-auto pt-2 sm:pt-4 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32 w-auto filter drop-shadow-[0_0_20px_rgba(0,174,239,0.5)]"
              initial={{
                scale: 0.8,
                rotateX: -90,
                filter: "brightness(0.5)",
                opacity: 0,
              }}
              animate={
                isInView
                  ? {
                      scale: 1,
                      rotateX: 0,
                      filter: "brightness(1)",
                      opacity: 1,
                    }
                  : {
                      scale: 0.8,
                      rotateX: -90,
                      filter: "brightness(0.5)",
                      opacity: 0,
                    }
              }
              transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
            />
          </motion.div>

          {/* === Subheading === */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed font-medium px-2 sm:px-0"
          >
            {hero.subheading}
          </motion.p>

          {/* === CTA Buttons === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
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
                className="relative overflow-hidden bg-gradient-to-r from-accent via-accent to-teal text-white border-0 rounded-xl sm:rounded-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 text-base sm:text-lg lg:text-xl font-bold shadow-[0_15px_40px_rgba(0,174,239,0.4)] hover:shadow-[0_30px_70px_rgba(0,174,239,0.6)] transition-all duration-500 w-full sm:w-auto min-h-[56px] sm:min-h-[64px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 sm:gap-3 relative z-10"
                  aria-label="Contact us to get started"
                >
                  <span>{hero.ctaPrimary}</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
                className="relative overflow-hidden text-accent border border-accent/60 sm:border-2 hover:bg-accent/15 backdrop-blur-md bg-black/10 rounded-xl sm:rounded-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 text-base sm:text-lg lg:text-xl font-bold shadow-[0_15px_40px_rgba(0,174,239,0.3)] hover:shadow-[0_30px_70px_rgba(0,174,239,0.5)] transition-all duration-500 w-full sm:w-auto min-h-[56px] sm:min-h-[64px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Link
                  href="#timeline"
                  className="flex items-center justify-center gap-2 sm:gap-3 relative z-10"
                  aria-label="View our project timeline"
                >
                  <span>{hero.ctaSecondary}</span>
                  <LineChart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroBanner;
