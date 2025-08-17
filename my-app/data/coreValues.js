import { Shield, Heart, Zap, Target, Users, Eye } from "lucide-react";

// Base64-encoded SVGs for updated arrow cursors
export const leftArrowCursor = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im0xMiAxOS03LTcgNy03Ii8+PHBhdGggZD0iTTE5IDEySDUiLz48L3N2Zz4="), auto`;

export const rightArrowCursor = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0ibTEyIDUgNyA3LTcgNyIvPjwvc3ZnPg=="), auto`;

// Company information
export const companyInfo = {
  title: "Our Core Values",
  description:
    "EMC is a leading engineering solutions provider with over 30 years of excellence in Egypt's power and oil & gas markets. Since our founding in 1988, we've delivered EGP 300M in projects while maintaining an uncompromising commitment to quality. Our expertise spans turnkey EPC projects, technical consulting, and after-sales services for energy infrastructure, specializing in diesel/hydrogen plants and district systems.",
};

// Core values data
export const coreValues = [
  {
    text: "Integrity",
    icon: Shield,
    desc: "We are trustworthy and act in good faith",
    fullDesc:
      "Building uncompromising trust through transparent operations, ethical decision-making, and accountability at every level of our organization.",
    color: "text-primary",
    bgColor: "from-primary/5 to-primary/10",
  },
  {
    text: "Empathy",
    icon: Heart,
    desc: "We care about all of our stakeholders",
    fullDesc:
      "Fostering meaningful relationships with stakeholders through active listening, cultural sensitivity, and human-centered solutions.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/15",
  },
  {
    text: "Resilience",
    icon: Zap,
    desc: "We remain strong ensuring that we deliver quality",
    fullDesc:
      "Maintaining operational excellence and adaptability while navigating market challenges and emerging opportunities with confidence.",
    color: "text-primary",
    bgColor: "from-primary/5 to-primary/10",
  },
  {
    text: "Agility",
    icon: Target,
    desc: "We challenge the status quo with open minds, focus and speed",
    fullDesc:
      "Driving innovation through strategic flexibility, rapid decision-making, and continuous transformation in our global operations.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/15",
  },
  {
    text: "Unity",
    icon: Users,
    desc: "We are stronger when we work together as a team",
    fullDesc:
      "Leveraging collective expertise across diverse teams to achieve exceptional results and sustainable competitive advantage.",
    color: "text-primary",
    bgColor: "from-primary/5 to-primary/10",
  },
  {
    text: "Long Term View",
    icon: Eye,
    desc: "We look beyond the present to deliver future value",
    fullDesc:
      "Making strategic investments and decisions that ensure sustainable growth, stakeholder value, and positive global impact.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/15",
  },
];

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
