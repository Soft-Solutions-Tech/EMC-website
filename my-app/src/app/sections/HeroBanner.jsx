"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Briefcase } from "lucide-react";
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
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
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

      {/* Overlay Gradients */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-teal/5 z-15"
        aria-hidden="true"
      />

      {/* Main Content */}
      <motion.div className="relative z-30 w-full flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-7xl mx-auto text-center"
          >
            {/* Badge: Trusted Since 1988 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 backdrop-blur-md border border-accent/30 sm:border-2 bg-black/20 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 shadow-[0_8px_32px_rgba(0,174,239,0.2)] hover:shadow-[0_12px_40px_rgba(0,174,239,0.3)] transition-shadow duration-300">
                <motion.div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent rounded-full flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-white font-semibold text-sm sm:text-base lg:text-lg xl:text-xl tracking-wide whitespace-nowrap">
                  {hero.badge}
                </span>
              </div>
            </motion.div>

            {/* Logo */}
            <motion.div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10">
              <motion.img
                src="/logos/EMC-LOGO.png"
                alt="EMC Company Logo"
                className="mx-auto h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 w-auto filter drop-shadow-[0_0_20px_rgba(0,174,239,0.5)]"
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

            {/* Vision Statement (Subheading) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed font-medium px-4 sm:px-6 md:px-8 lg:px-0">
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
              {/* Primary CTA: Our Services */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group"
              >
                <Button
                  asChild
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-accent via-accent to-teal text-white border-0 rounded-xl sm:rounded-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-4 xl:px-14 xl:py-5 text-base sm:text-lg lg:text-lg xl:text-xl font-bold shadow-[0_15px_40px_rgba(0,174,239,0.4)] hover:shadow-[0_30px_70px_rgba(0,174,239,0.6)] transition-all duration-500 w-full sm:w-auto min-h-[56px] sm:min-h-[64px] lg:min-h-[56px] xl:min-h-[64px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Link
                    href="#services"
                    className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 relative z-10"
                    aria-label="View our services"
                  >
                    <span>{hero.ctaPrimary}</span>
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>
              </motion.div>

              {/* Secondary CTA: Contact Us */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="relative overflow-hidden text-accent border border-accent/60 sm:border-2 hover:bg-accent/15 backdrop-blur-md bg-black/10 rounded-xl sm:rounded-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-4 xl:px-14 xl:py-5 text-base sm:text-lg lg:text-lg xl:text-xl font-bold shadow-[0_15px_40px_rgba(0,174,239,0.3)] hover:shadow-[0_30px_70px_rgba(0,174,239,0.5)] transition-all duration-500 w-full sm:w-auto min-h-[56px] sm:min-h-[64px] lg:min-h-[56px] xl:min-h-[64px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 relative z-10"
                    aria-label="Contact us"
                  >
                    <span>{hero.ctaSecondary}</span>
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
