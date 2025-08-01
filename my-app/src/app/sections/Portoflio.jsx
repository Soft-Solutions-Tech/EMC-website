"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  projects,
  sectionHeadings,
  portfolioTitle,
} from "../../../data/projects.js";
import {
  User,
  BriefcaseBusiness,
  BadgeDollarSign,
  CalendarClock,
  Users,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Constants
const CAROUSEL_DURATION = 5000;
const PROGRESS_UPDATE_INTERVAL = 30;

// Utility functions
const formatDate = (dateStr) => {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getBorderColor = (index) => {
  return index === 1 ? "#00263A" : "#00AEEF";
};

// Subcomponents
const InfoBadge = ({ icon: Icon, text, className = "" }) => (
  <span
    className={`flex items-center gap-1.5 sm:gap-2 bg-slate-50 text-slate-700 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-slate-200 whitespace-nowrap ${className}`}
  >
    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
    <span className="truncate">{text}</span>
  </span>
);

export const InfoBar = ({ status, client, value }) => (
  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 items-center justify-center max-w-full">
    <InfoBadge icon={BriefcaseBusiness} text={status} />
    <InfoBadge icon={BadgeDollarSign} text={value} />
    <InfoBadge icon={User} text={client} />
  </div>
);

export const Timeline = ({ start, end }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
    <div className="flex items-center gap-1.5 sm:gap-2">
      <CalendarClock className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
      <span className="font-medium">{formatDate(start)}</span>
    </div>
    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 hidden sm:block" />
    <div className="flex items-center gap-1.5 sm:gap-2">
      <CalendarClock className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
      <span className="font-medium">{formatDate(end)}</span>
    </div>
  </div>
);

export const Partners = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="font-medium text-slate-800">Partners: </span>
        <span className="break-words">{partners.join(", ")}</span>
      </div>
    </div>
  );
};

// Carousel pagination dot component
const PaginationDot = ({ index, isActive, progress, borderColor, onClick }) => {
  const radius = 6;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = isActive ? circumference * (1 - progress) : circumference;

  return (
    <button
      className="relative w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center bg-transparent p-0 border-none outline-none touch-manipulation"
      onClick={() => onClick(index)}
      aria-label={`Go to image ${index + 1}`}
    >
      <span
        className={`absolute w-full h-full rounded-full bg-white/70 border border-white ${
          isActive ? "shadow-lg" : ""
        }`}
      />
      <svg
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        style={{ pointerEvents: "none" }}
        viewBox="0 0 16 16"
      >
        <circle
          cx={8}
          cy={8}
          r={radius}
          fill="none"
          stroke={borderColor}
          strokeWidth={2}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{
            transition: isActive ? "stroke-dashoffset 0.1s linear" : "none",
          }}
        />
      </svg>
      <span
        className={`relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white ${
          isActive ? "bg-accent" : ""
        }`}
      />
    </button>
  );
};

// Image carousel component
const ProjectImageCarousel = ({ images, projectName, borderColor }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const numImages = images.length;

  // Cleanup function
  const cleanup = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goTo = (idx) => {
    setCurrent(idx);
    setProgress(0);
  };

  useEffect(() => {
    setProgress(0);
    cleanup();

    // Animate progress
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / CAROUSEL_DURATION, 1));
    }, PROGRESS_UPDATE_INTERVAL);

    // Auto-advance to next image
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % numImages);
    }, CAROUSEL_DURATION);

    return cleanup;
  }, [current, numImages]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full aspect-video sm:aspect-square lg:aspect-video flex items-center justify-center overflow-hidden group rounded-lg">
      {/* Image container */}
      <div
        className="w-full h-full flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={`${projectName}-${idx}`}
            src={img}
            alt={`${projectName} image ${idx + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%", minHeight: "100%" }}
            draggable={false}
          />
        ))}
      </div>

      {/* Pagination dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
          {images.map((_, idx) => (
            <PaginationDot
              key={idx}
              index={idx}
              isActive={current === idx}
              progress={progress}
              borderColor={borderColor}
              onClick={goTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Section heading component
const SectionHeading = ({ heading, className = "" }) => (
  <div className={`mb-6 sm:mb-8 text-center px-4 ${className}`}>
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-tight pb-2">
      {heading.label}
    </h3>
    {heading.desc && (
      <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto mt-3 sm:mt-6 leading-relaxed font-medium px-2">
        {heading.desc.map((desc, index) => (
          <span key={index}>
            {desc}
            {index < heading.desc.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    )}
  </div>
);

// Project actions component
const ProjectActions = ({ projectId, consultingCta }) => (
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full mt-3 sm:mt-4">
    <a
      href={`/projects/${projectId}`}
      className="bg-accent text-white px-3 py-2 sm:px-4 sm:py-3 lg:py-4 rounded-lg font-semibold shadow hover:bg-accent/90 transition text-xs sm:text-sm w-full text-center touch-manipulation"
    >
      Explore this project
    </a>
    <a
      href="/projects?type=CONSULTING"
      className="bg-primary text-white px-3 py-2 sm:px-4 sm:py-3 lg:py-4 rounded-lg font-semibold shadow hover:bg-primary/90 transition text-xs sm:text-sm w-full text-center touch-manipulation"
    >
      {consultingCta || "Explore consulting"}
    </a>
  </div>
);

// Project content component
const ProjectContent = ({ project, index }) => {
  const isEvenIndex = index % 2 === 0;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center h-full px-2 sm:px-4 ${
        !isEvenIndex ? "order-2 lg:order-1" : "order-2"
      }`}
    >
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-navy mb-2 sm:mb-3 leading-tight">
        {project.name}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed px-2">
        {project.description}
      </p>
      <div className="w-full max-w-md">
        <InfoBar
          status={project.status}
          client={project.client}
          value={project.value}
        />
        <Timeline start={project.startDate} end={project.endDate} />
        <Partners partners={project.partners} />
      </div>

      <ProjectActions
        projectId={project.id}
        consultingCta={project.consultingCta}
      />
    </div>
  );
};

// Project card component
const ProjectCard = ({ project, index }) => {
  const isEvenIndex = index % 2 === 0;
  const borderColor = getBorderColor(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 items-stretch gap-4 sm:gap-6 lg:gap-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] ${
        isEvenIndex ? "bg-gray-50" : "bg-white"
      }`}
    >
      {/* Image Section */}
      <div
        className={`flex items-center justify-center h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] ${
          !isEvenIndex ? "order-1 lg:order-2" : "order-1"
        }`}
      >
        {project.images?.length > 0 && (
          <ProjectImageCarousel
            images={project.images}
            projectName={project.name}
            borderColor={borderColor}
          />
        )}
      </div>

      {/* Content Section */}
      <ProjectContent project={project} index={index} />
    </motion.div>
  );
};

// Main component
const PortfolioSection = () => {
  const featuredProjects = useMemo(() => {
    const types = ["EPC", "CONSULTING", "AFTERSALES"];
    return types
      .map((type) => projects.find((project) => project.type === type))
      .filter(Boolean);
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-tight pb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {portfolioTitle}
          </motion.h2>

          <motion.div
            className="mt-3 sm:mt-4 mx-auto h-0.5 sm:h-1 w-16 sm:w-24 lg:w-32 bg-accent rounded-full shadow-accent shadow-md mb-2 sm:mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => {
            const heading = sectionHeadings.find((h) => h.idx === index);

            return (
              <React.Fragment key={project.id}>
                {heading && (
                  <SectionHeading
                    heading={heading}
                    className={index === 0 ? "mt-0" : "mt-2 sm:mt-4"}
                  />
                )}
                <ProjectCard project={project} index={index} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
