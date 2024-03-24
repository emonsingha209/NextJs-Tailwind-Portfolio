"use client";
import { Button } from "@/components/ui/button";
import useScrollInView from "@/hook/useScrollInView";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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

const Hero = () => {
  const containerRef = useRef(null);
  const circlesRefs = useRef([]);
  const container = containerRef.current;
  const circles = circlesRefs.current;
  const onInView = () => {
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
  };

  const onNotInView = () => {
    if (circles.length > 0) {
      circles.forEach((circle) => {
        circle.style.transform = "";
      });
    }
  };
  const { ref, isInView } = useScrollInView(0.5, onInView, onNotInView);

  const multipleSpaces = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";

  return (
    <section
      ref={ref}
      className="xl:h-[calc(100vh-48px)] py-5 md:py-10 xl:py-0 flex flex-wrap flex-col-reverse md:flex-row items-center justify-center overflow-hidden"
      id="home"
    >
      <div className="flex flex-col w-full gap-4 md:pr-4 md:w-7/12 xl:w-2/3">
        <h1
          className={`h-16 md:h-20 text-left delay-300 text-5xl font-extrabold tracking-tight text-transparent capitalize md:text-6xl xl:text-7xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text w-fit scroll-m-20 transition-all  ${
            isInView ? " translate-y-0 opacity-100 duration-300" : "translate-y-96 opacity-0 duration-0"
          }`}
        >
          Emon Singha
        </h1>
        <h2
          className={`min-h-12 delay-300 pb-2 xl:mt-3 text-3xl font-semibold tracking-tight border-b border-b-border scroll-m-20 first:mt-0 transition-all  ${
            isInView
              ? " translate-y-0  opacity-100 duration-700"
              : "translate-y-96 opacity-0 duration-0"
          }`}
        >
          <Typewriter
            texts={[
              `Frontend Developer${multipleSpaces}`,
              `Converting Ideas to User Interface${multipleSpaces}`,
            ]}
            speed={100}
          />
        </h2>
        <p
          className={`text-lg xl:text-justify delay-300 leading-7 [&:not(:first-child)]:mt-3 transition-all  ${
            isInView
              ? " translate-y-0  opacity-100 duration-1000"
              : "translate-y-96 opacity-0 duration-0"
          }`}
        >
          As a Frontend Developer, I specialize in bringing ideas to life
          through captivating user interfaces. With expertise in CSS, Bootstrap,
          and Tailwind CSS, I meticulously craft designs that exceed
          expectations. Every line of code is dedicated to transforming concepts
          into visually stunning digital experiences.
        </p>
        <div
          className={`flex justify-center md:justify-start gap-3 md:gap-5 mt-3 transition-all delay-700 ${
            isInView
              ? " translate-y-0  opacity-100  duration-1000"
              : "translate-y-96 opacity-0  duration-0"
          }`}
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
        </div>
      </div>
      <div className="w-full p-8 md:w-5/12 xl:w-1/3">
        <div
          className="relative grid p-8 border-2 border-gray-600 rounded-full dark:border-border place-items-center"
          ref={containerRef}
        >
          <Image
            src={emon}
            width={600}
            height={600}
            priority
            alt="Emon Singha"
            className={`z-10  ${
              isInView ? "scale-100" : "scale-0"
            } transition-transform duration-1000 ease-primary delay-300`}
          />
          {socialIcons.map((Icon, index) => (
            <div
              key={index}
              className="absolute grid w-12 h-12 transition-transform duration-1000 delay-300 bg-gray-600 rounded-full dark:bg-border ease-primary place-items-center group"
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
