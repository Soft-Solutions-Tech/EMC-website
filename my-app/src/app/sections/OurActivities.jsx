"use client";
import { motion } from "framer-motion";
import { Globe, Package, HardHat, Users, ClipboardCheck } from "lucide-react";
import { activities } from "../../../data/activities";

// Shared animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  icon: {
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

// Icon mapping for five activities with descriptive labels
const activityIcons = [
  {
    icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    label: "International Representation",
  },
  {
    icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    label: "Equipment Import",
  },
  {
    icon: <HardHat className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    label: "Electromechanical Projects",
  },
  {
    icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    label: "Outsourcing Services",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    label: "Project Management",
  },
];

// Components
const PageHeader = () => (
  <motion.div
    className="py-16 sm:py-20 text-center bg-gradient-to-b from-muted to-white"
    variants={animations.container}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-tight"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      Our Activities
    </motion.h1>
    <motion.div
      className="mt-6 mx-auto h-1.5 w-32 bg-primary rounded-full shadow-md shadow-primary/50"
      initial={{ width: 0 }}
      whileInView={{ width: 128 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
    <motion.p
      variants={animations.item}
      className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto px-4 sm:px-6"
    >
      Explore the diverse range of services and projects we deliver with
      excellence.
    </motion.p>
  </motion.div>
);

const ActivityCard = ({ activity, index }) => (
  <motion.div
    className="relative w-full max-w-[360px] mx-auto p-6 sm:p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-muted focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
    variants={animations.card}
    role="article"
    aria-labelledby={`activity-${activity.id}`}
    tabIndex={0}
  >
    <motion.div
      variants={animations.item}
      className="flex flex-col items-center text-center space-y-4"
    >
      <motion.div
        variants={animations.icon}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center"
        aria-label={activityIcons[index].label}
      >
        {activityIcons[index].icon}
      </motion.div>
      <motion.h2
        id={`activity-${activity.id}`}
        variants={animations.item}
        className="text-lg sm:text-xl font-semibold text-primary"
      >
        {activityIcons[index].label}
      </motion.h2>
      <motion.p
        variants={animations.item}
        className="text-sm sm:text-base text-muted-foreground leading-relaxed"
      >
        {activity.description}
      </motion.p>
    </motion.div>
  </motion.div>
);

const Footer = () => (
  <motion.div
    className="py-8 text-center bg-gradient-to-t from-muted to-white"
    variants={animations.item}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto px-4">
      Our activities reflect our commitment to innovation and quality in every
      project we undertake.
    </p>
  </motion.div>
);

// Main component
export default function OurActivities() {
  return (
    <section className="bg-muted">
      <PageHeader />
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-7xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {activities.slice(0, 5).map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </motion.div>
      </div>
      <Footer />
    </section>
  );
}
