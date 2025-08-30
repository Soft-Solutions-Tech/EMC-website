import { ProjectType } from "./projects";
export const services = [
  {
    id: "1",
    type: ProjectType.EPC,
    title: "EPC Projects",
    description:
      "Diesel & hydrogen plants, district cooling plants, including engineering, procurement, civil works, installation, and commissioning.",
    icon: "HardHat",
    features: ["Engineering", "Procurement", "Civil Works", "Installation"],
  },
  {
    id: "2",
    type: ProjectType.CONSULTING,
    title: "Consulting Services",
    description:
      "Identifying opportunities, reviewing specifications, developing win strategies, and leveraging key relationships for major projects. Consulting and services for wind & solar projects on behalf of manufacturers.",
    icon: "Lightbulb",
    features: [
      "Opportunity Identification",
      "Specification Review",
      "Win Strategies Development",
      "Consulting for Wind & Solar",
    ],
  },
  {
    id: "3",
    type: ProjectType.AFTERSALES,
    title: "After Sales Support",
    description:
      "Providing technical advice, repair & maintenance, spare parts, and overhauls.",
    icon: "Wrench",
    features: [
      "Technical Advice",
      "Repair & Maintenance",
      "Spare Parts Supply",
      "Overhauls",
    ],
  },
];

export const servicesSection = {
  title: "Services",
  subtitle:
    "EMC Energy focuses on the Power and Oil & Gas markets in Egypt, we aim to deliver top-tier solutions to our clients and partners",
};
