"use client";
import { motion } from "framer-motion";
import { activities } from "../../../data/activities";

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        duration: 0.5,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
};

export default function ActivitiesSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            Our Activities
          </motion.h1>

          <motion.div
            className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Activities Grid */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            variants={animations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={animations.item}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group relative flex flex-col h-full"
              >
                {/* Content Container */}
                <div className="relative flex flex-col h-full min-h-[260px] text-center transition-all duration-300">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-105">
                      {activity.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {activity.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed font-medium flex-1 max-w-sm mx-auto">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
