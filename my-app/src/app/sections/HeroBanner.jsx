"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section
      aria-label="Hero banner"
      className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/50 to-accent/10"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/construction-site.jpg')" }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-background/80 mix-blend-overlay" />
      </div>

      {/* Top Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/60 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-5">
            Engineering Excellence with <span className="text-accent">EMC</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Since 1988, EMC Construction has delivered innovative, high-quality
            projects in Egypt’s power and oil & gas markets. Trust us to build
            your vision with precision.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-teal border-teal hover:bg-teal hover:text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
            >
              <Link href="/about">Learn About Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-teal/20 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-navy/10 rounded-full blur-2xl -z-10"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroBanner;
