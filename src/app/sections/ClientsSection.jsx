"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clients, clientsSection } from "../../../data/clients.js";

// Fallback logo image
const FALLBACK_LOGO = "/clients/placeholder.jpg";

const ClientsSection = () => {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Filter out sub-companies, only use main clients with safety checks
  const mainClients = (clients || []).map((client) => ({
    id: client?.id || `client-${Math.random()}`,
    name: client?.name || "Unknown Client",
    logo: client?.logo || FALLBACK_LOGO,
    website: client?.website || "#",
    brief: client?.brief || "",
  }));

  // Auto-cycle through clients
  useEffect(() => {
    if (!isHovered && mainClients.length > 0) {
      const interval = setInterval(() => {
        setSpotlightIndex((prev) => (prev + 1) % mainClients.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered, mainClients.length]);

  const handleClientHover = (index) => {
    if (mainClients[index]) {
      setSpotlightIndex(index);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Prevent rendering if no clients are available
  if (!mainClients.length) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white text-center">
        <p className="text-lg text-gray-600">
          No clients available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {clientsSection?.title || "Our Clients"}
          </motion.h2>

          <motion.div
            className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mt-0 leading-relaxed font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {clientsSection?.subtitle || "Trusted partnerships driving success"}
          </motion.p>
        </motion.div>

        {/* Logo Wall */}
        <div className="relative">
          {/* Spotlight Client - Large Display */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {mainClients[spotlightIndex] && (
                <motion.div
                  key={mainClients[spotlightIndex].id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="relative group">
                    {/* Spotlight Glow Effect */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* Logo Container */}
                    <motion.div className="relative w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center mx-auto">
                      <Image
                        src={mainClients[spotlightIndex].logo}
                        alt={`${mainClients[spotlightIndex].name} logo`}
                        width={128}
                        height={128}
                        className="w-32 h-32 object-contain filter drop-shadow-lg"
                        onError={(e) => {
                          e.target.src = FALLBACK_LOGO;
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.h3
                    className={`text-2xl font-bold text-gray-900 mt-6 mb-2 ${
                      mainClients[spotlightIndex].name.split(" ").length > 3
                        ? "ml-4"
                        : "text-center"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {mainClients[spotlightIndex].name}
                  </motion.h3>

                  <motion.a
                    href={mainClients[spotlightIndex].website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ x: 2 }}
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Client Grid - All Logos */}
          <motion.div
            className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onMouseLeave={handleMouseLeave}
          >
            {mainClients.map((client, index) => (
              <motion.div
                key={client.id}
                className={`relative cursor-pointer transition-all duration-500 flex justify-center items-center ${
                  spotlightIndex === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
                onMouseEnter={() => handleClientHover(index)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: spotlightIndex === index ? 1 : 0.6,
                  scale: 1,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Selection Ring */}
                {spotlightIndex === index && (
                  <motion.div
                    className="absolute -inset-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Logo Container */}
                <div
                  className={`w-20 h-20 bg-white rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                    spotlightIndex === index
                      ? "border-primary shadow-lg"
                      : "border-gray-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.src = FALLBACK_LOGO;
                    }}
                  />
                </div>

                {/* Client Name on Hover */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded-lg opacity-0 pointer-events-none whitespace-nowrap"
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {client.name}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-12 gap-2">
            {mainClients.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  spotlightIndex === index
                    ? "bg-primary w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setSpotlightIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
