"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "../../../data/ourservices";
import { HardHat, Lightbulb, Wrench } from "lucide-react";

// Map icon names to actual components
const iconMap = {
  HardHat,
  Lightbulb,
  Wrench,
};

const OurServicesSection = () => {
  return (
<section id="services" className="py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2">
            Our Services
          </h2>
          <motion.div
            className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover the three core service areas that define our expertise and
            deliver exceptional value to our clients across diverse industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Get the icon component from iconMap using the service.icon string
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className="relative bg-white rounded-xl shadow-lg p-8 overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-150"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                <div className="relative text-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10">
                    {IconComponent ? (
                      <IconComponent className="w-8 h-8 text-accent" />
                    ) : (
                      <span className="w-8 h-8 text-accent">Icon</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    {service.title}
                  </h3>
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    {service.type}
                  </span>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-slate-600"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
