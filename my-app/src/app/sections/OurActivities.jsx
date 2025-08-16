"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, Globe, Lightbulb } from "lucide-react";

const activities = [
  {
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    title: "Business Consulting",
    description:
      "Providing expert guidance to help organizations achieve strategic goals efficiently.",
  },
  {
    icon: <Users className="w-7 h-7 text-primary" />,
    title: "Team Development",
    description:
      "Enhancing workforce capabilities through tailored training and workshops.",
  },
  {
    icon: <Globe className="w-7 h-7 text-primary" />,
    title: "Global Outreach",
    description:
      "Building international partnerships to expand our market presence.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-primary" />,
    title: "Innovation Projects",
    description:
      "Driving new initiatives to foster creativity and future-ready solutions.",
  },
];

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function ActivitiesSection() {
  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // replay on scroll
            transition={{ duration: 0.7 }}
          >
            Our Activities
          </motion.h2>
          <motion.div
            className="mt-2 mx-auto h-1 w-24 bg-primary rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.2 }} // replay on scroll
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Timeline layout */}
        <div className="relative">
          <motion.div
            variants={animations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // replay on scroll
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-20"
          >
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                variants={animations.item}
                className="flex flex-col items-center text-center md:items-center md:text-center relative md:w-1/4"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 z-10 relative">
                  {activity.icon}
                </div>
                {/* Title */}
                <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">
                  {activity.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
                  {activity.description}
                </p>

                {/* Horizontal line for desktop */}
                {index !== activities.length - 1 && (
                  <span className="hidden md:block absolute top-7 left-full w-20 h-[1px] bg-gray-300"></span>
                )}

                {/* Vertical line for mobile (from p -> next icon) */}
                {index !== activities.length - 1 && (
                  <span className="block md:hidden absolute left-1/2 top-full w-[2px] h-8 bg-gray-300"></span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
