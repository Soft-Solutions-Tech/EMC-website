export const ProjectType = {
  EPC: "EPC",
  CONSULTING: "CONSULTING",
  AFTERSALES: "AFTERSALES",
};

export const portfolioTitle = "Our Projects Portfolio";

// Configuration
export const sectionHeadings = [
  {
    label: "EPC Projects",
    idx: 0,
    desc: [
      "Complete EPC solutions for Diesel and hydrogen plants and District cooling plants",
      "Including engineering, procurement, civil works, installation, and commissioning",
    ],
  },
  {
    label: "Consulting Projects",
    idx: 1,
    desc: [
      "Identify opportunities",
      "Influence specifications",
      "Develop win strategies and target price",
      "Leverage relationships with key decision makers and influencers to win major projects",
      "Consulting and services for wind and solar projects on behalf of clients",
    ],
  },
  {
    label: "After Sales Projects",
    idx: 2,
    desc: [
      "Technical advice",
      "Repair and maintenance",
      "Spare parts and overhauls",
    ],
  },
];

// MOCK Project data
export const projects = [
  {
    id: "p1",
    name: "Palm Heights Tower",
    type: ProjectType.EPC,
    description:
      "Luxury residential tower with sea view apartments. This project involved the full consulting and engineering design for a high-rise residential complex",
    endDate: "2023-06-30",
    status: "Finished",
    client: "Palm Real Estate Co.",
    partners: ["Modern Builders Inc.", "EcoDesign Studios"],
    value: "$12M",
    location: "New Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwc2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBjb25zdHJ1Y3Rpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1694521787162-5373b598945c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwc2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
    consultingCta: "Explore our EPC projects",
  },
  {
    id: "p2",
    name: "SkyTech Business Park",
    type: ProjectType.EPC,
    description:
      "High-tech office complex for startups and corporates. SkyTech Business Park is a state-of-the-art commercial development designed to foster innovation and collaboration.",
    startDate: "2023-03-01",
    endDate: null,
    status: "Active",
    client: "SkyTech Ventures",
    partners: ["BuildCore Egypt"],
    value: "$25M",
    location: "6th of October City, Egypt",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1694521787673-28cbd8830ea5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwc2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1681690860621-57d749a22f34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our EPC projects",
  },
  {
    id: "p3",
    name: "Cairo Financial District",
    type: ProjectType.CONSULTING,
    description:
      "Modern financial district with state-of-the-art office towers and commercial spaces. This consulting project focused on urban planning, architectural design, and infrastructure development for Egypt's premier financial hub.",
    startDate: "2021-08-10",
    endDate: "2023-12-15",
    status: "Finished",
    client: "Cairo Development Authority",
    partners: ["Urban Planning Associates", "Financial District Consortium"],
    value: "$45M",
    location: "Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1575281923032-f40d94ef6160?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1694522362256-6c907336af43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our Consulting projects",
  },
  {
    id: "p4",
    name: "Alexandria Port Expansion",
    type: ProjectType.CONSULTING,
    description:
      "Major port infrastructure expansion project to increase cargo handling capacity and modernize port operations. Our consulting services included feasibility studies, environmental impact assessments, and detailed engineering designs for new berths, container terminals, and logistics facilities.",
    startDate: "2022-05-20",
    endDate: "2024-02-28",
    status: "Active",
    client: "Alexandria Port Authority",
    partners: ["Marine Engineering Corp", "Port Development International"],
    value: "$180M",
    location: "Alexandria, Egypt",
    images: [
      "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1681823089588-5ad065dc85cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1694521787799-ad4ad241cb39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our Consulting projects",
  },
  {
    id: "p5",
    name: "Luxor Solar Power Plant",
    type: ProjectType.AFTERSALES,
    description:
      "Large-scale solar energy facility providing sustainable power to Upper Egypt. Our after-sales services include ongoing maintenance, performance optimization, and technical support for the solar panels, inverters, and grid connection systems.",
    startDate: "2020-11-15",
    endDate: "2022-07-30",
    status: "Finished",
    client: "Egyptian Electricity Authority",
    partners: ["SolarTech Egypt", "Green Energy Solutions"],
    value: "$85M",
    location: "Luxor, Egypt",
    images: [
      "https://images.unsplash.com/photo-1603465410243-af3e840367dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1517089152318-42ec560349c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our After Sales projects",
  },
  {
    id: "p6",
    name: "Suez Canal Industrial Zone",
    type: ProjectType.AFTERSALES,
    description:
      "Comprehensive industrial development zone along the Suez Canal corridor. Our after-sales services include facility maintenance, equipment upgrades, and operational support for manufacturing plants, logistics centers, and industrial facilities.",
    startDate: "2021-03-10",
    endDate: "2023-09-15",
    status: "Finished",
    client: "Suez Canal Authority",
    partners: ["Industrial Development Corp", "Canal Zone Management"],
    value: "$320M",
    location: "Suez Canal, Egypt",
    images: [
      "https://images.unsplash.com/photo-1694521788304-1d42378498da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1723107638733-16ef49e5d4de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxjb25zdHJ1Y3Rpb24lMjBzaXRlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kdXN0cmlhbCUyMHpvbmV8ZW58MHx8MHx8fDA%3D",
    ],
    consultingCta: "Explore our After Sales projects",
  },
];
