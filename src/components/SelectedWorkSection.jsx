import React from "react";
import { motion } from "framer-motion";

import sinchaiApp from "../assets/sinchai-app.png";
import sinchailogo from "../assets/sinchai-logo.png";
import rideshare from "../assets/Rideshare.png";
import rideshareLogo from "../assets/rideshare-logo.png";
import spendologo from "../assets/Spendo.png";
import spendo from "../assets/Spendo-app.png";


const WORK = [
  {
    title: "Sinchai Saathi",
    logo: sinchailogo,
    preview: sinchaiApp,
  },
  {
    title: "RideShare",
    logo: rideshareLogo,
    preview: rideshare,
  },
  {
    title: "Spendo",
    logo: spendologo,
    preview: spendo,
  },
  {
    title: "Everything Visuals (demo)",
    logo: "https://picsum.photos/100/100?random=33",
    preview: "https://picsum.photos/240/460?random=133",
  },
];

const phoneVariants = {
  rest: { opacity: 0, y: 12, scale: 0.8, rotate: -2 },
  hover: { opacity: 1, y: -6, scale: 1.15, rotate: -2 },
};

const logoVariants = {
  rest: { scale: 1 },
  hover: { scale: 0.9 }, // logo shrinks a bit
};

const hintVariants = {
  rest: { opacity: 0, y: 4 },
  hover: { opacity: 1, y: 0 },
};

export default function SelectedWorkSection() {
  return (
    <section className="relative bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24 text-center"> {/* increased margin bottom */}
          <h2 className="text-3xl md:text-4xl font-extrabold">Selected Work</h2>
          <p className="mt-4 text-base text-white/60">
            Work I’m proud of, crafted with care.
          </p>
        </div>

        {/* Work logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-14 md:gap-16 overflow-visible">
          {WORK.map((item) => (
            <motion.button
              key={item.title}
              type="button"
              className="relative mx-auto outline-none overflow-visible"
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileFocus="hover"
            >
              {/* Hover preview card */}
              <motion.img
                variants={phoneVariants}
                src={item.preview}
                alt={`${item.title} preview`}
                className="
                  pointer-events-none
                 absolute left-1/2 -translate-x-1/2 bottom-1
                 w-32 sm:w-40 md:w-44
                drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]
                rounded-xl
                 z-10
                "
              />

              {/* Logo */}
              <motion.div
                variants={logoVariants}
                className="relative z-20 flex flex-col items-center"
              >
                <div className="relative">
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="
                      w-20 h-20 sm:w-24 sm:h-24
                      rounded-xl object-cover
                      shadow-lg
                    "
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gloss shine */}
                  <div
                    className="
                      absolute inset-0 
                      rounded-xl
                      bg-gradient-to-t from-white/30 to-transparent
                      pointer-events-none
                    "
                  />
                </div>

                {/* Hover hint */}
                <motion.div
                  variants={hintVariants}
                  className="mt-2 text-[11px] text-white/70"
                >
                  View project
                </motion.div>

                {/* Title */}
                <p className="mt-2 text-sm font-medium text-center">
                  {item.title}
                </p>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
