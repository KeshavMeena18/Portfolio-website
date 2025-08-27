import React, { useEffect } from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/keshav-portrait.png";
import { CardContainer, CardBody, CardItem } from "./Card3D";

export default function AboutSection() {
  useEffect(() => {
    const glow = document.getElementById("about-card-glow");
    if (!glow) return;

    const handleMove = (e) => {
      const rect = glow.parentElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty("--x", `${x}%`);
      glow.style.setProperty("--y", `${y}%`);
    };

    glow.parentElement.addEventListener("mousemove", handleMove);
    return () => glow.parentElement?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#111111] text-white flex items-center py-20 lg:py-2"
    >
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side - Illustration / Portrait */}
        <motion.div
          className="lg:col-span-5 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CardContainer className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px]">
            <CardBody className="relative rounded-3xl group overflow-hidden">
              
              {/* Glow overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="glow absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                  id="about-card-glow"
                ></div>
              </div>

              <CardItem translateZ={40} className="relative w-full">
                <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"></div>
                <img
                  src={aboutImg}
                  alt="About portrait"
                  className="relative z-10 w-full h-[430px] rounded-3xl object-cover shadow-lg"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            About <span className="text-[var(--accent-green)]">Me</span>
          </h2>

          <p className="text-[var(--text-dim)] text-lg leading-relaxed max-w-2xl">
            Hi, I’m{" "}
            <span className="text-white font-semibold">Keshav Meena</span>, a{" "}
            <span className="text-[var(--accent-green)]">
              Full Stack Developer
            </span>{" "}
            passionate about building intuitive, scalable, and visually polished
            applications. My goal is to combine design and code into seamless
            digital experiences.
          </p>

          <p className="text-[var(--text-dim)] text-lg leading-relaxed max-w-2xl">
            With <span className="text-white font-semibold">3+ years</span> of
            professional experience, I’ve delivered impactful projects for
            startups and clients globally. Outside of work, I enjoy exploring
            new tools and pushing creative boundaries.
          </p>
          <a
          href="/resume.pdf"
          download="Keshav_Resume.pdf"
          className="btn-pill px-6 md:px-8 py-2 md:py-3 text-base md:text-lg border border-white/12 text-white/90 hover:border-white/20 transition"
        >
          Download CV
        </a>
        </motion.div>
      </div>
    </section>
  );
}
