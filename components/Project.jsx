"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import projects from "@/public/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
const containerTitle = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const projectItem = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const Project = () => {
  return (
    <section id="projects" className="py-5 md:mt-5 overflow-hidden container">
      <motion.div
        variants={containerTitle}
        initial="hidden"
        whileInView="visible"
      >
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          Projects
        </h1>
        <h2 className="pb-2 mt-5 text-3xl font-semibold tracking-tight transition-colors border-b md:mt-10 scroll-m-20 first:mt-0">
          Crafting the Web: A Showcase of My Web Development Projects
        </h2>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-6">
        {projects
          .slice()
          .reverse()
          .map((item, index) => (
            <motion.div
              key={index}
              variants={projectItem}
              initial="hidden"
              whileInView="visible"
            >
              <Card className="h-full transition-colors duration-1000 ease-primary hover:shadow-lg dark:hover:border-violet-500 hover:border-gray-300 group">
                <div className="flex justify-center -translate-y-[1px]">
                  <div className="w-3/4">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
                  </div>
                </div>
                <CardHeader
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="overflow-hidden rounded-lg basis-1/2">
                    <Image
                      src={item.image}
                      width={400}
                      height={300}
                      alt={item.name}
                      className="object-cover w-full aspect-[19/10] md:aspect-[23/10] group-hover:scale-105 transition-all duration-300 "
                    />
                  </div>
                  <div className="flex flex-col justify-center pt-5 md:pr-0 md:p-5 basis-1/2">
                    <CardTitle className="text-lg md:text-2xl font-oswald">
                      {item.name}
                    </CardTitle>
                    <CardDescription>
                      <span className="flex flex-wrap gap-3 mt-5 text-xl md:text-3xl">
                        {item.technologies.map((Icon, i) => (
                          <Icon key={i} />
                        ))}
                      </span>
                    </CardDescription>
                    <ul className="flex flex-wrap gap-x-5 gap-y-3 mt-6 text-base md:text-xl font-oswald">
                      {item.githubLinks.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-300 hover:text-violet-500"
                          >
                            <p className="flex items-center gap-3 flex-nowrap w-fit">
                              <span className="-mt-[1px]">{link.label}</span>
                              <FaGithub />
                            </p>
                          </Link>
                        </li>
                      ))}
                      {item.liveDemoLinks.map((preview, index) => (
                        <li key={index}>
                          <Link
                            href={preview.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-300 hover:text-violet-500"
                          >
                            <p className="flex items-center gap-3 flex-nowrap">
                              <span className="-mt-[1px]">{preview.label}</span>
                              <FaExternalLinkAlt />
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm md:text-base">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default Project;
