"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section
      aria-label="Hero banner"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-teal/20 to-accent/10"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-accent/30"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy leading-tight mb-6 tracking-tight"
          >
            Building the Future with{" "}
            <motion.span
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
              className="inline-block text-accent"
            >
              EMC
            </motion.span>
          </motion.h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Since 1988, EMC Construction has been a leader in Egypt’s power and oil & gas sectors,
            delivering innovative, high-quality projects with unmatched precision.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/80 border-2 border-accent rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-teal border-2 border-teal hover:bg-teal hover:text-white rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Blobs */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-teal/30 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-navy/20 rounded-full blur-2xl -z-10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroBanner;
