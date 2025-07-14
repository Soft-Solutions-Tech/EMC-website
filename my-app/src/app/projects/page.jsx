"use client";
import React, { useState, useMemo, useEffect } from "react";
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
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <span
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border ${getStatusColor(
          status
        )}`}
      >
        <BriefcaseBusiness className="w-4 h-4" />
        {status}
      </span>
      <span className="flex items-center gap-2 bg-slate-50 text-slate-700 rounded-full px-4 py-2 text-sm font-medium border border-slate-200">
        <User className="w-4 h-4" />
        {client}
      </span>
      <span className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium border border-blue-200">
        <BadgeDollarSign className="w-4 h-4" />
        {value}
      </span>
    </div>
  );
}

function Timeline({ start, end }) {
  return (
    <div className="flex items-center gap-3 mb-4 text-sm text-slate-600">
      <div className="flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-teal-600" />
        <span className="font-medium">{formatDate(start)}</span>
      </div>
      <div className="w-8 h-px bg-slate-300"></div>
      <div className="flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-teal-600" />
        <span className="font-medium">{formatDate(end)}</span>
      </div>
    </div>
  );
}

function Partners({ partners }) {
  if (!partners || partners.length === 0) return null;
  return (
    <div className="flex items-start gap-3 mb-4 text-sm text-slate-600">
      <Users className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium text-slate-800">Partners: </span>
        <span>{partners.join(", ")}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-slate-300 mb-8"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        {project.images && project.images.length > 0 && (
          <div className="lg:w-2/5 relative">
            <div className="relative h-64 lg:h-full bg-slate-100">
              <img
                src={project.images[0]}
                alt={`${project.name} thumbnail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute top-6 right-6">
              <span className="inline-block bg-sky-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
                {project.type}
              </span>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="lg:w-3/5 p-8 lg:p-10">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span className="text-slate-600 font-medium">
              {project.location}
            </span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 hover:text-sky-500 transition-colors duration-300 leading-tight">
            {project.name}
          </h3>

          <p className="text-slate-600 mb-6 text-base leading-relaxed">
            {project.description}
          </p>

          <InfoBar
            status={project.status}
            client={project.client}
            value={project.value}
          />

          <Timeline start={project.startDate} end={project.endDate} />

          <Partners partners={project.partners} />

          <div className="pt-4 border-t border-slate-100">
            <a
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
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

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentType = searchParams.get("type")?.toUpperCase() || "ALL";
  const [projectType, setProjectType] = useState(currentType);
  const [isLoading, setIsLoading] = useState(false);

  // Sync projectType with searchParams
  useEffect(() => {
    setProjectType(currentType);
  }, [currentType]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by type
    if (projectType !== "ALL") {
      result = result.filter((project) => project.type === projectType);
    }

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
    router.replace(`/projects?type=${type}`, { scroll: false });
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
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Title */}
          <div className="mb-16 text-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-slate-800 leading-[1.15] pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {projectType === "ALL"
                ? "Our Projects"
                : `${projectType} Projects`}
            </motion.h1>
            <motion.div
              className="mt-6 mx-auto h-1.5 w-32 bg-gradient-to-r from-sky-500 to-teal-600 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.p
              className="mt-6 text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Discover our comprehensive portfolio of engineering excellence and
              innovative solutions across diverse industries
            </motion.p>
          </div>

          {/* Filter Bar */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-3"
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
                    ? "bg-sky-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    projectType === option.value
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Project List */}
          <AnimatePresence>
            <div className="space-y-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent"></div>
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
                  <Building2 className="w-20 h-20 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    No projects found
                  </h3>
                  <p className="text-slate-600 text-lg">
                    No projects found for this category
                  </p>
                </motion.div>
              )}
            </div>
          </AnimatePresence>

          {/* Back Button */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button
              onClick={() => router.push("/")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
