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
    type: ProjectType.EPC,
    description: "Luxury residential tower with sea view apartments. This project involved the full consulting and engineering design for a high-rise residential complex, focusing on sustainable building practices, energy efficiency, and premium amenities for residents. The tower features panoramic views, advanced security systems, and smart home integration, setting a new standard for urban living in New Cairo.",
    startDate: "2022-01-15",
    endDate: "2023-06-30",
    status: "Finished", // or "Active"
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our EPC projects"
  },
  {
    id: "p2",
    name: "SkyTech Business Park",
    type: ProjectType.EPC,
    description: "High-tech office complex for startups and corporates. SkyTech Business Park is a state-of-the-art commercial development designed to foster innovation and collaboration. The project includes flexible office spaces, co-working hubs, green areas, and advanced IT infrastructure. Our team provided end-to-end project management, ensuring timely delivery and adherence to international standards for safety and sustainability.",
    startDate: "2023-03-01",
    endDate: null, // still active
    status: "Active",
    client: "SkyTech Ventures",
    partners: ["BuildCore Egypt"],
    value: "$25M",
    location: "6th of October City, Egypt",
    images: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our EPC projects"
  },
  {
    id: "p1",
    name: "Palm Heights Tower",
    type: ProjectType.CONSULTING,
    description: "High-tech office complex for startups and corporates. SkyTech Business Park is a state-of-the-art commercial development designed to foster innovation and collaboration. The project includes flexible office spaces, co-working hubs, green areas, and advanced IT infrastructure. Our team provided end-to-end project management, ensuring timely delivery and adherence to international standards for safety and sustainability.",
    startDate: "2022-01-15",
    endDate: "2023-06-30",
    status: "Finished", // or "Active"
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our Consulting projects",
  },
  {
    id: "p1",
    name: "Palm Heights Tower",
    type: ProjectType.CONSULTING,
    description: "High-tech office complex for startups and corporates. SkyTech Business Park is a state-of-the-art commercial development designed to foster innovation and collaboration. The project includes flexible office spaces, co-working hubs, green areas, and advanced IT infrastructure. Our team provided end-to-end project management, ensuring timely delivery and adherence to international standards for safety and sustainability.",
    startDate: "2022-01-15",
    endDate: "2023-06-30",
    status: "Finished", // or "Active"
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our Consulting projects",
  },
  {
    id: "p1",
    name: "Palm Heights Tower",
    type: ProjectType.AFTERSALES,
    description: "High-tech office complex for startups and corporates. SkyTech Business Park is a state-of-the-art commercial development designed to foster innovation and collaboration. The project includes flexible office spaces, co-working hubs, green areas, and advanced IT infrastructure. Our team provided end-to-end project management, ensuring timely delivery and adherence to international standards for safety and sustainability.",
    startDate: "2022-01-15",
    endDate: "2023-06-30",
    status: "Finished", // or "Active"
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our After Sales projects"
  },
  {
    id: "p1",
    name: "Palm Heights Tower",
    type: ProjectType.AFTERSALES,
    description: "High-tech office complex for startups and corporates. SkyTech Business Park is a state-of-the-art commercial development designed to foster innovation and collaboration. The project includes flexible office spaces, co-working hubs, green areas, and advanced IT infrastructure. Our team provided end-to-end project management, ensuring timely delivery and adherence to international standards for safety and sustainability.",
    startDate: "2022-01-15",
    endDate: "2023-06-30",
    status: "Finished", // or "Active"
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwdWt8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our After Sales projects"
  },
];
