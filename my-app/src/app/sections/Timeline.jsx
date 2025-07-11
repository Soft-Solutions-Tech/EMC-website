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
      className="relative w-full py-5 bg-background text-foreground overflow-hidden"
      aria-label="Company Timeline"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-accent leading-[1.15] pb-2">
            Our Journey Through Time
          </h2>

          <div className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md" />
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="relative w-full">
          {/* Timeline Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform -translate-y-1/2 origin-left"
          />

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-center relative min-h-[400px]">
              {companyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center"
                  style={{ flex: "1 1 0%" }}
                >
                  {/* Dot */}
                  <div className="z-10 w-6 h-6 bg-accent border-4 border-background rounded-full shadow-lg shadow-accent/30" />

                  {/* Event Card */}
                  <div
                    className={`absolute w-64 bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg ${
                      index % 2 === 0 ? "top-12" : "bottom-12"
                    }`}
                  >
                    {/* Year Badge */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-background px-4 py-1 rounded-full text-sm font-bold shadow-md">
                      {item.year}
                    </div>

                    {/* Connector Line */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-1 bg-accent/60 ${
                        index % 2 === 0
                          ? "top-0 -mt-12 h-11"
                          : "bottom-0 -mb-12 h-11"
                      }`}
                    />

                    {/* Event Description */}
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

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className="space-y-16">
              {companyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex items-center"
                >
                  {/* Dot */}
                  <div className="z-10 w-6 h-6 bg-accent border-4 border-background rounded-full shadow-lg shadow-accent/30 flex-shrink-0" />

                  {/* Event Card */}
                  <div className="ml-8 w-full bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
                    {/* Year */}
                    <div className="text-lg font-bold text-accent mb-2">
                      {item.year}
                    </div>

                    {/* Event Description */}
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
