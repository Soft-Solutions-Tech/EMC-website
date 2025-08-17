"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { emcInfo } from "../../../data/info.js";

function AnimatedCounter({ target, suffix = "", isVisible, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function InfoSection() {
  const philosophyRef = useRef(null);
  const [isPhilosophyVisible, setIsPhilosophyVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsPhilosophyVisible(true);
        else setIsPhilosophyVisible(false);
      },
      { threshold: 0.2 }
    );
    if (philosophyRef.current) observer.observe(philosophyRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="philosophy"
      ref={philosophyRef}
      className="min-h-[100vh] flex items-center  relative overflow-hidden mt-2"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.2]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          >
            {emcInfo.headerTitle}
          </motion.h2>
          <motion.div
            className="mt-2 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-10 relative">
          {/* Title and Summary */}
          <div className="text-center space-y-4">
            <div
              className={`flex items-center justify-center space-x-3 transition-all duration-700 ${
                isPhilosophyVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            ></div>

            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-primary"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {emcInfo.engineeringTitle}
              <span className="block text-primary relative">
                {emcInfo.limitsTitle}
                <div
                  className={`absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 h-1 bg-primary transition-all duration-800 ${
                    isPhilosophyVisible ? "w-20" : "w-0"
                  }`}
                ></div>
              </span>
            </motion.h3>

            <motion.div
              className="max-w-2xl mx-auto text-sm sm:text-base font-light text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p>{emcInfo.summary}</p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isPhilosophyVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {emcInfo.stats.map((stat, idx) => {
              const numberClass =
                idx % 2 === 0 ? "text-primary" : "text-secondary";
              const barClass = idx % 2 === 0 ? "bg-primary" : "bg-secondary";
              return (
                <motion.div
                  key={stat.label}
                  className="text-center space-y-2 group"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-black ${numberClass}`}
                  >
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      isVisible={isPhilosophyVisible}
                      delay={500 + idx * 100}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-light tracking-wide uppercase text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barClass} transition-all duration-1000 delay-1000 ${
                        isPhilosophyVisible ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
