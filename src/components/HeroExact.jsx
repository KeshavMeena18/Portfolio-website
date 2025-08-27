import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import profileImg from "../assets/keshav-portrait.png"; // put your image here

/* small inline icons */
const IconCheck = ({ className="w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconUser = ({ className="w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconDoc = ({ className="w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconStar = ({ className="w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M12 17.3l-5.6 3.2 1.4-6.2L3 9.8l6.4-.6L12 3.5l2.6 5.7 6.4.6-4.8 4.5 1.4 6.2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const stats = [
  { id: "p", metric: "25+", label: "Projects Completed", icon: <IconCheck /> },
  { id: "c", metric: "15+", label: "Clients Worldwide", icon: <IconUser /> },
  { id: "cs", metric: "25+", label: "UX Case Studies", icon: <IconDoc /> },
  { id: "r", metric: "5★", label: "Ratings on Upwork", icon: <IconStar /> },
];

export default function HeroExact(){
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  /* framer variants */
  const leftVar = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.72, ease: [0.22,1,0.36,1] } } };
  const portraitVar = { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.12 } } };
  const statContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.28 } } };
  const statItem = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };

  const floatT = prefersReduced ? {} : { y: [0,-10,0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } };

  return (
    <section id="home" className="relative pt-24 pb-20">
      <div className="container mx-auto px-6" style={{ maxWidth: "var(--container-max)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT */}
          <motion.div className="lg:col-span-6" initial="hidden" whileInView="show" viewport={{ once:true, amount:0.3 }} variants={leftVar}>
            <p className="text-sm text-[var(--accent-green)] font-medium mb-3">Hello, I'm</p>
            <h1 className="text-[clamp(40px,6vw,88px)] font-extrabold leading-tight text-white">
              Alex
              <span className="block text-xl md:text-2xl font-semibold mt-2 text-[var(--text)]">professional ui/ux designer.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[var(--text-dim)]">
              With 3+ years of experience, I help brands and startups bring their vision to life through thoughtful and elegant design. I focus on UX-driven interfaces, motion, and front-end implementation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-pill px-6 bg-[var(--accent-green)] text-black shadow-lg hover:brightness-95 transition">Hire Me</a>
              <a href="/Keshav_CV.pdf" className="btn-pill px-6 border border-white/12 text-white/90 hover:border-white/20 transition">Download CV</a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="lg:col-span-6 relative">
            <motion.div initial="hidden" whileInView="show" viewport={{once:true, amount:0.3}} variants={portraitVar} className="w-full flex justify-center lg:justify-end">

              {/* portrait + arc container */}
              <div className="relative" style={{ width: 420, maxWidth: "90%" }}>

                {/* neon arc (SVG) */}
                <svg viewBox="0 0 520 520" width="520" height="520" className="absolute -right-8 -top-12 arc-glow pointer-events-none" aria-hidden>
                  <defs>
                    <linearGradient id="ggrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="rgba(25,228,135,0.35)" />
                    </linearGradient>
                    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {/* arc path */}
                  <path d="M70 380 C150 120 370 120 450 380" stroke="url(#ggrad)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#blur)"/>
                </svg>

                {/* arch frame (using border + mask) */}
                <div className="relative p-1 rounded-t-[40px] rounded-b-md bg-[rgba(255,255,255,0.02)]" style={{ width: 420, height: 420 }}>
                  <div className="rounded-t-[40px] rounded-b-md overflow-hidden portrait-mask border border-white/6" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.1))" }}>
                    <img src={profileImg} alt="Keshav portrait" className="w-full h-full object-cover" />
                    {/* bottom glass block fade */}
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "28%", background: "linear-gradient(180deg, rgba(13,19,21,0) 0%, rgba(11,19,21,0.85) 100%)" }} />
                  </div>
                </div>

                {/* stat cards container (absolute positions around portrait) */}
                <motion.div ref={containerRef} initial="hidden" whileInView="show" viewport={{once:true, amount:0.2}} variants={statContainer} className="absolute inset-0 pointer-events-none">

                  {/* top-left */}
                  <motion.div variants={statItem} className="glass absolute -left-6 -top-6 p-3 flex items-center gap-3 pointer-events-auto" style={{ width: 220 }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--accent-green)] bg-black/25">
                      <IconCheck />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{stats[0].metric}</div>
                      <div className="text-xs text-[var(--text-dim)]">{stats[0].label}</div>
                    </div>
                  </motion.div>

                  {/* right-upper */}
                  <motion.div variants={statItem} className="glass absolute -right-6 top-10 p-3 flex items-center gap-3 pointer-events-auto" style={{ width: 220 }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--accent-green)] bg-black/25">
                      <IconDoc />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{stats[2].metric}</div>
                      <div className="text-xs text-[var(--text-dim)]">{stats[2].label}</div>
                    </div>
                  </motion.div>

                  {/* bottom-left */}
                  <motion.div variants={statItem} className="glass absolute -left-12 bottom-6 p-3 flex items-center gap-3 pointer-events-auto" style={{ width: 220 }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--accent-green)] bg-black/25">
                      <IconUser />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{stats[1].metric}</div>
                      <div className="text-xs text-[var(--text-dim)]">{stats[1].label}</div>
                    </div>
                  </motion.div>

                  {/* right-mid lower */}
                  <motion.div variants={statItem} className="glass absolute right-0 bottom-20 p-3 flex items-center gap-3 pointer-events-auto" style={{ width: 220 }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--accent-green)] bg-black/25">
                      <IconStar />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{stats[3].metric}</div>
                      <div className="text-xs text-[var(--text-dim)]">
                        Ratings on <span style={{ color: "var(--upwork-green)", fontWeight: 700 }}>Upwork</span>
                      </div>
                    </div>
                  </motion.div>

                </motion.div>

              </div>
            </motion.div>

            {/* decorative motif (faint) */}
            <svg className="absolute left-6 bottom-6 opacity-5 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
              <rect x="8" y="8" width="104" height="104" stroke="rgba(255,255,255,0.03)" strokeWidth="1.2" rx="8"/>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
