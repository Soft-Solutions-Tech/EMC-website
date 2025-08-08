"use client";
import React, { useState } from "react";
import { clients } from "../../../data/clients";
import { motion, AnimatePresence } from "framer-motion";

const ClientsSection = () => {
  const [expandedClients, setExpandedClients] = useState(
    clients
      .filter((c) => c.subCompanies && c.subCompanies.length > 0)
      .reduce((acc, client) => ({ ...acc, [client.id]: true }), {})
  );

  const toggleClientExpansion = (clientId) => {
    setExpandedClients((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  // Sort clients: those with subCompanies first
  const sortedClients = [...clients].sort((a, b) => {
    const aHasSub = a.subCompanies && a.subCompanies.length > 0 ? -1 : 1;
    const bHasSub = b.subCompanies && b.subCompanies.length > 0 ? -1 : 1;
    return aHasSub - bHasSub;
  });

  // Animation variants for section elements
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
    }),
  };

  // CompanyCard component
  const CompanyCard = ({
    company,
    index,
    hasSubCompanies,
    expanded,
    onToggle,
    isPartner = false,
    className = "",
  }) => {
    return (
      <motion.div
        className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border overflow-visible transform hover:-translate-y-1 flex-shrink-0 h-fit ${className}`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        custom={index}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl"></div>

        <div className="relative z-10 p-6 h-64 flex flex-col">
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block flex-1"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                    company.id === "p5" ? "h-14 w-14" : "h-14 w-14"
                  }`}
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-navy group-hover:text-teal transition-colors">
                {company.name}
              </h3>
              <div className="w-6 h-0.5 bg-gradient-to-r from-teal to-navy mt-1 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors mb-4 line-clamp-3 flex-1 text-center">
              {company.brief}
            </p>
          </a>

          {hasSubCompanies && (
            <div className="mt-auto pt-4 border-t border-secondary">
              <button
                onClick={() => onToggle(company.id)}
                className="flex items-center justify-between w-full text-left focus:outline-none group/button hover:bg-teal-50 rounded-lg p-2 -m-2 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal rounded-full mr-2 opacity-60"></div>
                  <h4 className="text-sm font-semibold text-teal uppercase tracking-wider">
                    Portfolio ({company.subCompanies.length})
                  </h4>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2 opacity-0 group-hover/button:opacity-100 transition-opacity duration-200">
                    {expanded ? "Hide" : "Show"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-teal transform transition-all duration-300 ${
                      expanded
                        ? "rotate-180 scale-110"
                        : "group-hover/button:scale-110"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>

        {hasSubCompanies && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative z-20 -mt-2 mx-2 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg p-3 shadow-lg border border-teal-200">
                  <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-teal-100">
                    {company.subCompanies.map((sub, subIndex) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIndex * 0.1, duration: 0.3 }}
                      >
                        <a
                          href={sub.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg bg-white hover:bg-teal-50 transition-all duration-200 shadow-sm hover:shadow-md group/sub border border-transparent hover:border-teal-200"
                        >
                          <div className="relative mr-3 flex-shrink-0">
                            <img
                              src={sub.logo}
                              alt={`${sub.name} logo`}
                              className="h-6 w-6 object-contain transition-transform duration-200 group-hover/sub:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-foreground group-hover/sub:text-navy transition-colors block truncate">
                              {sub.name}
                            </span>
                            {sub.brief && (
                              <span className="text-xs text-muted-foreground group-hover/sub:text-foreground transition-colors block truncate">
                                {sub.brief}
                              </span>
                            )}
                          </div>
                          <svg
                            className="w-3 h-3 text-teal opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200 flex-shrink-0"
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
                        {subIndex < company.subCompanies.length - 1 && (
                          <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent my-1"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.02)_1px,transparent_0)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sortedClients.length > 0 && (
          <>
            <motion.div
              className="text-center mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="inline-block px-4 py-2 bg-teal-50 text-teal rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
                Valued Clients
              </div>
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2"
                variants={sectionVariants}
              >
                Our Clients
              </motion.h2>
              <motion.div
                className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md mb-3"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.p
                className="text-lg text-slate-600 text-center max-w-2xl mx-auto mt-0 leading-relaxed font-semibold"
                variants={sectionVariants}
              >
                Trusted clients we empower with tailored solutions and
                exceptional service
              </motion.p>
            </motion.div>

            <div className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {sortedClients.map((client, index) => (
                  <CompanyCard
                    key={client.id}
                    company={client}
                    index={index}
                    hasSubCompanies={
                      client.subCompanies && client.subCompanies.length > 0
                    }
                    expanded={expandedClients[client.id]}
                    onToggle={toggleClientExpansion}
                    isPartner={false}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
