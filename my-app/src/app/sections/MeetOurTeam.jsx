"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { founders } from "../../../data/about";

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
};

export default function MeetOurTeam() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalIndex, setModalIndex] = useState(null); // For modal

  return (
    <section className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-4 sm:mb-6">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.2]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          className="mt-2 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      {/* Compact Header */}
      <motion.div
        className="px-8 py-6 border-b border-slate-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Our <span className="text-primary">Leadership</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base mt-1">
              Experienced founders driving innovation
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-4 h-1 bg-primary/50 rounded-full"></div>
            <div className="w-2 h-1 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex-1 p-8 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto h-full"
          variants={animations.container}
          initial="hidden"
          animate="visible"
        >
          {/* Founders Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                variants={animations.item}
                className="relative group cursor-pointer h-full"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20 group-hover:from-primary/90 group-hover:via-primary/40 group-hover:to-primary/20 transition-all duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <motion.div
                    className="text-white"
                    animate={{
                      y: activeIndex === index ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">
                      {founder.name}
                    </h2>
                    <p className="text-white/90 text-sm lg:text-base mb-4 font-medium">
                      {founder.education}
                    </p>

                    {/* Experience Preview */}
                    <motion.div
                      className="space-y-2 overflow-hidden"
                      animate={{
                        height: activeIndex === index ? "auto" : "0",
                        opacity: activeIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {founder.career.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-2 text-white/80 text-xs lg:text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                          <span className="line-clamp-2">{item}</span>
                        </div>
                      ))}
                      {founder.career.length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalIndex(index);
                          }}
                          className="text-white/80 hover:text-white text-xs italic underline"
                        >
                          +{founder.career.length - 3} more achievements
                        </button>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    animate={{
                      scale: activeIndex === index ? 1.2 : 1,
                      rotate: activeIndex === index ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-6 h-6 border-2 border-white/80 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Stats */}
      <motion.div
        className="px-8 py-4 border-t border-slate-100 bg-slate-50/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-slate-600">
          <span>{founders.length} Founding Members</span>
          <span>
            Combined {founders.reduce((acc, f) => acc + f.career.length, 0)}+
            Years Experience
          </span>
          <span>Industry Leaders</span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg max-w-lg w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Header */}
              {/* Image Header */}
              <div className="relative w-full max-h-[300px] overflow-hidden bg-black">
                <img
                  src={founders[modalIndex].image}
                  alt={founders[modalIndex].name}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-bold">
                    {founders[modalIndex].name}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {founders[modalIndex].education}
                  </p>
                </div>
                <button
                  onClick={() => setModalIndex(null)}
                  className="absolute top-3 right-3 text-white text-2xl hover:text-gray-200"
                >
                  &times;
                </button>
              </div>

              {/* Achievements List */}
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3 text-slate-900">
                  Achievements
                </h3>
                <ul className="space-y-3">
                  {founders[modalIndex].career.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-2 text-slate-700 text-sm"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
