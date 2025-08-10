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
export const formatDate = (dateStr) => {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getBorderColor = (index) => {
  return index === 1 ? "#004d6e" : "#006996"; // Uses primary-dark and primary
};

// Subcomponents
const InfoBadge = ({ icon: Icon, text, className = "" }) => (
  <span
    className={`flex items-center gap-2 text-muted-foreground rounded-full px-4 py-2 text-sm font-medium border border-muted ${className}`}
  >
    <Icon className="w-4 h-4 text-primary" />
    {text}
  </span>
);

export const InfoBar = ({ status, client, value }) => (
  <div className="flex flex-wrap gap-3 mb-6 items-center justify-center">
    <InfoBadge icon={BriefcaseBusiness} text={status} />
    <InfoBadge icon={BadgeDollarSign} text={value} />
    <InfoBadge icon={User} text={client} />
  </div>
);

export const Timeline = ({ start, end }) => (
  <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground justify-center">
    <div className="flex items-center gap-2">
      <CalendarClock className="w-4 h-4 text-primary" />
      <span className="font-medium">{formatDate(start)}</span>
    </div>
    <ArrowRight className="w-4 h-4 text-secondary" />
    <div className="flex items-center gap-2">
      <CalendarClock className="w-4 h-4 text-primary" />
      <span className="font-medium">{formatDate(end)}</span>
    </div>
  </div>
);

export const Partners = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="flex items-start gap-3 mb-4 text-sm text-muted-foreground justify-center">
      <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium text-primary">Partners: </span>
        <span>{partners.join(", ")}</span>
      </div>
    </div>
  );
};

// Carousel pagination dot component
const PaginationDot = ({ index, isActive, progress, borderColor, onClick }) => {
  const radius = 7;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = isActive ? circumference * (1 - progress) : circumference;

  return (
    <button
      className="relative w-4 h-4 flex items-center justify-center bg-transparent p-0 border-none outline-none"
      onClick={() => onClick(index)}
      aria-label={`Go to image ${index + 1}`}
    >
      <span
        className={`absolute w-full h-full rounded-full bg-white/70 border border-white ${
          isActive ? "shadow-lg" : ""
        }`}
      />
      <svg
        width={16}
        height={16}
        className="absolute top-0 left-0"
        style={{ pointerEvents: "none" }}
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
        className={`relative w-2 h-2 rounded-full bg-white ${
          isActive ? "bg-primary" : ""
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
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group rounded-lg">
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
  <div className={`mb-12 text-center ${className}`}>
    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2">
      {heading.label}
    </h3>
    {heading.desc && (
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed font-semibold">
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
  <div className="flex flex-col gap-3 w-full mt-6">
    <a
      href={`/projects/${projectId}`}
      className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary-dark transition text-sm w-full text-center"
    >
      Explore this project
    </a>
    <a
      href="/projects?type=CONSULTING"
      className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold shadow hover:bg-secondary-dark transition text-sm w-full text-center"
    >
      {consultingCta || "Explore our consulting projects"}
    </a>
  </div>
);

// Project content component
const ProjectContent = ({ project, index }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full p-6">
      <h3 className="text-xl font-semibold text-primary mb-3">
        {project.name}
      </h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {project.description}
      </p>
      <InfoBar
        status={project.status}
        client={project.client}
        value={project.value}
      />
      <Timeline start={project.startDate} end={project.endDate} />
      <Partners partners={project.partners} />
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
      className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-8 rounded-xl shadow-lg p-8 min-h-[400px] w-full ${
        isEvenIndex ? "bg-muted" : "bg-white"
      }`}
    >
      {/* Image Section */}
      <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
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
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-16 text-center">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {portfolioTitle}
            </motion.h2>
            <motion.div
              className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md mb-3"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {/* Featured Projects */}
          <div className="flex flex-col ">
            {featuredProjects.map((project, index) => {
              const heading = sectionHeadings.find((h) => h.idx === index);

              return (
                <React.Fragment key={project.id}>
                  {heading && (
                    <SectionHeading
                      heading={heading}
                      className={index === 0 ? "mt-0" : "mt-8"}
                    />
                  )}
                  <ProjectCard project={project} index={index} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;
