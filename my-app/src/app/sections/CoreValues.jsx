"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Shield,
  Heart,
  Zap,
  Target,
  Users,
  Eye,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Base64-encoded SVGs for updated arrow cursors
const leftArrowCursor = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im0xMiAxOS03LTcgNy03Ii8+PHBhdGggZD0iTTE5IDEySDUiLz48L3N2Zz4="), auto`;
const rightArrowCursor = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0ibTEyIDUgNyA3LTcgNyIvPjwvc3ZnPg=="), auto`;

export default function CoreValues() {
  const [activeValue, setActiveValue] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [cursorSide, setCursorSide] = useState(null);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const coreValues = [
    {
      text: "Integrity",
      icon: Shield,
      desc: "We are trustworthy and act in good faith",
      fullDesc:
        "Building uncompromising trust through transparent operations, ethical decision-making, and accountability at every level of our organization.",
      color: "#006996",
      bgColor: "from-gray-200 to-gray-300",
    },
    {
      text: "Empathy",
      icon: Heart,
      desc: "We care about all of our stakeholders",
      fullDesc:
        "Fostering meaningful relationships with stakeholders through active listening, cultural sensitivity, and human-centered solutions.",
      color: "#939598",
      bgColor: "from-blue-100 to-blue-200",
    },
    {
      text: "Resilience",
      icon: Zap,
      desc: "We remain strong ensuring that we deliver quality",
      fullDesc:
        "Maintaining operational excellence and adaptability while navigating market challenges and emerging opportunities with confidence.",
      color: "#006996",
      bgColor: "from-gray-200 to-gray-300",
    },
    {
      text: "Agility",
      icon: Target,
      desc: "We challenge the status quo with open minds, focus and speed",
      fullDesc:
        "Driving innovation through strategic flexibility, rapid decision-making, and continuous transformation in our global operations.",
      color: "#939598",
      bgColor: "from-blue-100 to-blue-200",
    },
    {
      text: "Unity",
      icon: Users,
      desc: "We are stronger when we work together as a team",
      fullDesc:
        "Leveraging collective expertise across diverse teams to achieve exceptional results and sustainable competitive advantage.",
      color: "#006996",
      bgColor: "from-gray-200 to-gray-300",
    },
    {
      text: "Long Term View",
      icon: Eye,
      desc: "We look beyond the present to deliver future value",
      fullDesc:
        "Making strategic investments and decisions that ensure sustainable growth, stakeholder value, and positive global impact.",
      color: "#939598",
      bgColor: "from-blue-100 to-blue-200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const goNext = () => setActiveValue((prev) => (prev + 1) % coreValues.length);
  const goPrev = () =>
    setActiveValue(
      (prev) => (prev - 1 + coreValues.length) % coreValues.length
    );

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    setCursorSide(mouseX < rect.width / 2 ? "left" : "right");
  };

  const handleCardClick = (e) => {
    if (window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    mouseX < rect.width / 2 ? goPrev() : goNext();
  };

  const isMobile = () => window.innerWidth < 1024;

  useEffect(() => {
    isInView ? controls.start("visible") : controls.start("hidden");
  }, [isInView, controls]);

  return (
    <section
      ref={sectionRef}
      className="lg:h-[100vh] lg:max-h-[100vh] lg:overflow-auto bg-gradient-to-br from-gray-50 via-white to-slate-50 flex flex-col pt-6 pb-6"
    >
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-2000"></div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex-1 flex flex-col"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.2]"
            >
              Our Core Values
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="mt-2 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
            />
            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto mt-4 text-sm sm:text-base font-light text-muted-foreground leading-relaxed"
            >
              EMC is a leading engineering solutions provider with over 30 years
              of excellence in Egypt's power and oil & gas markets. Since our
              founding in 1988, we've delivered EGP 300M in projects while
              maintaining an uncompromising commitment to quality. Our expertise
              spans turnkey EPC projects, technical consulting, and after-sales
              services for energy infrastructure, specializing in
              diesel/hydrogen plants and district systems.
            </motion.p>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 lg:items-stretch">
            {/* Left Column */}
            <div className="order-2 lg:order-1 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {coreValues.map((value, i) => {
                  const IconComponent = value.icon;
                  const isEvenCard = i % 2 !== 0; // even visual position
                  const activeBorderColor = isEvenCard
                    ? "border-gray-300"
                    : "border-blue-200";
                  const activeChevronColor = isEvenCard
                    ? "text-gray-500"
                    : "text-blue-600";

                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className={`group cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 flex-1 ${
                        activeValue === i
                          ? `${activeBorderColor} bg-gradient-to-br ${value.bgColor} shadow-lg`
                          : isEvenCard
                          ? "border-gray-300 bg-white hover:border-gray-400 hover:shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => setActiveValue(i)}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-xl ${
                            activeValue === i
                              ? "bg-white/80"
                              : "bg-gray-50 group-hover:bg-gray-100"
                          }`}
                        >
                          <IconComponent
                            size={20}
                            style={{
                              color:
                                activeValue === i ? value.color : "#6b7280",
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-semibold text-base sm:text-lg mb-2 truncate ${
                              activeValue === i
                                ? "text-gray-900"
                                : "text-gray-800"
                            }`}
                          >
                            {value.text}
                          </h4>
                          <p
                            className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                              activeValue === i
                                ? "text-gray-700"
                                : "text-gray-600"
                            }`}
                          >
                            {value.desc}
                          </p>
                        </div>
                        {activeValue === i && (
                          <ChevronRight
                            size={16}
                            className={`${activeChevronColor} mt-1`}
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div className="order-1 lg:order-2 flex flex-col h-full">
              <motion.div
                variants={itemVariants}
                className="relative w-full h-full"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => {
                  setHovering(false);
                  setCursorSide(null);
                }}
                onMouseMove={handleMouseMove}
              >
                <motion.div
                  key={activeValue}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  drag={isMobile() ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (!isMobile()) return;
                    const swipe = offset.x * velocity.x;
                    if (swipe < -1000) goNext();
                    else if (swipe > 1000) goPrev();
                  }}
                  ref={cardRef}
                  onClick={handleCardClick}
                  className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100 overflow-hidden h-full flex flex-col justify-between"
                  style={{
                    cursor:
                      hovering && cursorSide === "left"
                        ? leftArrowCursor
                        : hovering && cursorSide === "right"
                        ? rightArrowCursor
                        : "auto",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${coreValues[activeValue].bgColor} opacity-50`}
                  ></div>

                  <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <div className="text-center mb-4">
                      <div className="inline-flex p-4 rounded-2xl bg-white shadow-lg mb-4">
                        {(() => {
                          const IconComponent = coreValues[activeValue].icon;
                          return (
                            <IconComponent
                              size={40}
                              style={{
                                color: coreValues[activeValue].color,
                              }}
                            />
                          );
                        })()}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                        {coreValues[activeValue].text}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {coreValues[activeValue].fullDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2 mt-4 relative z-10">
                    {coreValues.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeValue
                            ? "w-8 bg-blue-600"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                        onClick={() => setActiveValue(i)}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
