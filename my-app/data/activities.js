import {
  Users,
  Package,
  Factory,
  UserCheck,
  ClipboardList,
} from "lucide-react";

export const activities = [
  {
    id: "a1",
    title: "Supplier Representation",
    description: "Representation of international suppliers and contractors.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    id: "a2",
    title: "Equipment Import & Sales",
    description:
      "Import and resale of equipment and spare parts in local currency.",
    icon: <Package className="w-8 h-8 text-primary" />,
  },
  {
    id: "a3",
    title: "EPC Projects",
    description:
      "Execution of small to medium electromechanical projects, including diesel power stations, district cooling plants, and hydrogen plants including Engineering, Procurement & Construction (EPC).",
    icon: <Factory className="w-8 h-8 text-primary" />,
  },
  {
    id: "a4",
    title: "Outsourcing Services",
    description: "Technical and personnel outsourcing services.",
    icon: <UserCheck className="w-8 h-8 text-primary" />,
  },
  {
    id: "a5",
    title: "Project Management",
    description: "Project management for new power plant projects.",
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
  },
];
