"use client";
import React, { useState, useMemo } from "react";
import { projects, ProjectType } from "../../../data/projects";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BriefcaseBusiness,
  User,
  BadgeDollarSign,
  CalendarClock,
  Users,
  ArrowRight,
  Building2,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

function formatDate(dateStr) {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

function InfoBar({ status, client, value }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Finished":
        return "bg-green-100 text-green-800 border-green-200";
      case "Active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span
        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(
          status
        )}`}
      >
        <BriefcaseBusiness className="w-3 h-3 text-accent" />
        {status}
      </span>
      <span className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-xs font-medium border border-gray-200">
        <User className="w-3 h-3 text-primary" />
        {client}
      </span>
      <span className="flex items-center gap-1 bg-blue-50 text-blue-800 rounded-full px-3 py-1 text-xs font-medium border border-blue-200">
        <BadgeDollarSign className="w-3 h-3 text-primary" />
        {value}
      </span>
    </div>
  );
}

function Timeline({ start, end }) {
  return (
    <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
      <div className="flex items-center gap-1">
        <CalendarClock className="w-3 h-3 text-teal" />
        <span className="font-medium">{formatDate(start)}</span>
      </div>
      <ArrowRight className="w-3 h-3 text-gray-400" />
      <div className="flex items-center gap-1">
        <CalendarClock className="w-3 h-3 text-teal" />
        <span className="font-medium">{formatDate(end)}</span>
      </div>
    </div>
  );
}

function Partners({ partners }) {
  if (!partners || partners.length === 0) return null;
  return (
    <div className="flex items-start gap-2 mb-3 text-xs text-gray-600">
      <Users className="w-3 h-3 text-teal mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium text-gray-800">Partners: </span>
        <span>{partners.join(", ")}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-accent/50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden">
        {project.images && project.images.length > 0 && (
          <div className="relative h-48 bg-gray-100">
            <img
              src={project.images[0]}
              alt={`${project.name} thumbnail`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            {project.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-teal mt-1 flex-shrink-0" />
          <span className="text-sm text-gray-600 font-medium">
            {project.location}
          </span>
        </div>

        <h3 className="text-xl font-bold text-navy mb-3 hover:text-accent transition-colors duration-300">
          {project.name}
        </h3>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <InfoBar
          status={project.status}
          client={project.client}
          value={project.value}
        />

        <Timeline start={project.startDate} end={project.endDate} />

        <Partners partners={project.partners} />

        <a
          href={`/projects/${project.id}`}
          className="w-full mt-4 bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
        >
          <span>Explore Project</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = searchParams.get("type")?.toUpperCase() || "ALL";
  const [projectType, setProjectType] = useState(initialType);
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects
  const filteredProjects = useMemo(() => {
    setIsLoading(true);
    let result = projects;

    // Filter by type
    if (projectType !== "ALL") {
      result = result.filter((project) => project.type === projectType);
    }

    setTimeout(() => setIsLoading(false), 300);
    return result;
  }, [projectType]);

  // Filter options
  const filterOptions = [
    { value: "ALL", label: "All Projects", count: projects.length },
    {
      value: ProjectType.EPC,
      label: "EPC Projects",
      count: projects.filter((p) => p.type === ProjectType.EPC).length,
    },
    {
      value: ProjectType.CONSULTING,
      label: "Consulting Projects",
      count: projects.filter((p) => p.type === ProjectType.CONSULTING).length,
    },
    {
      value: ProjectType.AFTERSALES,
      label: "After Sales Projects",
      count: projects.filter((p) => p.type === ProjectType.AFTERSALES).length,
    },
  ];

  // Update URL when project type changes
  const handleTypeChange = (type) => {
    setProjectType(type);
    router.push(`/projects?type=${type}`);
  };

  return (
    <>
      <Head>
        <title>{`${
          projectType === "ALL" ? "All Projects" : `${projectType} Projects`
        } | Our Portfolio`}</title>
        <meta
          name="description"
          content={`Explore our ${projectType.toLowerCase()} projects, showcasing our expertise in engineering, consulting, and after-sales services across various industries.`}
        />
      </Head>
      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2">
              {projectType === "ALL"
                ? "All Projects"
                : `${projectType} Projects`}
            </h2>
            <div
              className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(0, 174, 239, 0.3)" }}
            />
            <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our comprehensive portfolio of engineering excellence and
              innovative solutions
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTypeChange(option.value)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  projectType === option.value
                    ? "bg-accent text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
                style={
                  projectType === option.value
                    ? { boxShadow: "0 0 20px rgba(0, 174, 239, 0.3)" }
                    : {}
                }
              >
                <span>{option.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    projectType === option.value
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600">
                    No projects found for this category
                  </p>
                </div>
              )}
            </div>
          </AnimatePresence>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/")}
              className="bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
