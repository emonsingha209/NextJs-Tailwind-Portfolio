"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { MdConnectWithoutContact } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import socialIcons from "./icon/Social";
import Typewriter from "./ui/Typewriter";
import emon from "/public/img/emon.webp";

import useScrollSpy from "@/hook/useScrollSpy";
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

  const { scrollToSection } = useScrollSpy();

  const handleClick = (item) => {
    scrollToSection(item);
  };

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
    <section id="home" className="relative z-10">
      <div className="dark:bg-[url('/img/bg-image.svg')] bg-cover absolute z-0 w-full md:h-full aspect-square"></div>
      <div className="lg:h-[calc(100vh-64px)] container h-full py-5 pt-16 md:py-10 lg:py-0 lg:pt-0 flex flex-wrap flex-col-reverse md:flex-row items-center justify-center overflow-hidden ">
        <motion.div
          variants={uptoDown}
          initial="initial"
          whileInView="animate"
          className="flex flex-col w-full gap-4 md:pr-4 md:w-7/12 lg:w-2/3"
        >
          <motion.h1
            variants={uptoDownItem}
            className="h-16 text-4xl font-extrabold tracking-tight text-left text-transparent capitalize xs:text-5xl md:h-20 md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text w-fit scroll-m-20"
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
            through captivating user interfaces. With expertise in CSS,
            Bootstrap, and Tailwind CSS, I meticulously craft designs that
            exceed expectations. Every line of code is dedicated to transforming
            concepts into visually stunning digital experiences.
          </motion.p>
          <motion.div
            variants={uptoDownItem}
            className="flex flex-col justify-center gap-3 mt-3 xs:flex-row md:justify-start md:gap-5 "
          >
            <Button asChild size="hero">
              <Link
                href="/"
                scroll={false}
                onClick={() => handleClick("contact")}
                className="relative dark:bg-cardBg overflow-hidden transition-all bg-transparent border-2 border-accent-foreground hover:bg-transparent group"
              >
                <span className="absolute z-10 w-full h-full transition-all duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 bg-accent-foreground"></span>
                <span className="z-20 flex items-center justify-center gap-1 text-base font-bold tracking-widest uppercase md:gap-3 md:text-xl text-primary group-hover:text-muted font-oswald">
                  Contact Me
                  <MdConnectWithoutContact className="w-6 h-6" />
                </span>
              </Link>
            </Button>
            <Button asChild size="hero" className="bg-card">
              <Link
                href="/resume"
                className="relative dark:bg-cardBg overflow-hidden transition-all border-2 border-accent-foreground group"
                aria-label="Read more about me in Resume"
              >
                <span className="absolute z-10 w-full h-full transition-all duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 bg-accent-foreground"></span>
                <div className="z-20 flex items-center justify-center gap-1 text-base font-bold tracking-widest uppercase md:gap-3 md:text-xl text-primary group-hover:text-muted font-oswald">
                  Get Resume
                  <div className="relative w-6 h-6 ">
                    <span className="absolute w-12 h-12 -top-1/2 -left-1/2 border rounded-full opacity-0 pointer-events-none border-primary group-hover:border-muted animate-ringOne -z-10"></span>
                    <span className="absolute w-12 h-12 -top-1/2 -left-1/2 border rounded-full opacity-0 pointer-events-none border-primary group-hover:border-muted animate-ringTwo -z-10"></span>
                    <span className="absolute w-12 h-12 -top-1/2 -left-1/2 border rounded-full opacity-0 pointer-events-none border-primary group-hover:border-muted animate-ringThree -z-10"></span>
                    <TbFileCv className="w-6 h-6 bg-card rounded-full z-40 group-hover:bg-accent-foreground" />
                  </div>
                </div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="w-full p-8 md:w-5/12 lg:w-1/3">
          <div
            className="relative z-20 grid p-8 border-2 border-gray-800 rounded-full dark:border-border place-items-center"
            ref={containerRef}
          >
            <motion.div
              variants={scaling}
              initial="initial"
              whileInView="animate"
              className="z-30 overflow-hidden rounded-full"
            >
              <Image
                src={emon}
                width={600}
                height={600}
                priority
                alt="Emon Singha"
              />
            </motion.div>

            {socialIcons.map((item, index) => (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="absolute z-10 grid w-12 h-12 transition-transform duration-1000 rounded-full bg-border dark:bg-border ease-primary place-items-center group"
                ref={(el) => (circlesRefs.current[index] = el)}
                aria-label={item.label}
              >
                <div className="z-10 grid w-full h-full bg-gray-800 rounded-full place-items-center">
                  <item.Icon className="w-6 h-6 transition-all duration-300 ease-in-out group-hover:rotate-[360deg] text-[#F8FAFC]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
