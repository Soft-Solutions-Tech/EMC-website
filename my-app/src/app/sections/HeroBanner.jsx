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
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden mt-[4.5rem]"
    >
      {/* === Background Effects === */}
      <div className="absolute inset-0 z-5">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent transform -skew-y-12 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_24%,rgba(0,174,239,0.1)_25%,rgba(0,174,239,0.1)_26%,transparent_27%,transparent_74%,rgba(0,174,239,0.1)_75%,rgba(0,174,239,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
        </div>

        {/* Horizontal power lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
          <div
            className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>

      {/* === Video Background === */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/mixkit-buildings-under-construction-aerial-view-4010-full-hd.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/logos/EMC-LOGO.png"
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

      {/* === Main Content === */}
      <motion.div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* === Badge === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 backdrop-blur-md border-2 border-accent/30 bg-black/20 rounded-full px-8 py-4 mb-8 shadow-[0_8px_32px_rgba(0,174,239,0.2)]"
          >
            <motion.div
              className="flex items-center gap-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-white font-semibold text-lg tracking-wide">
              {hero.badge}
            </span>
          </motion.div>

          {/* === Heading === */}
          <motion.div className="relative mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight"
            >
              <span className="relative">
                {hero.heading}
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-teal/20 blur-xl"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <motion.img
                src="/logos/EMC-LOGO.png"
                alt="EMC Logo"
                className="inline-block h-16 sm:h-20 md:h-24 lg:h-28 w-auto filter drop-shadow-[0_0_20px_rgba(0,174,239,0.5)]"
                initial={{
                  scale: 0.9,
                  rotateX: -90,
                  filter: "brightness(0.5)",
                }}
                animate={
                  isInView
                    ? { scale: 1, rotateX: 0, filter: "brightness(1)" }
                    : { scale: 0.9, rotateX: -90, filter: "brightness(0.5)" }
                }
                transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
              />
            </motion.h1>
          </motion.div>

          {/* === Subheading === */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            {hero.subheading}
          </motion.p>

          {/* === CTA Buttons === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            {/* Primary Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-accent via-accent to-teal text-white border-0 rounded-2xl px-12 py-8 text-xl font-bold shadow-[0_20px_50px_rgba(0,174,239,0.4)] hover:shadow-[0_30px_70px_rgba(0,174,239,0.6)] group transition-all duration-500"
              >
                <Link
                  href="/contact"
                  className="flex items-center gap-3 relative z-10"
                >
                  {hero.ctaPrimary}
                  <Send className="w-5 h-5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </Button>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative overflow-hidden text-accent border-2 border-accent/60 hover:bg-accent/15 backdrop-blur-md bg-black/10 rounded-2xl px-12 py-8 text-xl font-bold shadow-[0_20px_50px_rgba(0,174,239,0.3)] hover:shadow-[0_30px_70px_rgba(0,174,239,0.5)] group transition-all duration-500"
              >
                <Link
                  href="#timeline"
                  className="flex items-center gap-3 relative z-10"
                >
                  {hero.ctaSecondary}
                  <LineChart className="w-5 h-5" />
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
