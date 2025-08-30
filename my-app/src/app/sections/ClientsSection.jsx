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
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ClientsSection = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalClient, setModalClient] = useState(null);

  const openModal = useCallback((client) => {
    setModalClient(client);
  }, []);

  const closeModal = useCallback(() => {
    setModalClient(null);
  }, []);

  const selectClient = useCallback((client) => {
    setSelectedClient(client);
  }, []);

  const sortedClients = useMemo(() => {
    return [...clients].sort((a, b) => {
      const aHasSub = a.subCompanies && a.subCompanies.length > 0 ? -1 : 1;
      const bHasSub = b.subCompanies && b.subCompanies.length > 0 ? -1 : 1;
      return aHasSub - bHasSub;
    });
  }, []);

  // Auto-select first client on mount
  React.useEffect(() => {
    if (sortedClients.length > 0 && !selectedClient) {
      setSelectedClient(sortedClients[0]);
    }
  }, [sortedClients, selectedClient]);

  return (
    <section className="py-20 relative min-h-screen flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sortedClients.length > 0 && (
          <>
            {/* Header Section */}
            <motion.div
              className="text-center"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
                variants={sectionVariants}
              >
                {clientsSection.title}
              </motion.h2>
              <motion.div
                className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md mb-3"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.p
                className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mt-0 leading-relaxed font-semibold"
                variants={sectionVariants}
              >
                {clientsSection.subtitle}
              </motion.p>
            </motion.div>

            {/* Main Content Area */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid lg:grid-cols-5 min-h-[600px]">
                
                {/* Left Sidebar - Client List */}
                <motion.div
                  className="lg:col-span-2 bg-gray-50/50 border-r border-gray-200"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Client Directory
                    </h3>
                    
                    <div className="space-y-2">
                      {sortedClients.map((client, index) => (
                        <motion.div
                          key={client.id}
                          variants={listItemVariants}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                            selectedClient?.id === client.id
                              ? 'bg-primary text-white border-primary shadow-lg'
                              : 'bg-white hover:bg-primary/5 border-gray-100 hover:border-primary/20'
                          }`}
                          onClick={() => selectClient(client)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              selectedClient?.id === client.id 
                                ? 'bg-white/20' 
                                : 'bg-gray-50'
                            }`}>
                              <img
                                src={client.logo}
                                alt={`${client.name} logo`}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`font-semibold text-sm truncate ${
                                  selectedClient?.id === client.id 
                                    ? 'text-white' 
                                    : 'text-gray-900'
                                }`}>
                                  {client.name}
                                </h4>
                                
                                {client.subCompanies && client.subCompanies.length > 0 && (
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    selectedClient?.id === client.id
                                      ? 'bg-white/20 text-white'
                                      : 'bg-primary/10 text-primary'
                                  }`}>
                                    +{client.subCompanies.length}
                                  </span>
                                )}
                              </div>
                              
                              <p className={`text-xs mt-1 line-clamp-2 ${
                                selectedClient?.id === client.id 
                                  ? 'text-white/80' 
                                  : 'text-gray-500'
                              }`}>
                                {client.brief}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Content Area - Client Details */}
                <motion.div
                  className="lg:col-span-3 p-8"
                  variants={sidebarVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence mode="wait">
                    {selectedClient ? (
                      <motion.div
                        key={selectedClient.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full flex flex-col"
                      >
                        {/* Client Header */}
                        <div className="flex items-start gap-6 mb-8">
                          <motion.div
                            className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={selectedClient.logo}
                              alt={`${selectedClient.name} logo`}
                              className="w-12 h-12 object-contain"
                            />
                          </motion.div>
                          
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {selectedClient.name}
                            </h3>
                            <div className="w-16 h-0.5 bg-primary rounded-full mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                              {selectedClient.brief}
                            </p>
                          </div>
                        </div>

                        {/* Portfolio Section */}
                        {selectedClient.subCompanies && selectedClient.subCompanies.length > 0 && (
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                Portfolio Companies
                              </h4>
                              <button
                                onClick={() => openModal(selectedClient)}
                                className="text-sm text-primary hover:text-primary-dark transition-colors duration-200"
                              >
                                View All ({selectedClient.subCompanies.length})
                              </button>
                            </div>
                            
                            <div className="grid gap-3">
                              {selectedClient.subCompanies.slice(0, 3).map((sub, idx) => (
                                <motion.div
                                  key={sub.id}
                                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                    <img
                                      src={sub.logo}
                                      alt={`${sub.name} logo`}
                                      className="w-6 h-6 object-contain"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 text-sm">
                                      {sub.name}
                                    </h5>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {sub.brief}
                                    </p>
                                  </div>
                                  <a
                                    href={sub.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark transition-colors duration-200"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                </motion.div>
                              ))}
                              
                              {selectedClient.subCompanies.length > 3 && (
                                <button
                                  onClick={() => openModal(selectedClient)}
                                  className="p-3 text-center text-blue-600 hover:text-blue-700 text-sm font-medium rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-300 transition-all duration-200"
                                >
                                  View {selectedClient.subCompanies.length - 3} more companies
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-auto border-t border-gray-100">
                          <div className="flex gap-4">
                            <motion.a
                              href={selectedClient.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center py-3 px-6 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="mr-2">Visit Website</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </motion.a>
                            
                            {selectedClient.subCompanies && selectedClient.subCompanies.length > 0 && (
                              <motion.button
                                onClick={() => openModal(selectedClient)}
                                className="px-6 py-3 border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 text-sm font-medium rounded-xl transition-all duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Portfolio
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <p>Select a client to view details</p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
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
                className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                style={{ zIndex: 10000 }}
              >
                {/* Modal Header */}
                <div className="relative bg-gradient-to-r from-primary to-primary-light p-8 text-white">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

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
                  <div className="grid gap-4 sm:grid-cols-2">
                    {modalClient.subCompanies?.map((sub, idx) => (
                      <motion.div
                        key={sub.id}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-primary/5 transition-all duration-300 border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                          <img
                            src={sub.logo}
                            alt={`${sub.name} logo`}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
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