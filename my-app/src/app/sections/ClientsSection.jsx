"use client";
import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clients, clientsSection } from "../../../data/clients";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const ClientsSection = () => {
  const [modalClient, setModalClient] = useState(null);

  const openModal = useCallback((client) => {
    setModalClient(client);
  }, []);

  const closeModal = useCallback(() => {
    setModalClient(null);
  }, []);

  const sortedClients = useMemo(() => {
    return [...clients].sort((a, b) => {
      const aHasSub = a.subCompanies && a.subCompanies.length > 0 ? -1 : 1;
      const bHasSub = b.subCompanies && b.subCompanies.length > 0 ? -1 : 1;
      return aHasSub - bHasSub;
    });
  }, []);

  const CompanyItem = ({ company, hasSubCompanies }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="group h-full flex flex-col"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-28 h-28 bg-white backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-sm border border-gray-100/50 group-hover:shadow-md transition-all duration-300"
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-16 h-16 object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Company Name */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
            {company.name}
          </h3>
          <div className="mt-2 w-8 h-0.5 bg-gray-200 rounded-full mx-auto group-hover:bg-primary transition-colors duration-300" />
        </div>

        {/* Description */}
        <div className="flex-1 mb-6">
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {company.brief}
          </p>
        </div>

        {/* Portfolio Button */}
        {hasSubCompanies && (
          <div className="mb-4">
            <motion.button
              onClick={() => openModal(company)}
              className="flex items-center justify-center w-full p-3 rounded-lg border border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 group/portfolio"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover/portfolio:text-primary transition-colors duration-200">
                  View Portfolio ({company.subCompanies?.length})
                </span>
              </div>
            </motion.button>
          </div>
        )}

        {/* Visit Website Button*/}
        <div className="mt-auto">
          <motion.a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 group/btn"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-2">Visit Website</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </motion.svg>
          </motion.a>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-20 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sortedClients.length > 0 && (
          <>
            {/* Header Section */}
            <motion.div
              className="text-center mb-14"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
                {clientsSection.label}
              </div>
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
                variants={sectionVariants}
              >
                {clientsSection.title}
              </motion.h2>
              <motion.div
                className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md mb-3"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.p
                className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mt-0 leading-relaxed font-semibold"
                variants={sectionVariants}
              >
                {clientsSection.subtitle}
              </motion.p>
            </motion.div>

            {/* Clients Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedClients.map((client) => (
                <CompanyItem
                  key={client.id}
                  company={client}
                  hasSubCompanies={
                    client.subCompanies && client.subCompanies.length > 0
                  }
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Portfolio Modal */}
        <AnimatePresence>
          {modalClient && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{ zIndex: 9999 }}
            >
              <motion.div
                className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                style={{ zIndex: 10000 }}
              >
                {/* Modal Header */}
                <div className="relative bg-gradient-to-r from-primary to-primary-light p-8 text-white">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
                    aria-label="Close modal"
                    style={{ zIndex: 10001 }}
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Modal Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                      <img
                        src={modalClient.logo}
                        alt={`${modalClient.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        {modalClient.name} Portfolio
                      </h2>
                      <p className="text-white/90 text-base">
                        {modalClient.subCompanies?.length} Companies
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                  <div className="space-y-4">
                    {modalClient.subCompanies?.map((sub, idx) => (
                      <motion.div
                        key={sub.id}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-primary/5 transition-all duration-300 border border-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                          <img
                            src={sub.logo}
                            alt={`${sub.name} logo`}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                {sub.name}
                              </h4>
                              {sub.brief && (
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                  {sub.brief}
                                </p>
                              )}
                              <a
                                href={sub.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-200 text-sm font-medium"
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
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ClientsSection;
