"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import Typewriter from "./ui/Typewriter";
import emon from "/public/img/emon.webp";
const socialIcons = [
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
];

import { useInView } from "framer-motion";
import Image from "next/image";

const uptoDown = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.3,
    },
  },
};
const uptoDownItem = {
  initial: {
    y: 400,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 50,
    },
  },
};
const scaling = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

const Hero = () => {
  const containerRef = useRef(null);
  const circlesRefs = useRef([]);
  const isInView = useInView(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    const circles = circlesRefs.current;
    if (isInView) {
      if (container && circles.length > 0) {
        const radius = container.offsetWidth / 2;
        const rotation = 360 / circles.length;

        circles.forEach((circle, i) => {
          const value = `rotate(${
            i * rotation
          }deg) translate(${radius}px) rotate(-${i * rotation}deg)`;
          circle.style.transform = value;
        });
      }
    } else {
      if (circles.length > 0) {
        circles.forEach((circle) => {
          circle.style.transform = "";
        });
      }
    }
  }, [isInView]);

  const multipleSpaces = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";

  return (
    <section
      className="lg:h-[calc(100vh-64px)] py-5 md:py-10 lg:py-0 flex flex-wrap flex-col-reverse md:flex-row items-center justify-center overflow-hidden"
      id="home"
    >
      <motion.div
        variants={uptoDown}
        initial="initial"
        whileInView="animate"
        className="flex flex-col w-full gap-4 md:pr-4 md:w-7/12 lg:w-2/3"
      >
        <motion.h1
          variants={uptoDownItem}
          className="h-16 text-5xl font-extrabold tracking-tight text-left text-transparent capitalize md:h-20 md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text w-fit scroll-m-20"
        >
          Emon Singha
        </motion.h1>
        <motion.h2
          variants={uptoDownItem}
          className="pb-2 text-3xl font-semibold tracking-tight border-b min-h-12 lg:mt-3 border-b-border scroll-m-20 first:mt-0"
        >
          <Typewriter
            texts={[
              `Frontend Developer${multipleSpaces}`,
              `Converting Ideas to User Interface${multipleSpaces}`,
            ]}
            speed={100}
            isInView={isInView}
          />
        </motion.h2>
        <motion.p
          variants={uptoDownItem}
          className="text-lg lg:text-justify leading-7 [&:not(:first-child)]:mt-3"
        >
          As a Frontend Developer, I specialize in bringing ideas to life
          through captivating user interfaces. With expertise in CSS, Bootstrap,
          and Tailwind CSS, I meticulously craft designs that exceed
          expectations. Every line of code is dedicated to transforming concepts
          into visually stunning digital experiences.
        </motion.p>
        <motion.div
          variants={uptoDownItem}
          className="flex justify-center gap-3 mt-3 md:justify-start md:gap-5 "
        >
          <Button asChild size="hero">
            <Link
              href="/#"
              className="relative overflow-hidden transition-all bg-transparent border-2 border-accent-foreground hover:bg-transparent group"
            >
              <span className="absolute z-10 w-full h-full transition-all duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 bg-accent-foreground"></span>
              <span className="z-20 flex items-center justify-center gap-1 text-base font-bold tracking-widest uppercase md:gap-3 md:text-xl text-primary group-hover:text-muted font-oswald">
                Contact Me
                <MdConnectWithoutContact className="w-6 h-6" />
              </span>
            </Link>
          </Button>
          <Button asChild size="hero">
            <Link
              href="/resume"
              className="relative overflow-hidden transition-all bg-transparent border-2 border-accent-foreground hover:bg-transparent group"
              aria-label="Read more about me in Resume"
            >
              <span className="absolute z-10 w-full h-full transition-all duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 bg-accent-foreground"></span>
              <span className="z-20 flex items-center justify-center gap-1 text-base font-bold tracking-widest uppercase md:gap-3 md:text-xl text-primary group-hover:text-muted font-oswald">
                Get Resume
                <TbFileCv className="w-6 h-6" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <div className="w-full p-8 md:w-5/12 lg:w-1/3">
        <div
          className="relative grid p-8 border-2 border-gray-600 rounded-full dark:border-border place-items-center"
          ref={containerRef}
        >
          <motion.div
            variants={scaling}
            initial="initial"
            whileInView="animate"
            className="z-10"
          >
            <Image
              src={emon}
              width={600}
              height={600}
              priority
              alt="Emon Singha"
            />
          </motion.div>

          {socialIcons.map((Icon, index) => (
            <div
              key={index}
              className="absolute grid w-12 h-12 transition-transform duration-1000 bg-gray-600 rounded-full dark:bg-border ease-primary place-items-center group"
              ref={(el) => (circlesRefs.current[index] = el)}
            >
              <Icon className="w-6 h-6 transition-all duration-300 ease-in-out group-hover:rotate-[360deg] text-[#F8FAFC]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
