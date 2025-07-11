export const ProjectType = {
  EPC: "EPC",
  CONSULTING: "CONSULTING",
  AFTERSALES: "AFTER SALES",
  OTHER: "OTHER",
};

// MOCK Project data
export const projects = [
  {
    id: "p1",
    name: "Palm Heights Tower",
    type: ProjectType.CONSULTING,
    description: "Luxury residential tower with sea view apartments.",
    startDate: "2022-01-15",
    endDate: "2023-06-30",
    status: "Finished", // or "Active"
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "/images/projects/palm-heights/1.jpg",
      "/images/projects/palm-heights/2.jpg",
      "/images/projects/palm-heights/3.jpg",
    ],
  },
  {
    id: "p2",
    name: "SkyTech Business Park",
    type: ProjectType.OTHER,
    description: "High-tech office complex for startups and corporates.",
    startDate: "2023-03-01",
    endDate: null, // still active
    status: "Active",
    client: "SkyTech Ventures",
    partners: ["BuildCore Egypt"],
    value: "$25M",
    location: "6th of October City, Egypt",
    images: [
      "/images/projects/skytech/1.jpg",
      "/images/projects/skytech/2.jpg",
    ],
  },
];
