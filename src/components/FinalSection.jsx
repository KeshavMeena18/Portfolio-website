import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // ok to keep if you use elsewhere
import Avatar from "../assets/Avatar2.png";
import { Link } from "react-router-dom";
import AnimatedBorderButton from "./AnimatedBorderButton";


export default function FinalSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let rafId;
    let lastSpawn = 0;
    const particles = [];
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    ctx.globalCompositeOperation = "lighter";

    const spawnBurst = () => {
      const rect = section.getBoundingClientRect();
      const x = rect.width * (0.15 + Math.random() * 0.7);  // avoid hard edges
      const y = rect.height * (0.2 + Math.random() * 0.45); // upper/middle area
      const count = 26 + Math.floor(Math.random() * 22);
      const hue = 20 + Math.random() * 20; // warm orange range

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.25;
        const speed = 0.9 + Math.random() * 2.1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.floor(Math.random() * 30),
          size: 1 + Math.random() * 2.2,
          hue,
        });
      }
    };

    const loop = (ts = 0) => {
      rafId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn every 500–900ms
      if (!lastSpawn || ts - lastSpawn > 500 + Math.random() * 400) {
        spawnBurst();
        lastSpawn = ts;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        // drag + subtle gravity for natural motion
        p.vx *= 0.99;
        p.vy = p.vy * 0.99 + 0.012;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const r = p.size * 3.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue + 10}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-black from-18% via-[#4e2b17] via-100% to-orange-500 text-white text-center p-5 relative overflow-hidden"
    >
      {/* Fireworks layer: above background, below content */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="mb-5 relative z-10">
        {/* Equivalent to margin-bottom: 50px */}
        <div className="flex justify-center items-center mb-8">
          <img
            src={Avatar}
            alt="Avatar"
            className="w-36 h-36 rounded-full object-cover overflow-hidden"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-[#ffffff]">
          {/* Equivalent to font-size, margin-bottom, color */}
          Yay! <span className="text-[#FE4F05]">You made it</span> this far
        </h1>

        <p className="text-2xl font-medium mb-10">
          {/* Equivalent to font-size, margin-bottom */}
          Clearly, we vibe. Let's make cool stuff together.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          {/* Equivalent to display: flex, gap, flex-wrap, justify-content */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded border border-none text-white font-normal transition-colors duration-300 hover:text-orange-500"
          >
            View Resume
          </a>
          <a
            href="https://www.linkedin.com/in/keshav-meena/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded border border-none text-white font-normal transition-colors duration-300 hover:text-orange-500"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/keshav_.meena/?next=%2F"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded border border-none text-white font-normal transition-colors duration-300 hover:text-orange-500"
          >
            Instagram
          </a>
          <AnimatedBorderButton className="bgColor='#111827' textColor='white' color='#f97316'">
            <Link
              to="/contact"
              className="px-4 py-2  rounded-lg"
            >
              Contact
            </Link>
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
}
