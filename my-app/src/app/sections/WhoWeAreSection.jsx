'use client';
import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAreSection = () => {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-end justify-center overflow-hidden">
            {/* Video background */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/videos/mixkit-buildings-under-construction-aerial-view-4010-full-hd.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/logos/EMC-LOGO.png"
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            {/* Text overlay */}
            <motion.div
                className="relative z-20 w-full flex flex-col items-center pb-20 sm:pb-28"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white text-center drop-shadow-lg tracking-tight">
                    Who We Are
                </h1>
                <motion.div
                    className="w-48 h-1 bg-gradient-to-r from-accent via-teal to-navy mx-auto rounded-full mt-4"
                    initial={{ width: 0 }}
                    animate={{ width: 192 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.p
                    className="mt-8 max-w-2xl text-lg sm:text-xl text-white/90 text-center drop-shadow-md font-medium"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    EMC is a leading engineering and construction company with over 25 years of experience. We specialize in delivering innovative solutions for industrial, energy, and infrastructure projects, combining technical expertise with a commitment to quality and client satisfaction.
                </motion.p>
            </motion.div>
        </section>
    );
};

export default WhoWeAreSection; 