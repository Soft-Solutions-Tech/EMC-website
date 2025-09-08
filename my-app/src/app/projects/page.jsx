"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { projects, ProjectType } from "../../../data/projects";
import { formatDate } from "../sections/Portoflio";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Building2,
  MapPin,
  CalendarClock,
  User,
  Users,
  BadgeDollarSign,
  BriefcaseBusiness,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

// Utility functions
const getProjectTypes = () => {
  return Object.values(ProjectType);
};

const getProjectsByType = (type) => {
  return projects.filter((project) => project.type === type);
};

const getProjectTypeLabel = (type) => {
  const typeLabels = {
    [ProjectType.EPC]: "EPC Projects",
    [ProjectType.CONSULTING]: "Consulting Projects",
    [ProjectType.AFTERSALES]: "After Sales Projects",
  };

  return (
    typeLabels[type] ||
    `${type.charAt(0) + type.slice(1).toLowerCase()} Projects`
  );
};

// Subcomponents
const InfoBadge = ({ icon: Icon, text, className = "" }) => {
  if (!text) return null;

  return (
    <span
      className={`flex items-center gap-2 bg-muted text-muted-foreground rounded-full px-4 py-2 text-sm font-medium border border-muted ${className}`}
    >
      <Icon className="w-4 h-4 text-primary" />
      {text}
    </span>
  );
};

const Timeline = ({ start, end }) => {
  // Don't render if neither start nor end date exists
  if (!start && !end) return null;

  return (
    <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-primary" />
        <span className="font-medium">{formatDate(start) || "N/A"}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground" />
      <div className="flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-primary" />
        <span className="font-medium">{formatDate(end)}</span>
      </div>
    </div>
  );
};

const InfoBar = ({ status, client, value, location }) => {
  const infoItems = [
    { icon: BriefcaseBusiness, text: status },
    { icon: BadgeDollarSign, text: value },
    { icon: User, text: client },
  ];

  // Filter out items with no text
  const validItems = infoItems.filter((item) => item.text);

  if (validItems.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center justify-start">
      {validItems.map((item, index) => (
        <InfoBadge key={index} icon={item.icon} text={item.text} />
      ))}
    </div>
  );
};

const Partners = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="flex items-start gap-3 mb-4 text-sm text-muted-foreground">
      <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium text-foreground">Partners: </span>
        <span>{partners.join(", ")}</span>
      </div>
    </div>
  );
};

const LocationDisplay = ({ location }) => {
  if (!location) return null;

  return (
    <div className="flex items-center gap-3 mb-4">
      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="text-muted-foreground font-medium">{location}</span>
    </div>
  );
};

const ProjectImage = ({ images, name, type }) => {
  if (!images || images.length === 0) {
    return (
      <div className="lg:w-2/5 relative">
        <div className="relative h-64 lg:h-full bg-muted flex items-center justify-center">
          <Building2 className="w-16 h-16 text-muted-foreground/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        {type && (
          <div className="absolute top-4 right-4">
            <span className="inline-block bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
              {type}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="lg:w-2/5 relative">
      <div className="relative h-64 lg:h-full bg-muted">
        <img
          src={images[0]}
          alt={`${name} thumbnail`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML =
              '<div class="w-full h-full flex items-center justify-center bg-muted"><svg class="w-16 h-16 text-muted-foreground/50" fill="currentColor" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></div>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {type && (
        <div className="absolute top-4 right-4">
          <span className="inline-block bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
            {type}
          </span>
        </div>
      )}
    </div>
  );
};

function ProjectCard({ project, index }) {
  if (!project) return null;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-muted shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-muted-foreground/50 mb-12"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="flex flex-col lg:flex-row">
        <ProjectImage
          images={project.images}
          name={project.name}
          type={project.type}
        />

        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col">
          <LocationDisplay location={project.location} />

          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors duration-300 leading-tight">
            {project.name || "Untitled Project"}
          </h3>

          {project.description && (
            <p className="text-muted-foreground mb-6 text-base leading-relaxed flex-grow">
              {project.description}
            </p>
          )}

          <InfoBar
            status={project.status}
            client={project.client}
            value={project.value}
            location={project.location}
          />

          <Timeline start={project.startDate} end={project.endDate} />

          <Partners partners={project.partners} />

          <div className="pt-4 border-t border-muted">
            <a
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>Explore Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentType = searchParams.get("type")?.toUpperCase() || "ALL";
  const [projectType, setProjectType] = useState(currentType);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProjectType(currentType);
  }, [currentType]);

  const filteredProjects = useMemo(() => {
    let result = projects || [];
    if (projectType !== "ALL") {
      result = result.filter((project) => project.type === projectType);
    }
    return result;
  }, [projectType]);

  // Generate filter options dynamically based on available project types
  const filterOptions = useMemo(() => {
    const allOption = {
      value: "ALL",
      label: "All Projects",
      count: projects?.length || 0,
    };

    const typeOptions = getProjectTypes()
      .map((type) => ({
        value: type,
        label: getProjectTypeLabel(type),
        count: getProjectsByType(type).length,
      }))
      .filter((option) => option.count > 0); // Only show types that have projects

    return [allOption, ...typeOptions];
  }, []);

  const handleTypeChange = (type) => {
    setProjectType(type);
    const url = type === "ALL" ? "/projects" : `/projects?type=${type}`;
    router.replace(url, { scroll: false });
  };

  // Generate page title based on current filter
  const getPageTitle = () => {
    if (projectType === "ALL") {
      return "Our Projects";
    }

    const typeLabel = getProjectTypeLabel(projectType);
    return typeLabel;
  };

  // Generate page description based on current filter
  const getPageDescription = () => {
    if (projectType === "ALL") {
      return "Discover our comprehensive portfolio of engineering excellence and innovative solutions across diverse industries";
    }

    const descriptions = {
      [ProjectType.EPC]:
        "Explore our Engineering, Procurement, and Construction projects delivering complete solutions",
      [ProjectType.CONSULTING]:
        "Discover our consulting services and strategic project advisory solutions",
      [ProjectType.AFTERSALES]:
        "Learn about our comprehensive after-sales services, maintenance, and support solutions",
    };

    return (
      descriptions[projectType] ||
      `Explore our ${projectType.toLowerCase()} projects and solutions`
    );
  };

  return (
    <section className="py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {getPageTitle()}
          </motion.h1>
          <motion.div
            className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="mt-6 text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {getPageDescription()}
          </motion.p>
        </div>

        {/* Only show filters if there are multiple options */}
        {filterOptions.length > 1 && (
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTypeChange(option.value)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                  projectType === option.value
                    ? "bg-primary text-primary-foreground shadow-lg transform scale-105"
                    : "bg-white text-muted-foreground hover:bg-muted hover:border-muted-foreground/50 border border-muted"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    projectType === option.value
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          <div className="space-y-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  No projects found
                </h3>
                <p className="text-muted-foreground text-lg">
                  {projectType === "ALL"
                    ? "No projects are currently available"
                    : `No ${projectType.toLowerCase()} projects found`}
                </p>
                {projectType !== "ALL" && (
                  <button
                    onClick={() => handleTypeChange("ALL")}
                    className="mt-4 text-primary hover:text-primary-dark font-semibold transition-colors"
                  >
                    View all projects
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </AnimatePresence>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => router.push("/")}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Final export: wrap inner page in Suspense
export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const currentType = searchParams?.get("type")?.toUpperCase() || "ALL";

  // Generate dynamic meta tags
  const getMetaTitle = () => {
    if (currentType === "ALL") {
      return "Projects | Our Portfolio";
    }
    return `${getProjectTypeLabel(currentType)} | Our Portfolio`;
  };

  const getMetaDescription = () => {
    if (currentType === "ALL") {
      return "Explore our comprehensive portfolio of engineering projects and solutions across EPC, consulting, and after-sales services.";
    }

    const descriptions = {
      [ProjectType.EPC]:
        "Discover our Engineering, Procurement, and Construction projects delivering complete turnkey solutions.",
      [ProjectType.CONSULTING]:
        "Explore our consulting services and strategic project advisory solutions across various industries.",
      [ProjectType.AFTERSALES]:
        "Learn about our comprehensive after-sales services, maintenance, and technical support solutions.",
    };

    return (
      descriptions[currentType] ||
      `Explore our ${currentType.toLowerCase()} projects and engineering solutions.`
    );
  };

  return (
    <>
      <Head>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta
          name="keywords"
          content={`${currentType.toLowerCase()} projects, engineering solutions, portfolio`}
        />
      </Head>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          </div>
        }
      >
        <ProjectsPageInner />
      </Suspense>
    </>
  );
}
