import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/keshav-portrait.png";
import { FlipWords } from "./FlipWords";
import { CardContainer, CardBody, CardItem } from "./Card3D";

const stats = [
  { id: 1, label: "Projects Completed", value: "10+", color: "var(--accent-green)" },
  { id: 2, label: "Hackathons Participated", value: "15+", color: "var(--accent-green)" },
  { id: 3, label: "Years Experience", value: "3+", color: "var(--accent-green)" },
];

const leftVar = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const portraitVar = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const statItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative bg-[var(--bg)] text-white pt-20 pb-28 overflow-hidden">
  <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
    
    {/* Left Content */}
    <motion.div
      className="lg:col-span-6 lg:pl-6 space-y-5 text-center lg:text-left"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={leftVar}
    >
      <p className="text-xl md:text-2xl text-[var(--accent-green)] font-bold mb-2 flex items-center justify-center lg:justify-start gap-2">
        Hello, I'm
        <motion.span
          className="inline-block text-3xl md:text-4xl"
          animate={{ rotate: [0, 20, -10, 20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        >
          👋
        </motion.span>
      </p>

      <h1 className="text-[clamp(32px,6vw,72px)] font-extrabold leading-snug text-white">
        Keshav
        <span className="block text-lg md:text-2xl font-semibold mt-1 text-[var(--text)]">
          <FlipWords words={["Developer", "Creator", "Designer."]} />
        </span>
      </h1>

      <p className="max-w-xl mx-auto lg:mx-0 text-[var(--text-dim)] leading-loose text-base md:text-lg">
         Software developer with hands-on project experience and 5+ hackathons, including a winning solution, passionate about building impactful applications.
      </p>

      <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
        <a
          href="#contact"
          className="btn-pill px-6 md:px-8 py-2 md:py-3 text-base md:text-lg bg-[var(--accent-green)] text-black shadow-lg hover:brightness-95 transition"
        >
          Hire Me
        </a>
        <a
          href="/resume.pdf"
          download="Keshav_Resume.pdf"
          className="btn-pill px-6 md:px-8 py-2 md:py-3 text-base md:text-lg border border-white/12 text-white/90 hover:border-white/20 transition"
        >
          Download CV
        </a>
      </div>
    </motion.div>

    {/* Right Content (Portrait + Frame + Stats) */}
        <motion.div
          className="lg:col-span-6 relative flex justify-center items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={portraitVar}
        >
          <CardContainer containerClassName="!py-0">
            <CardBody className="
              relative 
              w-[220px] sm:w-[280px] md:w-[330px] lg:w-[360px]
              h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px]
            ">

              {/* back glass plate (slightly behind) */}
              <CardItem translateZ={-40}>
                <div
                  className="
                    absolute inset-0
                    rounded-t-[110px] sm:rounded-t-[140px] md:rounded-t-[160px] lg:rounded-t-[180px]
                    backdrop-blur-md bg-green-500/10 border border-green-400/40
                  "
                />
              </CardItem>

              {/* the portrait — POPS OUT on hover */}
              <CardItem translateZ={70}>
                <img
                  src={profileImg}
                  alt="Profile"
                  className="
                    relative z-10 w-full h-full object-cover
                    rounded-t-[110px] sm:rounded-t-[140px] md:rounded-t-[160px] lg:rounded-t-[180px]
                  "
                />
              </CardItem>

              {/* optional: glow that intensifies when hovered */}
              <CardItem translateZ={60}>
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_30px_60px_rgba(0,255,140,0.15)]" />
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Stat cards unchanged and OUTSIDE the tilt wrapper */}
          <div className="absolute -bottom-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg text-center"
                variants={statItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <p
                  className="text-xl sm:text-2xl md:text-3xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

  </div>
</section>

  );
}
