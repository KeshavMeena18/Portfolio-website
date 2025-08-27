import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React and TailwindCSS.",
      image: "https://picsum.photos/800/600?random=1",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Demo video
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "https://your-portfolio-demo.vercel.app/",
    },
    {
      title: "Weather App",
      description: "Get real-time weather updates with a sleek UI.",
      image: "https://picsum.photos/800/600?random=2",
      video: "https://media.giphy.com/media/syEfLvksYQnmM/giphy.gif", // Demo gif
      githubLink: "https://github.com/yourusername/weather-app",
      liveLink: "https://weather-demo.vercel.app/",
    },
    {
      title: "E-Commerce Store",
      description: "Full-stack e-commerce platform with cart & payments.",
      image: "https://picsum.photos/800/600?random=3",
      video: "https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif", // Demo gif
      githubLink: "https://github.com/yourusername/ecommerce-store",
      liveLink: "https://ecommerce-demo.vercel.app/",
    },
    {
      title: "AI Image Generator",
      description: "Generate unique images with AI prompts.",
      image: "https://picsum.photos/800/600?random=5",
      video: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
      githubLink: "https://github.com/yourusername/ai-image-gen",
      liveLink: "https://ai-image-demo.vercel.app/",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-gradient-to-b from-[#090909] to-[#000000] text-white py-12 lg:py-"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        <span className="text-white">My </span>
        <span className="text-emerald-500">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            video={project.video} // Pass video here
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
