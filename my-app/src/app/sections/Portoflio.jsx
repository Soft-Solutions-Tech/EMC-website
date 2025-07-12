"use client";
import { useState, useEffect, useRef } from "react";
import { projects } from "../../../data/projects.js";
import { User, Users, BadgeDollarSign, CalendarClock, BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";

function formatDate(dateStr) {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

function InfoBar({ status, client, value }) {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-2 text-xs">
            <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-gray-700">
                <BriefcaseBusiness className="w-4 h-4 text-accent" />
                <span className="font-semibold">{status}</span>
            </span>
            <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-gray-700">
                <User className="w-4 h-4 text-primary" />
                <span className="font-semibold">{client}</span>
            </span>
            <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-gray-700">
                <BadgeDollarSign className="w-4 h-4 text-primary" />
                <span className="font-semibold">{value}</span>
            </span>
        </div>
    );
}

function Timeline({ start, end }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-2 text-xs text-gray-600">
            <span className="flex items-center gap-1">
                <CalendarClock className="w-4 h-4 text-primary" />
                {formatDate(start)}
            </span>
            <span className="mx-1 text-gray-400">→</span>
            <span className="flex items-center gap-1">
                <CalendarClock className="w-4 h-4 text-primary" />
                {formatDate(end)}
            </span>
        </div>
    );
}

function Partners({ partners }) {
    if (!partners || partners.length === 0) return null;
    return (
        <div className="flex items-center justify-center gap-2 mb-2 text-xs text-gray-700">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-semibold">Partners:</span>
            <span>{partners.join(', ')}</span>
        </div>
    );
}

function ProjectImageCarousel({ images, projectName, borderColor }) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0); // 0 to 1
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);
    const numImages = images.length;
    const DURATION = 5000;

    useEffect(() => {
        setProgress(0);
        timeoutRef.current && clearTimeout(timeoutRef.current);
        intervalRef.current && clearInterval(intervalRef.current);

        // Animate progress
        let start = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.min(elapsed / DURATION, 1));
        }, 30);

        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % numImages);
        }, DURATION);
        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
        };
    }, [current, numImages]);

    const goTo = (idx) => {
        setCurrent(idx);
        setProgress(0);
    };

    // For scrollable/swipeable, wrap in a scrollable div
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
            <div className="w-full h-full flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((img, idx) => (
                    <img
                        key={img}
                        src={img}
                        alt={`${projectName} image ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg flex-shrink-0"
                        style={{ minWidth: '100%', minHeight: '100%' }}
                        draggable={false}
                    />
                ))}
            </div>
            {/* Pagination dots with animated border */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => {
                    const isActive = current === idx;
                    const radius = 7;
                    const circumference = 2 * Math.PI * radius;
                    const dashoffset = isActive ? circumference * (1 - progress) : circumference;
                    return (
                        <button
                            key={idx}
                            className={`relative w-4 h-4 flex items-center justify-center bg-transparent p-0 border-none outline-none`}
                            onClick={() => goTo(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                        >
                            <span className={`absolute w-full h-full rounded-full bg-white/70 border border-white ${isActive ? 'shadow-lg' : ''}`}></span>
                            <svg width={16} height={16} className="absolute top-0 left-0" style={{ pointerEvents: 'none' }}>
                                <circle
                                    cx={8}
                                    cy={8}
                                    r={radius}
                                    fill="none"
                                    stroke={borderColor}
                                    strokeWidth={2}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashoffset}
                                    style={{ transition: isActive ? 'stroke-dashoffset 0.1s linear' : 'none' }}
                                />
                            </svg>
                            <span className={`relative w-2 h-2 rounded-full bg-white ${isActive ? 'bg-accent' : ''}`}></span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

const sectionHeadings = [
    {
        label: 'EPC Projects', idx: 0, desc: [
            'Complete EPC solutions for Diesel and hydrogen plants and District cooling plants',
            'Including engineering, procurement, civil works, installation, and commissioning'
        ]
    },
    {
        label: 'Consulting Projects', idx: 2, desc: [
            'Identify opportunities',
            'Influence specifications',
            'Develop win strategies and target price',
            'Leverage relationships with key decision makers and influencers to win major projects',
            'Consulting and services for wind and solar projects on behalf of clients'
        ]
    },
    {
        label: 'After Sales Projects', idx: 4, desc: [
            'Technical advice',
            'Repair and maintenance',
            'Spare parts and overhauls'
        ]
    },
];

export default function PortoflioSection() {
    // Select up to 6 featured products
    const featured = projects.slice(0, 6);
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="mb-12 sm:mb-16 lg:mb-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2">
                        Our Project Portfolio
                    </h2>
                    <div className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md" />
                </div>
                <div className="flex flex-col gap-8">
                    {featured.map((project, idx) => {
                        // Insert heading before rows 0, 2, 4
                        const heading = sectionHeadings.find(h => h.idx === idx);
                        // Determine border color for dots
                        let borderColor = '#00AEEF';
                        if (idx === 2 || idx === 3) borderColor = '#00263A';
                        return (
                            <>
                                {heading && (
                                    <div className={`mb-8 ${idx === 0 ? 'mt-0' : 'mt-4'} text-center`}>
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2">
                                            {heading.label}
                                        </h3>
                                        {heading.desc && (
                                            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mt-6 leading-relaxed font-semibold">
                                                {heading.desc.map((desc, index) => (
                                                    <span key={index}>
                                                        {desc}
                                                        {index < heading.desc.length - 1 ? ', ' : '.'}
                                                    </span>
                                                ))}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className={`grid grid-cols-1 sm:grid-cols-2 items-center gap-6 rounded-xl shadow p-6 min-h-[220px] sm:min-h-[400px] lg:min-h-[500px] ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}
                                >
                                    {/* Image: left for odd, right for even (on tablet/desktop) */}
                                    <div className={
                                        idx % 2 === 1
                                            ? "order-1 sm:order-2 flex items-center justify-center h-full"
                                            : "order-1 flex items-center justify-center h-full"
                                    }>
                                        {project.images && project.images.length > 0 && (
                                            <ProjectImageCarousel images={project.images} projectName={project.name} borderColor={borderColor} />
                                        )}
                                    </div>
                                    {/* Text content */}
                                    <div className={
                                        idx % 2 === 1
                                            ? "order-2 sm:order-1 flex flex-col items-center justify-center text-center h-full"
                                            : "order-2 flex flex-col items-center justify-center text-center h-full"
                                    }>
                                        <h3 className="text-xl font-semibold text-navy mb-2">{project.name}</h3>
                                        <p className="text-gray-600 mb-2">{project.description}</p>
                                        <span className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full mb-2">{project.type}</span>
                                        <span className="text-sm text-gray-500 mb-4">{project.location}</span>
                                        <InfoBar status={project.status} client={project.client} value={project.value} />
                                        <Timeline start={project.startDate} end={project.endDate} />
                                        <Partners partners={project.partners} />
                                        <div className="flex flex-col gap-3 w-full">
                                            <a
                                                href={`/projects/${project.id}`}
                                                className="bg-accent text-white px-4 py-2 lg:py-4 rounded-lg font-semibold shadow hover:bg-accent/90 transition text-sm w-full text-center"
                                            >
                                                Explore this project
                                            </a>
                                            <a
                                                href="/projects?type=CONSULTING"
                                                className="bg-primary text-white px-4 py-2 lg:py-4 rounded-lg font-semibold shadow hover:bg-primary/90 transition text-sm w-full text-center"
                                            >
                                                {project.consultingCta || 'Explore our consulting projects'}
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
