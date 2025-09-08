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
  BriefcaseBusiness,
} from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter, useParams } from "next/navigation";

const InfoBadge = ({ icon: Icon, text, className = "" }) => (
  <span
    className={`flex items-center gap-2 bg-muted text-muted-foreground rounded-full px-4 py-2 text-sm font-medium border border-muted ${className}`}
  >
    <Icon className="w-4 h-4 text-primary" />
    {text}
  </span>
);

const Timeline = ({ start, end }) => (
  <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
    <div className="flex items-center gap-2">
      <CalendarClock className="w-4 h-4 text-primary" />
      <span className="font-medium">{formatDate(start)}</span>
    </div>
    <ArrowRight className="w-4 h-4 text-muted-foreground" />
    <div className="flex items-center gap-2">
      <CalendarClock className="w-4 h-4 text-primary" />
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
    <div className="flex items-start gap-3 mb-4 text-sm text-muted-foreground">
      <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium text-foreground">Partners: </span>
        <span>{partners.join(", ")}</span>
      </div>
    </div>
  );
};

const ImageGallery = ({ images, projectName }) => {
  // Return null if no images exist or array is empty
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  // Filter out any invalid/empty image URLs
  const validImages = images.filter((img) => img && img.trim() !== "");

  if (validImages.length === 0) {
    return null;
  }

  // Determine grid layout based on image count
  const getGridLayout = (count) => {
    if (count === 1) return "grid-cols-1 max-w-2xl mx-auto";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    if (count === 4)
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4";
    if (count <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  // Determine image height based on count and layout
  const getImageHeight = (count) => {
    if (count === 1) return "h-80 sm:h-96";
    if (count === 2) return "h-72 sm:h-80";
    return "h-64 sm:h-72";
  };

  const gridLayout = getGridLayout(validImages.length);
  const imageHeight = getImageHeight(validImages.length);

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className={`grid ${gridLayout} gap-4 sm:gap-6`}>
        {validImages.map((image, idx) => (
          <motion.div
            key={idx}
            className={`relative ${imageHeight} bg-muted rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group`}
          >
            <img
              src={image}
              alt={`${projectName} - Image ${idx + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback for broken images
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback content for broken images */}
            <div className="absolute inset-0 bg-muted hidden items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Image unavailable
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show a subtle indicator if original array had more images than valid ones */}
      {images.length !== validImages.length && validImages.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Showing {validImages.length} of {images.length} images
        </p>
      )}
    </motion.div>
  );
};

const NoImagesPlaceholder = ({ projectName }) => (
  <motion.div
    className="mb-12 text-center py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="bg-muted rounded-xl border border-muted p-8">
      <p className="text-muted-foreground">
        No images available for this project at the moment.
      </p>
    </div>
  </motion.div>
);

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
      <section className="py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Project Not Found
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              The project you're looking for does not exist. Redirecting to
              projects page...
            </p>
            <button
              onClick={() => router.push("/projects?type=ALL")}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Projects
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Check if project has valid images
  const hasValidImages =
    project.images &&
    Array.isArray(project.images) &&
    project.images.some((img) => img && img.trim() !== "");

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
      <section className="py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="mb-16 text-center">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {project.name}
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
              {project.type} Project in {project.location}
            </motion.p>
          </div>

          {/* Conditional Image Gallery or Placeholder */}
          {hasValidImages ? (
            <ImageGallery images={project.images} projectName={project.name} />
          ) : (
            <NoImagesPlaceholder projectName={project.name} />
          )}

          {/* Project Details */}
          <motion.div
            className="bg-muted rounded-xl border border-muted shadow-sm p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: hasValidImages ? 0.8 : 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground font-medium">
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Project Overview
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                {project.description}
              </p>
            </div>
          </motion.div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => router.push(`/projects?type=${project.type}`)}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
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
