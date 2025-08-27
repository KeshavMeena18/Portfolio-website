import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./Card3D";

const skills = [
  { name: "React", desc: "Frontend library", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Redux Toolkit", desc: "State management", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "TypeScript", desc: "Typed JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", desc: "Core language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", desc: "Markup", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", desc: "Styling", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Tailwind CSS", desc: "Utility CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Node.js", desc: "Backend runtime", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", desc: "Web framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "SQL", desc: "Databases", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "C++", desc: "Programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", desc: "OOP language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Git", desc: "Version control", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", desc: "Code hosting", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", desc: "Design and prototyping", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "MongoDB", desc: "NoSQL database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

export default function SkillsSection() {
  const glowRef = useRef(null);
  const hitRef = useRef(null);
  const rafRef = useRef(null);

  // Clean up any pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = (e) => {
    const glow = glowRef.current;
    const area = hitRef.current;
    if (!glow || !area) return;

    // pointer events give clientX/clientY (works for mouse & touch)
    const rect = area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Throttle with rAF for smoothness
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // Position the glow using transform (fast, GPU-accelerated)
      // We translate to x,y then center by translate(-50%,-50%)
      glow.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -50%)`;
    });
  };

  const handlePointerEnter = (e) => {
    const glow = glowRef.current;
    if (!glow) return;
    // position immediately where the pointer is (no delay)
    handlePointerMove(e);
    glow.classList.add("visible");
  };

  const handlePointerLeave = () => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.classList.remove("visible");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // send it off-screen to avoid accidental flashes
    glow.style.transform = `translate3d(-9999px, -9999px, 0) translate(-50%, -50%)`;
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen bg-gradient-to-b from-[#111111] to-[#090909] text-white py-12 lg:py-25"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-12"
        >
          My <span className="text-[var(--accent-green)]">Skills</span>
        </motion.h2>

        <CardContainer className="w-full max-w-6xl mx-auto">
          {/* outer card styled like About card */}
          <CardBody className="relative w-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg overflow-hidden">
            {/* Glow spotlight — positioned absolutely and controlled via JS */}
            <div
              ref={glowRef}
              aria-hidden="true"
              className="glow-follow"
              // initial off-screen transform is handled in CSS, JS will update it
            />

            {/* Content wrapper with pointer tracking */}
            <div
              ref={hitRef}
              onPointerMove={handlePointerMove}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              className="relative z-10 p-8"
            >
              <CardItem translateZ={30}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.03 }}
                      className="flex items-center gap-3"
                    >
                      {/* unchanged small skill chip */}
                      <div className="glass w-14 h-14 flex items-center justify-center rounded-lg shadow-md">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{skill.name}</p>
                        <p className="text-sm text-[var(--text-dim)]">{skill.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
}
