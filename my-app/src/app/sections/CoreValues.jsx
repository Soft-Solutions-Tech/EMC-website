"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  leftArrowCursor,
  rightArrowCursor,
  companyInfo,
  coreValues,
  containerVariants,
  itemVariants,
  cardVariants,
} from "../../../data/coreValues";

export default function CoreValues() {
  const [activeValue, setActiveValue] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [cursorSide, setCursorSide] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const goNext = () => setActiveValue((prev) => (prev + 1) % coreValues.length);
  const goPrev = () =>
    setActiveValue(
      (prev) => (prev - 1 + coreValues.length) % coreValues.length
    );

  // Check if device is mobile - only run on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    setCursorSide(mouseX < rect.width / 2 ? "left" : "right");
  };

  const handleCardClick = (e) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    mouseX < rect.width / 2 ? goPrev() : goNext();
  };

  useEffect(() => {
    isInView ? controls.start("visible") : controls.start("hidden");
  }, [isInView, controls]);

  return (
    <section
      ref={sectionRef}
      className="lg:h-[100vh] lg:max-h-[100vh] lg:overflow-auto flex flex-col pt-6 pb-6"
    >
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/15 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/8 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-2000"></div>
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
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
            >
              {companyInfo.title}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
            />

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto mt-6 text-sm sm:text-base font-medium text-muted-foreground leading-relaxed"
            >
              {companyInfo.description}
            </motion.p>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 lg:items-stretch">
            {/* Left Column */}
            <div className="order-2 lg:order-1 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {coreValues.map((value, i) => {
                  const IconComponent = value.icon;

                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className={`group cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 flex-1 ${
                        activeValue === i
                          ? `border-primary/30 bg-gradient-to-br ${value.bgColor} shadow-lg shadow-primary/10`
                          : "border-muted bg-card/60 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5"
                      }`}
                      onClick={() => setActiveValue(i)}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-xl transition-colors duration-200 ${
                            activeValue === i
                              ? "bg-card/80"
                              : "bg-muted/50 group-hover:bg-primary/5"
                          }`}
                        >
                          <IconComponent
                            size={20}
                            className={
                              activeValue === i
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-primary"
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-semibold text-base sm:text-lg mb-2 truncate ${
                              activeValue === i
                                ? "text-foreground"
                                : "text-foreground/80"
                            }`}
                          >
                            {value.text}
                          </h4>
                          <p
                            className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                              activeValue === i
                                ? "text-muted-foreground"
                                : "text-muted-foreground/80"
                            }`}
                          >
                            {value.desc}
                          </p>
                        </div>
                        {activeValue === i && (
                          <ChevronRight
                            size={16}
                            className="text-primary mt-1"
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
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (!isMobile) return;
                    const swipe = offset.x * velocity.x;
                    if (swipe < -1000) goNext();
                    else if (swipe > 1000) goPrev();
                  }}
                  ref={cardRef}
                  onClick={handleCardClick}
                  className="relative bg-card/80 backdrop-blur-sm border border-muted rounded-3xl p-6 shadow-xl shadow-primary/10 overflow-hidden h-full flex flex-col justify-between"
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
                    className={`absolute inset-0 bg-gradient-to-br ${coreValues[activeValue].bgColor} opacity-30`}
                  ></div>

                  <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <div className="text-center mb-4">
                      <div className="inline-flex p-4 rounded-2xl bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/20 mb-4 border border-primary/10">
                        {(() => {
                          const IconComponent = coreValues[activeValue].icon;
                          return (
                            <IconComponent size={40} className="text-primary" />
                          );
                        })()}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                        {coreValues[activeValue].text}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
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
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-primary/50"
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
