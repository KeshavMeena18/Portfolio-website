"use client";

import React, { useState, useRef } from "react";
import { Github } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./Card3D"; // keep your Card3D

const ProjectCard = ({
  title,
  description,
  image,
  video,
  gif,
  githubLink,
  liveLink,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  // small helper: try to find video if ref wasn't assigned yet
  const ensureVideoRef = () => {
    if (videoRef.current) return videoRef.current;
    if (!wrapperRef.current) return null;
    const found = wrapperRef.current.querySelector("video");
    if (found) videoRef.current = found;
    return videoRef.current;
  };

  const playVideoNow = () => {
    const v = ensureVideoRef();
    if (!v) {
      console.warn(`[ProjectCard] no <video> element for "${title}"`);
      return;
    }
    v.muted = true; // required for autoplay in many browsers
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.then === "function") {
      p
        .then(() => console.log(`[ProjectCard] 🎬 Video started for "${title}"`))
        .catch((err) =>
          console.warn(`[ProjectCard] ❌ play() blocked for "${title}":`, err)
        );
    }
  };

  const stopVideoNow = () => {
    const v = ensureVideoRef();
    if (!v) return;
    v.pause();
    try {
      v.currentTime = 0;
    } catch (err) {
      /* ignore */
    }
    console.log(`[ProjectCard] ⏸ Video paused/reset for "${title}"`);
  };

  // handlers bound to native wrapper so they fire for the whole card
  const handlePointerEnter = () => {
    // debug: uncomment if you need logs
    // console.log(`[ProjectCard] pointer enter → ${title}`);
    setIsHovered(true);
    playVideoNow();
  };

  const handlePointerLeave = () => {
    // console.log(`[ProjectCard] pointer leave → ${title}`);
    setIsHovered(false);
    stopVideoNow();
  };

  // keyboard accessibility: play on focus, stop on blur
  const handleFocus = () => {
    setIsHovered(true);
    playVideoNow();
  };
  const handleBlur = () => {
    setIsHovered(false);
    stopVideoNow();
  };

  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-[#0d0d0d] relative group/card  
        dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.15] 
        dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-[250px] sm:w-[320px] h-auto rounded-xl p-6 border transition-all"
      >
        {/* Native wrapper captures pointer/focus for the whole card without touching animation */}
        <div
          ref={wrapperRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onTouchStart={handlePointerEnter}
          onTouchEnd={handlePointerLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // don't steal focus from inner links; but allow keyboard focus if user tabs to card
          tabIndex={-1}
          className="w-full"
        >
          {/* Title */}
          <CardItem translateZ="50" className="text-lg font-bold text-neutral-200">
            {title}
          </CardItem>

          {/* Description */}
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-400 text-xs mt-2 line-clamp-3"
          >
            {description}
          </CardItem>

          {/* Media */}
          <CardItem
            translateZ="100"
            className="w-full mt-3 relative rounded-lg overflow-hidden"
          >
            <div className="relative h-48 w-full">
              {/* Base image (unchanged animation classes) */}
              <img
                src={image}
                alt={title}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover rounded-lg transition-opacity duration-300 ${
                  isHovered ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                }`}
              />

              {/* Video (unchanged behaviour, still uses same classes & attributes) */}
              {video ? (
                <video
                  ref={videoRef}
                  src={video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={image}
                  onCanPlay={() => {
                    // defensive play if video becomes ready while hovered
                    if (isHovered && videoRef.current) {
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  onPlay={() => console.log(`[ProjectCard] ✅ Video is playing for "${title}"`)}
                  onError={(e) => console.error(`[ProjectCard] Video error for "${title}":`, e)}
                  className={`absolute inset-0 h-full w-full object-cover rounded-lg transition-opacity duration-300 ${
                    isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                />
              ) : (
                /* GIF fallback (unchanged) */
                gif && (
                  <img
                    src={gif}
                    alt={`${title} demo`}
                    className={`absolute inset-0 h-full w-full object-cover rounded-lg transition-opacity duration-300 ${
                      isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  />
                )
              )}
            </div>
          </CardItem>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-5">
            <CardItem
              translateZ={20}
              as="a"
              href={githubLink}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-normal text-white hover:underline"
            >
              <Github size={14} /> GitHub
            </CardItem>

            <CardItem
              translateZ={20}
              as="a"
              href={liveLink}
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-black text-[11px] font-bold shadow-md hover:shadow-lg transition"
            >
              See Project →
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;
