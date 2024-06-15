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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
    <section id="projects" className="py-5 md:mt-5 space-y-8 container">
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
      <motion.div
        variants={projectItem}
        initial="hidden"
        whileInView="visible"
        className=" cursor-grab"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {projects
              .slice()
              .reverse()
              .map((item, index) => (
                <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="h-full dark:bg-cardBg transition-colors duration-1000 ease-primary hover:shadow-lg dark:hover:border-violet-500 hover:border-gray-300 group">
                    <div className="flex justify-center -translate-y-[1px]">
                      <div className="w-3/4">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-2xl scale-105 border">
                      <Image
                        src={item.image}
                        width={400}
                        height={300}
                        alt={item.name}
                        className="object-cover rounded-2xl w-full aspect-[4/3] group-hover:scale-105 transition-all duration-300 "
                      />
                    </div>
                    <CardHeader>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="text-left cursor-text">
                            <CardTitle className="text-lg line-clamp-2">
                              {item.name}
                            </CardTitle>
                          </TooltipTrigger>
                          <TooltipContent
                            className="z-50 relative"
                            side="bottom"
                          >
                            <p> {item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <CardDescription>
                        <span className="flex flex-wrap gap-3 mt-3 text-xl">
                          {item.technologies.map((Icon, i) => (
                            <Icon key={i} />
                          ))}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-lato">
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
                                <span className="-mt-[1px]">
                                  {preview.label}
                                </span>
                                <FaExternalLinkAlt />
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Project;
