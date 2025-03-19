"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import projects from "@/public/data/projects";

const Project = () => {
  const displayedProjects = [...projects].reverse();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-14 text-center text-white"
        >
          Project Showcase 🚀
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {displayedProjects.map((project, i) => (
            <ProjectCard key={`p_${project.id}`} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col"
    >
      <div
        className="
          w-full rounded-2xl 
          bg-gray-100/10 backdrop-blur-lg 
          border border-gray-200/20 
          shadow-md hover:shadow-lg 
          transition-all duration-300 
          overflow-hidden 
          flex flex-col
        "
      >
        {/* Image Section with 16/9 ratio */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" /* 16/9 ratio */ }}>
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-105"
            loading={index > 2 ? "lazy" : "eager"}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 line-clamp-2">
            {project.name}
          </h2>

          <div className="mb-4">
            <span className="flex flex-wrap gap-2 text-2xl text-gray-300">
              {project.technologies.map((Icon, idx) => (
                <Icon
                  key={idx}
                  className="hover:text-blue-400 transition-colors duration-200"
                />
              ))}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-auto">
            {project.liveDemoLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                {link.label}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            ))}

            {project.githubLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                {link.label}
                <Github className="ml-1 h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Project;