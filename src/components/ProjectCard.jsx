"use client";

import React, { useState } from "react";
import { Github } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./Card3D";

const ProjectCard = ({ title, description, image, video, githubLink, liveLink }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardContainer className="inter-var">
      <CardBody
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-[#0d0d0d] relative group/card  
        dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.15] 
        dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-auto sm:w-[28rem] h-auto rounded-xl p-6 border transition-all"
      >
        {/* Title */}
        <CardItem translateZ="50" className="text-2xl font-bold text-neutral-200">
          {title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-400 text-sm max-w-sm mt-2"
        >
          {description}
        </CardItem>

        {/* Image → switches to video on hover */}
        <CardItem
          translateZ="100"
          className="w-full mt-4 relative rounded-xl overflow-hidden"
        >
          <div className="relative h-80 w-full">
            {/* Image */}
            <img
              src={image}
              alt={title}
              className={`absolute inset-0 h-full w-full object-cover rounded-xl transition-opacity duration-500 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* Video (always autoplaying silently, just hidden until hover) */}
            {video && (
              <video
                src={video}
                muted
                loop
                autoPlay
                playsInline
                className={`absolute inset-0 h-full w-full object-cover rounded-xl transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </CardItem>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="a"
            href={githubLink}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-normal text-white hover:underline"
          >
            <Github size={16} /> GitHub
          </CardItem>

          <CardItem
            translateZ={20}
            as="a"
            href={liveLink}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black text-xs font-bold shadow-md hover:shadow-lg transition"
          >
            See Project →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;
