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

const InfoBadge = ({ icon: Icon, text, className = "" }) => (
  <span
    className={`flex items-center gap-2 bg-slate-50 text-slate-700 rounded-full px-4 py-2 text-sm font-medium border border-slate-200 ${className}`}
  >
    <Icon className="w-4 h-4 text-accent" />
    {text}
  </span>
);

const Timeline = ({ start, end }) => (
  <div className="flex items-center gap-3 mb-4 text-sm text-slate-600">
    <div className="flex items-center gap-2">
      <CalendarClock className="w-4 h-4 text-teal-600" />
      <span className="font-medium">{formatDate(start)}</span>
    </div>
    <ArrowRight className="w-4 h-4 text-slate-400" />
    <div className="flex items-center gap-2">
      <CalendarClock className="w-4 h-4 text-teal-600" />
      <span className="font-medium">{formatDate(end)}</span>
    </div>
  </div>
);

const InfoBar = ({ status, client, value }) => (
  <div className="flex flex-wrap gap-4 mb-6 items-center justify-start">
    <InfoBadge icon={BriefcaseBusiness} text={status} />
    <InfoBadge icon={BadgeDollarSign} text={value} />
    <InfoBadge icon={User} text={client} />
  </div>
);

const Partners = ({ partners }) => {
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
};

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-slate-300 mb-12"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="flex flex-col lg:flex-row">
        {project.images && project.images.length > 0 && (
          <div className="lg:w-2/5 relative">
            <div className="relative h-64 lg:h-full bg-slate-100">
              <img
                src={project.images[0]}
                alt={`${project.name} thumbnail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-block bg-sky-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
                {project.type}
              </span>
            </div>
          </div>
        )}

        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <span className="text-slate-600 font-medium">
              {project.location}
            </span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 hover:text-sky-500 transition-colors duration-300 leading-tight">
            {project.name}
          </h3>

          <p className="text-slate-600 mb-6 text-base leading-relaxed flex-grow">
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
    let result = projects;
    if (projectType !== "ALL") {
      result = result.filter((project) => project.type === projectType);
    }
    return result;
  }, [projectType]);

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

  const handleTypeChange = (type) => {
    setProjectType(type);
    router.replace(`/projects?type=${type}`, { scroll: false });
  };

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {projectType === "ALL" ? "Our Projects" : `${projectType} Projects`}
          </motion.h1>
          <motion.div
            className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md"
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

        <AnimatePresence>
          <div className="space-y-12">
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
  );
}

// Final export: wrap inner page in Suspense
export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | Our Portfolio</title>
        <meta name="description" content="Explore our portfolio of projects." />
      </Head>
      <Suspense
        fallback={<div className="text-center py-20">Loading projects...</div>}
      >
        <ProjectsPageInner />
      </Suspense>
    </>
  );
}