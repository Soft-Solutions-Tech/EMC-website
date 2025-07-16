"use client";
import React, { useEffect } from "react";
import { projects } from "../../../../data/projects";
import { InfoBar, Timeline, Partners } from "@/app/sections/Portoflio";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";

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
      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Project Not Found
            </h3>
            <p className="text-slate-600 mb-6">
              The project you're looking for does not exist. Redirecting to
              projects page...
            </p>
            <button
              onClick={() => router.push("/projects?type=ALL")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
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
      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="mb-12 text-center">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {project.name}{" "}
            </motion.h1>
            <motion.div
              className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />{" "}
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              {project.type} Project in {project.location}
            </p>
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative h-64 bg-slate-100 rounded-lg overflow-hidden"
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
          <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
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

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">
                Project Overview
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => router.push(`/projects?type=${project.type}`)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to {project.type} Projects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
