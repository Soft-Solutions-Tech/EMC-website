"use client";

import { motion } from "framer-motion";
import { founders } from "../../../data/about";

// Shared animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
  card: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
  image: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
};

// Components
const PageHeader = () => (
  <motion.div
    className="py-16 sm:py-20 text-center bg-gradient-to-b from-gray-50 to-white"
    variants={animations.container}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] via-teal-500 to-[#00263A] leading-tight"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      Meet Our Founders
    </motion.h1>
    <motion.div
      className="mt-6 mx-auto h-1.5 w-32 bg-[#00AEEF] rounded-full shadow-md shadow-[#00AEEF]/50"
      initial={{ width: 0 }}
      whileInView={{ width: 128 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
    />
    <motion.p
      variants={animations.item}
      className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto px-6"
    >
      Discover the visionaries driving our mission with expertise and
      innovation.
    </motion.p>
  </motion.div>
);

const FounderCard = ({ founder }) => (
  <motion.div
    className="relative p-6 sm:p-8 bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl"
    variants={animations.card}
    role="article"
    aria-labelledby={`founder-${founder.name
      .replace(/\s+/g, "-")
      .toLowerCase()}`}
  >
    <div className="flex flex-col items-center text-center">
      <motion.img
        src={founder.image}
        alt={founder.name}
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover mb-6 border-4 border-[#00AEEF]/20 shadow-md"
        variants={animations.image}
      />
      <motion.h2
        id={`founder-${founder.name.replace(/\s+/g, "-").toLowerCase()}`}
        variants={animations.item}
        className="text-2xl sm:text-3xl font-bold text-[#00263A] mb-3"
      >
        {founder.name}
      </motion.h2>
      <motion.p
        variants={animations.item}
        className="text-base sm:text-lg text-slate-600 mb-6 italic"
      >
        {founder.education}
      </motion.p>
      <motion.ul
        variants={animations.container}
        className="text-left text-sm sm:text-base text-slate-700 space-y-3 w-full"
      >
        {founder.career.map((item, index) => (
          <motion.li
            key={index}
            variants={animations.item}
            className="flex items-start"
          >
            <span className="mr-3 text-[#00AEEF] font-semibold">•</span>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </motion.div>
);

const Footer = () => (
  <motion.div
    className="py-8 text-center bg-gradient-to-t from-gray-50 to-white"
    variants={animations.item}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto px-4">
      Our founders' expertise shapes our vision for a sustainable and innovative
      future.
    </p>
  </motion.div>
);

// Main component
export default function MeetOurTeam() {
  return (
    <section className="bg-gray-50">
      <PageHeader />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} />
          ))}
        </motion.div>
      </div>
      <Footer />
    </section>
  );
}
