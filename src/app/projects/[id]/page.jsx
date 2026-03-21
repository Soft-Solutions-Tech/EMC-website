"use client";
import { Partners, Timeline } from "@/app/sections/Portoflio";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  MapPin,
  User,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { projects, ProjectType } from "../../../../data/projects";

// ─── Utilities ────────────────────────────────────────────────────────────────

const getProjectTypeLabel = (type) => {
  const typeLabels = {
    [ProjectType.EPC]: "EPC",
    [ProjectType.CONSULTING]: "Consulting",
    [ProjectType.AFTERSALES]: "After Sales",
  };
  return typeLabels[type] || type?.charAt(0) + type?.slice(1).toLowerCase();
};

const getProjectById = (id) =>
  projects.find((p) => p.id?.toString() === id?.toString());

const getValidImages = (images) => {
  if (!images || !Array.isArray(images)) return [];
  return images.filter(
    (url) => url && typeof url === "string" && url.trim() !== "",
  );
};

// ─── Subcomponents ────────────────────────────────────────────────────────────

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

const InfoBar = ({ status, client, value }) => {
  const infoItems = [
    { icon: BriefcaseBusiness, text: status },
    { icon: BadgeDollarSign, text: value },
    { icon: User, text: client },
  ];
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

const LocationDisplay = ({ location }) => {
  if (!location) return null;
  return (
    <div className="flex items-center gap-3 mb-6">
      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="text-muted-foreground font-medium">{location}</span>
    </div>
  );
};

const ImageGallery = ({ images, projectName }) => {
  const validImages = getValidImages(images);
  if (validImages.length === 0) return null;

  const getGridLayout = (count) => {
    if (count === 1) return "grid-cols-1 max-w-2xl mx-auto";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    if (count === 4)
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4";
    if (count <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  const getImageHeight = (count) => {
    if (count === 1) return "h-80 sm:h-96";
    if (count === 2) return "h-72 sm:h-80";
    return "h-64 sm:h-72";
  };

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div
        className={`grid ${getGridLayout(validImages.length)} gap-4 sm:gap-6`}
      >
        {validImages.map((image, idx) => (
          <motion.div
            key={`${projectName}-${idx}`}
            className={`relative ${getImageHeight(validImages.length)} bg-muted rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
          >
            <Image
              src={image}
              alt={`${projectName || "Project"} - Image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.display = "flex";
                }
              }}
            />
            <div className="absolute inset-0 bg-muted hidden items-center justify-center">
              <div className="text-center">
                <Building2 className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Image unavailable
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {images &&
        images.length !== validImages.length &&
        validImages.length > 0 && (
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Showing {validImages.length} of {images.length} images
          </p>
        )}
    </motion.div>
  );
};

const NoImagesPlaceholder = () => (
  <motion.div
    className="mb-12 text-center py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="bg-muted rounded-xl border border-muted p-8">
      <Building2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
      <p className="text-muted-foreground">
        No images available for this project at the moment.
      </p>
    </div>
  </motion.div>
);

const ProjectNotFound = ({ router }) => (
  <section className="py-24 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Project Not Found
        </h3>
        <p className="text-muted-foreground text-lg mb-8">
          The project you&apos;re looking for does not exist or may have been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push("/projects")}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            All Projects
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-secondary hover:bg-secondary-dark text-secondary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </section>
);

const ProjectHeader = ({ project }) => {
  const projectType = getProjectTypeLabel(project.type);
  const subtitle = project.location
    ? `${projectType} Project in ${project.location}`
    : `${projectType} Project`;

  return (
    <div className="mb-16 text-center">
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {project.name || "Untitled Project"}
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
        {subtitle}
      </motion.p>
    </div>
  );
};

const ProjectDetails = ({ project, hasValidImages }) => (
  <motion.div
    className="bg-muted rounded-xl border border-muted shadow-sm p-8 mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: hasValidImages ? 0.8 : 0.6 }}
  >
    <LocationDisplay location={project.location} />

    <InfoBar
      status={project.status}
      client={project.client}
      value={project.value}
    />

    {/* align="left" — default, matches detail page left-aligned layout */}
    <Timeline start={project.startDate} end={project.endDate} />

    <Partners partners={project.partners} />

    {project.description && (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Project Overview
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          {project.description}
        </p>
      </div>
    )}
  </motion.div>
);

const BackButton = ({ project, router }) => {
  const handleBackClick = () => {
    if (project.type && Object.values(ProjectType).includes(project.type)) {
      router.push(`/projects?type=${project.type}`);
    } else {
      router.push("/projects");
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleBackClick}
        className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
        {project.type
          ? `Back to ${getProjectTypeLabel(project.type)} Projects`
          : "Back to Projects"}
      </button>
    </div>
  );
};

// ─── Default Export ───────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const project = getProjectById(params.id?.toString());

  useEffect(() => {
    if (!project && params.id) {
      const timer = setTimeout(() => router.push("/projects"), 3000);
      return () => clearTimeout(timer);
    }
  }, [project, params.id, router]);

  if (!project) {
    return (
      <>
        <Head>
          <title>Project Not Found | Portfolio</title>
          <meta
            name="description"
            content="The requested project could not be found."
          />
        </Head>
        <ProjectNotFound router={router} />
      </>
    );
  }

  const validImages = getValidImages(project.images);
  const hasValidImages = validImages.length > 0;

  const metaTitle = `${project.name || "Project Details"} | Portfolio`;
  const metaDescription =
    [
      `Explore details of ${project.name || "this project"}`,
      project.type
        ? `, a ${getProjectTypeLabel(project.type).toLowerCase()} project`
        : "",
      project.location ? ` located in ${project.location}` : "",
      project.client ? ` for ${project.client}` : "",
    ].join("") + ".";

  const metaKeywords = [
    "project details",
    "portfolio",
    project.type?.toLowerCase(),
    project.location?.toLowerCase(),
    project.client?.toLowerCase(),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
      </Head>
      <section className="py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectHeader project={project} />

          {hasValidImages ? (
            <ImageGallery images={project.images} projectName={project.name} />
          ) : (
            <NoImagesPlaceholder />
          )}

          <ProjectDetails project={project} hasValidImages={hasValidImages} />

          <BackButton project={project} router={router} />
        </div>
      </section>
    </>
  );
}
