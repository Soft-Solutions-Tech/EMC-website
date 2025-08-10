"use client";
import { motion } from "framer-motion";
import { Gem, FlaskConical, CookingPot, Gavel } from "lucide-react";

// Helper to create SVG arc path for a pie segment
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    cx,
    cy,
    "L",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}
function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

// Helper to split description into two lines if too long
function splitDescription(desc, max = 22) {
  if (desc.length <= max) return [desc];
  const idx = desc.lastIndexOf(" ", max);
  if (idx === -1) return [desc];
  return [desc.slice(0, idx), desc.slice(idx + 1)];
}

export default function CoreValues() {
  // Pie segments data
  const segments = [
    { text: "Integrity", desc: "We are trustworthy and act in good faith" },
    { text: "Empathy", desc: "We care about all of our stakeholders" },
    {
      text: "Resilience",
      desc: "We remain strong ensuring that we deliver quality",
    },
    {
      text: "Agility",
      desc: "We challenge the status quo with open minds, focus and speed",
    },
    { text: "Unity", desc: "We are stronger when we work together as a team" },
    {
      text: "Long Term View",
      desc: "We look beyond the present to deliver future value",
    },
  ];
  const numSegments = segments.length;
  const wheelRadius = 270;
  const center = wheelRadius;
  const segmentAngle = 360 / numSegments;
  const labelRadius = wheelRadius * 0.66;
  const primary = "#006996";
  const primaryDark = "#004d6e";

  // SVG gradient for center circle and gavel icon
  const centerGradientId = "corevalues-center-gradient";

  // Action cards data with solid brand color icons
  const actionCards = [
    {
      icon: <Gem size={32} stroke={primary} />,
      title: "Motivator",
      desc: "Providing inspiration to get you charged up",
    },
    {
      icon: <FlaskConical size={32} stroke={primary} />,
      title: "Guidance",
      desc: "Supporting you in all your activities. You are not alone",
    },
    {
      icon: <CookingPot size={32} stroke={primary} />,
      title: "Action",
      desc: "We believe in doing and not speculation",
    },
  ];
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <section className="py-12 sm:py-24 relative overflow-hidden bg-gradient-to-br from-muted via-white to-muted">
      <div className="absolute -z-10 left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-primary/10 via-primary-dark/5 to-white rounded-full blur-3xl opacity-60" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4 sm:px-6 lg:px-8">
        {/* Left Side - Info style */}
        <div className="space-y-8">
          <div className="space-y-4 sm:space-y-6 text-center md:text-left relative">
            <div className="flex items-center justify-center md:justify-start space-x-3 transition-all duration-700">
              <div className="w-8 sm:w-12 h-0.5 bg-primary"></div>
              <span className="text-xs sm:text-sm font-light tracking-widest uppercase text-primary">
                COMPANY
              </span>
            </div>
            <div className="transition-all duration-700 delay-200">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.15]">
                <span className="bg-clip-text font-black">Our Core</span>
                <br />
                <span className="block text-primary relative">
                  Values
                  <span className="block relative w-full">
                    <span className="sr-only">underline</span>
                    <motion.span
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-full mt-1"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ display: "block" }}
                    />
                  </span>
                </span>
              </h2>
            </div>
            <div className="w-16 h-1 bg-primary mx-auto md:mx-0 mt-4 transition-all duration-1000 delay-700 opacity-100 scale-100"></div>
          </div>
          <motion.p
            className="font-semibold text-muted-foreground text-lg md:text-xl mb-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our company culture is defined by our Core Values
          </motion.p>
          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Company values are the set of guiding principles and fundamental
            beliefs that help a group of people function together as a team and
            work toward a common business goal.
          </motion.p>
          {/* Action Cards */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {actionCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="flex-1 rounded-2xl shadow-md flex flex-col items-center p-6 min-w-[180px] max-w-xs mx-auto border border-muted hover:shadow-lg transition-shadow duration-300"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
              >
                {card.icon}
                <div className="font-bold text-lg mb-1 text-foreground">
                  {card.title}
                </div>
                <div className="text-muted-foreground text-sm text-center">
                  {card.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: SVG Wheel */}
        <div className="flex items-center justify-center w-full">
          <motion.svg
            width={wheelRadius * 2}
            height={wheelRadius * 2}
            viewBox={`0 0 ${wheelRadius * 2} ${wheelRadius * 2}`}
            className="block drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <defs>
              <linearGradient id={centerGradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={primary} />
                <stop offset="50%" stopColor={primaryDark} />
                <stop offset="100%" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
            {/* Pie Segments */}
            {segments.map((seg, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = (i + 1) * segmentAngle;
              const fill = i % 2 === 0 ? primary : primaryDark;
              return (
                <motion.path
                  key={seg.text}
                  d={describeArc(
                    center,
                    center,
                    wheelRadius,
                    startAngle,
                    endAngle
                  )}
                  fill={fill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  style={{ filter: `drop-shadow(0 2px 12px ${primary}20)` }}
                />
              );
            })}
            {/* Center Circle */}
            <circle
              cx={center}
              cy={center}
              r={90}
              fill="#fff"
              stroke={`url(#${centerGradientId})`}
              strokeWidth={8}
              style={{ filter: `drop-shadow(0 0 24px ${primary}33)` }}
            />
            {/* Gavel Icon with gradient stroke */}
            <g>
              <Gavel
                size={44}
                stroke={`url(#${centerGradientId})`}
                x={center - 22}
                y={center - 28}
              />
            </g>
            {/* Center Text with gradient fill */}
            <text
              x={center}
              y={center + 48}
              textAnchor="middle"
              className="font-black"
              fontSize={22}
              fill={`url(#${centerGradientId})`}
              style={{ letterSpacing: "1px" }}
            >
              Values
            </text>
            {/* Segment Labels */}
            {segments.map((seg, i) => {
              const angle = (i + 0.5) * segmentAngle - 90;
              const rad = angle * (Math.PI / 180);
              const x = center + labelRadius * Math.cos(rad);
              const y = center + labelRadius * Math.sin(rad);
              const descLines = splitDescription(seg.desc, 22);
              return (
                <g key={seg.text + "-label"}>
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight="bold"
                    fill="white"
                    style={{
                      textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                      dominantBaseline: "middle",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {seg.text}
                  </text>
                  {descLines.map((line, idx) => (
                    <text
                      key={idx}
                      x={x}
                      y={y + 20 + idx * 15}
                      textAnchor="middle"
                      fontSize={11}
                      fill="#f1f5f9"
                      style={{
                        textShadow: "0 1px 4px rgba(0,0,0,0.18)",
                        dominantBaseline: "middle",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
