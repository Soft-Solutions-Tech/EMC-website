"use client";
import { useRef, useEffect, useState } from "react";
import { companyOverview } from "../../../data/about.js";
import { projects } from "../../../data/projects.js";
import { clients } from "../../../data/clients.js";
import { Zap, Plug } from "lucide-react";
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

export default function PhilosophySection() {
  const philosophyRef = useRef(null);
  const [isPhilosophyVisible, setIsPhilosophyVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsPhilosophyVisible(true);
      },
      { threshold: 0.3 }
    );
    if (philosophyRef.current) observer.observe(philosophyRef.current);
    return () => observer.disconnect();
  }, []);

  const yearsExperience =
    new Date().getFullYear() - Number(companyOverview.established);
  const numProjects = projects.length;
  const numClients = clients.length;

  return (
    <section
      id="philosophy"
      ref={philosophyRef}
      className="py-12 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Title & Underline */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div
                className={`flex items-center justify-center lg:justify-start space-x-3 transition-all duration-700 ${isPhilosophyVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                  }`}
              >
                <div className="w-8 sm:w-12 h-0.5 bg-primary"></div>
                <span className="text-xs sm:text-sm font-light tracking-widest uppercase primary-text">
                  POWEREDGE
                </span>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ${isPhilosophyVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter primary-text">
                  Engineering beyond
                  <span className="block text-accent relative">
                    limits.
                    <div
                      className={`absolute top-12 left-0 h-1 bg-secondary-bg-40 transition-all duration-1000 delay-700 ${isPhilosophyVisible ? "w-full" : "w-0"
                        }`}
                    ></div>
                  </span>
                </h2>
              </div>

              <div
                className={`w-16 h-1 primary-bg mx-auto lg:mx-0 mt-4 transition-all duration-1000 delay-700 ${isPhilosophyVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
                  }`}
              ></div>
            </div>

            {/* Summary */}
            <div
              className={`space-y-4 sm:space-y-6 text-base sm:text-lg font-light text-gray-700 leading-relaxed transition-all duration-700 delay-400 ${isPhilosophyVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <p>{emcInfo.summary}</p>
            </div>

            {/* Icon Boxes */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 sm:pt-8 transition-all duration-700 delay-600 ${isPhilosophyVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <div className="space-y-3 text-center lg:text-left group">
                <div className="w-8 h-8 bg-background-icon1 rounded-sm flex items-center justify-center mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-4 w-4 text-black" />
                </div>
                <h3 className="font-semibold dark-text tracking-wide">
                  {emcInfo.philosophyTitle}
                </h3>
                <p className="text-xs text-gray-500">{emcInfo.philosophySub}</p>
              </div>
              <div className="space-y-3 text-center lg:text-left group">
                <div className="w-8 h-8 bg-background-icon1 rounded-sm flex items-center justify-center mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-300">
                  <Plug className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold dark-text tracking-wide">
                  {emcInfo.precisionTitle}
                </h3>
                <p className="text-xs text-gray-500">{emcInfo.precisionSub}</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            {/* Quote Block */}
            <div
              style={{ borderLeft: "4px solid #00263A" }}
              className={`bg-gray-50/50 p-6 sm:p-8 relative overflow-hidden transition-all duration-700 delay-300 ${isPhilosophyVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
                }`}
            >
              <blockquote className="text-xl sm:text-2xl font-light text-gray-800 leading-relaxed italic relative z-10">
                {emcInfo.philosophy}
              </blockquote>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 delay-500 justify-items-center ${isPhilosophyVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              {emcInfo.stats.map((stat, idx) => {
                const numberClass =
                  idx % 2 === 0 ? "text-accent" : "text-primary";
                const barClass = idx % 2 === 0 ? "bg-accent" : "bg-primary";
                return (
                  <div key={stat.label} className="text-center space-y-2 group">
                    <div
                      className={`text-2xl sm:text-3xl font-black ${numberClass} transition-all duration-500 delay-700 group-hover:scale-110`}
                    >
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        isVisible={isPhilosophyVisible}
                        delay={700 + idx * 150}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-light tracking-wide uppercase text-gray-600">
                      {stat.label}
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barClass} transition-all duration-1000 delay-1000 ${isPhilosophyVisible ? "w-full" : "w-0"
                          }`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Side Lines */}
      <div
        className={`absolute top-16 sm:top-32 left-0 w-0.5 sm:w-1 bg-secondary-bg-40 transition-all duration-1000 delay-1000 ${isPhilosophyVisible ? "h-16 sm:h-32 opacity-100" : "h-0 opacity-0"
          }`}
      />
      <div
        className={`absolute bottom-16 sm:bottom-24 right-0 w-0.5 sm:w-1 bg-black/20 transition-all duration-1000 delay-1100 ${isPhilosophyVisible ? "h-16 sm:h-32 opacity-100" : "h-0 opacity-0"
          }`}
      />
    </section>
  );
}
