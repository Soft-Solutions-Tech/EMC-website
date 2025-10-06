import * as React from "react";
import { motion, useInView } from "framer-motion";
import { content } from "../../../data/about.js";

export function WhoWeAreSection() {
  const ref = React.useRef(null);
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const isInView = useInView(ref, {
    once: false,
    threshold: 0.3,
    margin: "-100px",
  });

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, []);

  const handleVideoLoad = React.useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Who We Are section"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black"
    >
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          videoLoaded ? "opacity-0" : "opacity-60"
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 105, 150, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 105, 150, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, transparent 0%, rgba(0, 105, 150, 0.03) 50%, transparent 100%)
          `,
        }}
        aria-hidden="true"
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        width={1920}
        height={1080}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={handleVideoLoad}
        onCanPlayThrough={handleVideoLoad}
      >
        <source src={content.video.mp4} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 z-10"
        aria-hidden="true"
      />

      <motion.div className="relative z-20 w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {content.title}
          </motion.h1>

          <motion.div
            className="mx-auto h-1 w-32 bg-primary rounded-full shadow-md"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-base sm:text-lg md:text-xl text-primary-foreground/90 drop-shadow-md font-medium max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {content.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhoWeAreSection;
