"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { founders, companyOverview } from "../../../data/about";
import { X } from "lucide-react";

// Animation variants for consistent motion
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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
  card: {
    rest: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
  content: {
    rest: {
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -6,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
  careerSection: {
    rest: {
      height: "100px",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    hover: {
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
};

export default function MeetOurTeam() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);

  // Calculate statistics
  const totalExperience = founders.reduce(
    (acc, founder) => acc + founder.career.length,
    0
  );
  const yearsInBusiness =
    new Date().getFullYear() - parseInt(companyOverview.established);

  const handleCardHover = (index) => {
    setActiveIndex(index);
  };

  const handleCardLeave = () => {
    setActiveIndex(null);
  };

  const openModal = (index) => {
    setModalIndex(index);
  };

  const closeModal = () => {
    setModalIndex(null);
  };

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Leadership
          </motion.h1>

          <motion.div
            className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md mb-5"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Statistics Banner */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-12 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary mb-2">
                {yearsInBusiness}+
              </span>
              <span className="text-muted-foreground font-medium text-sm uppercase tracking-wide">
                Years of Excellence
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary mb-2">
                {founders.length}
              </span>
              <span className="text-muted-foreground font-medium text-sm uppercase tracking-wide">
                Founding Members
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary mb-2">
                {totalExperience}+
              </span>
              <span className="text-muted-foreground font-medium text-sm uppercase tracking-wide">
                Combined Experience
              </span>
            </div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={animations.container}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                variants={animations.item}
                className="group cursor-pointer"
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                onClick={() => openModal(index)}
              >
                <motion.div
                  className="relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm border border-muted shadow-xl shadow-primary/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/20"
                  variants={animations.card}
                  animate={activeIndex === index ? "hover" : "rest"}
                >
                  {/* Image Container */}
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={founder.image}
                      alt={`${founder.name} - Leadership Team`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      style={{
                        imageRendering: "high-quality",
                        objectPosition: "50% 20%",
                      }}
                      loading="lazy"
                    />

                    {/* Subtle gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="relative p-8 bg-gradient-to-br from-card to-muted/20">
                    <motion.div
                      variants={animations.content}
                      animate={activeIndex === index ? "hover" : "rest"}
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {founder.name}
                      </h3>

                      <p className="text-muted-foreground text-base mb-6 leading-relaxed font-medium">
                        {founder.education}
                      </p>

                      {/* Career Preview */}
                      <motion.div
                        className="space-y-3 overflow-hidden"
                        variants={animations.careerSection}
                        animate={activeIndex === index ? "hover" : "rest"}
                      >
                        <div className="space-y-3">
                          {founder.career.map((item, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start gap-3 text-muted-foreground text-sm"
                              initial={false}
                              animate={{
                                opacity:
                                  idx < 3 || activeIndex === index ? 1 : 0,
                                x: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: activeIndex === index ? idx * 0.05 : 0,
                              }}
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-card/95 backdrop-blur-md border border-muted rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 sm:h-80 overflow-hidden flex-shrink-0">
                <img
                  src={founders[modalIndex].image}
                  alt={`${founders[modalIndex].name} - Leadership Profile`}
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "50% 20%" }}
                />

                {/* Subtle gradient for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110" />
                </button>

                {/* Modal Title */}
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                    {founders[modalIndex].name}
                  </h2>
                  <p className="text-white/95 text-base sm:text-lg font-medium drop-shadow-md">
                    {founders[modalIndex].education}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-6 sm:h-8 bg-primary rounded-full" />
                  Professional Journey
                </h3>

                <div className="space-y-4 pb-4">
                  {founders[modalIndex].career.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                        <span className="text-primary-foreground text-xs sm:text-sm font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
