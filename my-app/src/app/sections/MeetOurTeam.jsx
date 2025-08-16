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
  const [modalIndex, setModalIndex] = useState(null);

  return (
    <section className="min-h-screen flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.2]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          Meet Our Leadership
        </motion.h2>
        <motion.div
          className="mt-2 mx-auto h-1 w-24 bg-primary rounded-full shadow-md shadow-primary-light"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      {/* Compact Header */}
      <motion.div
        className="px-4 sm:px-8 py-6 border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Experienced founders{" "}
              <span className="text-primary">driving innovation</span>
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex-1 p-4 sm:p-8 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto h-full"
          variants={animations.container}
          initial="hidden"
          animate="visible"
        >
          {/* Founders Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                variants={animations.item}
                className="relative group cursor-pointer h-[28rem] sm:h-[36rem] lg:h-[40rem] rounded-xl bg-card shadow-lg shadow-primary/10 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/20"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-contain object-center"
                    style={{ imageRendering: "auto" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                  <motion.div
                    className="text-white"
                    animate={{
                      y: activeIndex === index ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                      {founder.name}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base mb-4 font-medium">
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
                          className="text-white/80 text-xs sm:text-sm line-clamp-2"
                        >
                          {item}
                        </div>
                      ))}
                      {founder.career.length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalIndex(index);
                          }}
                          className="text-white/80 hover:text-white text-xs sm:text-sm italic underline"
                        >
                          +{founder.career.length - 3} more achievements
                        </button>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Stats */}
      <motion.div
        className="px-4 sm:px-8 py-4 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4 sm:gap-0">
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
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-xl shadow-xl max-w-lg w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Header */}
              <div className="relative w-full h-[20rem] sm:h-[24rem] overflow-hidden">
                <img
                  src={founders[modalIndex].image}
                  alt={founders[modalIndex].name}
                  className="w-full h-full object-contain object-center"
                  style={{ imageRendering: "auto" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg sm:text-xl font-bold">
                    {founders[modalIndex].name}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {founders[modalIndex].education}
                  </p>
                </div>
                <button
                  onClick={() => setModalIndex(null)}
                  className="absolute top-3 right-3 text-white text-2xl hover:text-white/80"
                >
                  &times;
                </button>
              </div>

              {/* Achievements List */}
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Achievements
                </h3>
                <ul className="space-y-3">
                  {founders[modalIndex].career.map((item, idx) => (
                    <li key={idx} className="text-foreground text-sm">
                      {item}
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
