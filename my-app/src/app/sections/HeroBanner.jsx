"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Send, LineChart } from "lucide-react";

export function HeroBanner() {
  return (
    <section
      aria-label="Hero banner"
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background"
    >
      {/* === Grid Background === */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.4)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* === Floating Geometric Shapes === */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-accent/40 rotate-45"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              rotate: [45, 405, 45],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* === Overlay Gradient === */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-accent/40"
        aria-hidden="true"
      />

      {/* === Main Content === */}
      <motion.div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 backdrop-blur-sm border border-accent/50 rounded-full px-6 py-3 mb-8"
          >
            <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            <span className="text-navy font-medium">Trusted Since 1988</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-tight mb-8 tracking-tight"
          >
            Building the Future with{" "}
            <motion.span
              initial={{ scale: 0.9, rotateX: -90 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy bg-[length:200%] bg-[position:0%]"
            >
              EMC
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Since 1988, EMC Construction has been a leader in Egypt's power and
            oil & gas sectors, delivering innovative, high-quality projects with
            unmatched precision.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-accent to-teal text-accent-foreground hover:from-accent/80 hover:to-teal/80 border-0 rounded-2xl px-10 py-7 text-xl font-semibold transition-all duration-300 shadow-[0_20px_50px_rgba(0,174,239,0.3)] hover:shadow-[0_25px_60px_rgba(0,174,239,0.4)]"
              >
                <Link href="/contact" className="flex items-center gap-3">
                  Contact Us <Send className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-accent border-2 border-accent/50 hover:bg-accent/10 hover:border-accent backdrop-blur-sm rounded-2xl px-10 py-7 text-xl font-semibold transition-all duration-300 shadow-[0_20px_50px_rgba(0,174,239,0.2)] hover:shadow-[0_25px_60px_rgba(0,174,239,0.3)]"
              >
                <Link href="#timeline" className="flex items-center gap-3">
                  Discover Our Story <LineChart className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* === Animated Blobs === */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-accent/20 to-teal/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-teal/20 to-navy/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-chart-1/15 to-chart-2/15 rounded-full blur-2xl -z-10"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* === Floating Particles === */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* === Grid Animation Keyframes === */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 50px 50px, 50px 50px;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroBanner;
