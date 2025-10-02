import { projects } from "../../../../data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

// This runs at build time to generate static pages
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.id?.toString() === params.id);

  if (!project) {
    return {
      title: "Project Not Found | Portfolio",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.name || "Project Details"} | Portfolio`,
    description: `Explore details of ${project.name || "this project"}${
      project.type ? `, a ${project.type.toLowerCase()} project` : ""
    }${project.location ? ` located in ${project.location}` : ""}`,
    keywords: [
      "project details",
      "portfolio",
      project.type?.toLowerCase(),
      project.location?.toLowerCase(),
      project.client?.toLowerCase(),
    ]
      .filter(Boolean)
      .join(", "),
  };
}

// Server component that passes data to client component
export default function ProjectDetailPage({ params }) {
  return <ProjectDetailClient projectId={params.id} />;
}
