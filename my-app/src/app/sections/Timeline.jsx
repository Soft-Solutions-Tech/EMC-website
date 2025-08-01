"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { companyTimeline } from "../../../data/about";

export function TimelineSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
    },
  };

  return (
    <section
      id="timeline"
      className="relative w-full py-12 sm:py-16 bg-background text-foreground overflow-hidden"
      aria-label="Company Timeline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          animate="visible"
          variants={containerVariants}
        >
          Our Journey Through Time
        </motion.h1>

        <motion.div
          className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md mb-5"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <div className="relative w-full">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform -translate-y-1/2 origin-left"
          />

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-center relative min-h-[400px] gap-4">
              {companyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                  className="relative flex flex-col items-center flex-1"
                  aria-labelledby={`timeline-event-${index}`}
                >
                  <div className="z-10 w-6 h-6 bg-accent border-4 border-background rounded-full shadow-lg shadow-accent/30" />

                  <div
                    className={`absolute w-full max-w-xs bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg ${
                      index % 2 === 0 ? "top-12" : "bottom-12"
                    }`}
                  >
                    <div
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold shadow-md"
                      id={`timeline-event-${index}`}
                    >
                      {item.year}
                    </div>

                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-1 bg-accent/60 ${
                        index % 2 === 0
                          ? "top-0 -mt-12 h-11"
                          : "bottom-0 -mb-12 h-11"
                      }`}
                    />

                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.event}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden relative">
            <div className="absolute top-0 bottom-0 left-2 w-1 bg-gradient-to-b from-accent/20 via-accent to-accent/20" />
            <div className="space-y-12 sm:space-y-16">
              {companyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                  className="relative flex items-start"
                  aria-labelledby={`timeline-event-mobile-${index}`}
                >
                  <div className="z-10 w-6 h-6 bg-accent border-4 border-background rounded-full shadow-lg shadow-accent/30 flex-shrink-0 relative left-[-2px]" />
                  <div className="ml-8 w-full bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
                    <div
                      className="text-lg font-bold text-accent mb-2"
                      id={`timeline-event-mobile-${index}`}
                    >
                      {item.year}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
