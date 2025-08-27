import React from "react";
import { motion } from "framer-motion";

const WorkCard = ({ title, logo, image }) => {
  return (
    <div className="relative group flex flex-col items-center text-center w-40 md:w-56">
      {/* Background image (appears on hover, behind logo) */}
      <motion.img
        src={image}
        alt={title}
        className="absolute top-1/2 left-1/2 w-36 md:w-52 rounded-xl opacity-0 group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2 z-0"
        initial={{ scale: 0.85, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Logo always visible */}
      <motion.img
        src={logo}
        alt={`${title} logo`}
        className="relative w-16 h-16 md:w-24 md:h-24 object-contain z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* Title */}
      <p className="mt-3 text-base font-medium">{title}</p>
    </div>
  );
};

export default WorkCard;
