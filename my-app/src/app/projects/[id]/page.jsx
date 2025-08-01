"use client";
import React, { useEffect } from "react";
import { projects } from "../../../../data/projects";
import { formatDate } from "@/app/sections/Portoflio";
import {
  ArrowRight,
  Building2,
  MapPin,
  CalendarClock,
  User,
  Users,
  BadgeDollarSign,
  BriefcaseBusiness
} from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter, useParams } from "next/navigation";

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id?.toString();
  const project = projects.find((p) => p.id.toString() === projectId);

  // Redirect to projects page after 3 seconds if project not found
  useEffect(() => {
    if (!project) {
      const timer = setTimeout(() => {
        router.push("/projects?type=ALL");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [project, router]);

  if (!project) {
    return (
      <section className="py-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Project Not Found
            </h3>
            <p className="text-slate-600 text-lg mb-8">
              The project you're looking for does not exist. Redirecting to
              projects page...
            </p>
            <button
              onClick={() => router.push("/projects?type=ALL")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Projects
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{`${project.name} | Project Details`}</title>
        <meta
          name="description"
          content={`Explore details of ${
            project.name
          }, a ${project.type.toLowerCase()} project showcasing our expertise in ${
            project.location
          }.`}
        />
      </Head>
      <section className="py-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="mb-16 text-center">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {project.name}
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
              {project.type} Project in {project.location}
            </motion.p>
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative h-64 sm:h-72 bg-slate-100 rounded-xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={image}
                      alt={`${project.name} image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span className="text-slate-600 font-medium">
                {project.location}
              </span>
            </div>

            <InfoBar
              status={project.status}
              client={project.client}
              value={project.value}
            />

            <Timeline start={project.startDate} end={project.endDate} />

            <Partners partners={project.partners} />

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Project Overview
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => router.push(`/projects?type=${project.type}`)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to {project.type} Projects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}