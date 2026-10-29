"use client";
import useScrollSpy from "@/hook/useScrollSpy";
import { PortfolioData } from "@/public/data/portfolio-data";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import socialIcons from "./icon/Social";
import Typewriter from "./ui/Typewriter";
import emon from "/public/img/emon-singha.jpeg";

const ease = [0.16, 1, 0.3, 1];

const intro = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const introItem = {
  initial: { y: 16 },
  animate: {
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const Hero = () => {
  const containerRef = useRef(null);
  const circlesRefs = useRef([]);
  const releaseTimer = useRef(null);
  const hovering = useRef(false);
  const heldRef = useRef(false);
  const inViewRef = useRef(false);
  const reduceRef = useRef(false);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const isInView = useInView(containerRef);
  const reduce = useReducedMotion();
  const { scrollToSection } = useScrollSpy();

  const holdOrbit = () => {
    window.clearTimeout(releaseTimer.current);
    heldRef.current = true;
  };

  const releaseOrbit = () => {
    window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => {
      if (!hovering.current) heldRef.current = false;
    }, 280);
  };

  useEffect(() => {
    inViewRef.current = Boolean(isInView);
  }, [isInView]);

  useEffect(() => {
    reduceRef.current = Boolean(reduce);
  }, [reduce]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    let last = performance.now();
    const cruise = 360 / 28;
    const settle = 0.22;

    const place = () => {
      const circles = circlesRefs.current.filter(Boolean);
      if (circles.length === 0) return;

      const radius = container.offsetWidth / 2;
      const step = 360 / circles.length;
      circles.forEach((circle, i) => {
        const angle = i * step + angleRef.current;
        circle.style.transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
      });
    };

    const tick = (now) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;

      if (inViewRef.current && !reduceRef.current) {
        const target = heldRef.current ? 0 : cruise;
        speedRef.current += (target - speedRef.current) * (1 - Math.exp(-dt / settle));
        angleRef.current = (angleRef.current + speedRef.current * dt) % 360;
        place();
      }

      frame = requestAnimationFrame(tick);
    };

    place();
    frame = requestAnimationFrame(tick);
    const observer = new ResizeObserver(place);
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.clearTimeout(releaseTimer.current);
    };
  }, []);

  const multipleSpaces = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";

  return (
    <section id="home" className="relative scroll-mt-28 bg-background">
      <div className="container flex min-h-[calc(100svh-7.5rem)] flex-col-reverse items-center justify-center gap-10 py-12 md:min-h-[calc(100svh-4rem)] md:flex-row md:gap-8 md:py-0">
        <motion.div
          variants={reduce ? undefined : intro}
          initial={reduce ? false : "initial"}
          animate="animate"
          className="flex w-full flex-col gap-5 md:w-7/12 lg:w-2/3"
        >
          <motion.h1
            variants={reduce ? undefined : introItem}
            className="text-balance font-playfair text-5xl italic leading-[0.95] text-foreground md:text-7xl"
          >
            {PortfolioData.name}
          </motion.h1>
          <motion.h2
            variants={reduce ? undefined : introItem}
            className="min-h-12 border-b border-border pb-2 font-oswald text-2xl tracking-[0.04em] text-foreground md:text-3xl"
          >
            <Typewriter
              texts={PortfolioData.typewriterTexts.map(
                (text) => `${text}${multipleSpaces}`
              )}
              speed={100}
              isInView={isInView}
            />
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : introItem}
            className="max-w-[68ch] text-lg leading-7 text-foreground"
          >
            {PortfolioData.profileDescription}
          </motion.p>
          <motion.p
            variants={reduce ? undefined : introItem}
            className="font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground"
          >
            {PortfolioData.location}
          </motion.p>
          <motion.div
            variants={reduce ? undefined : introItem}
            className="flex flex-col gap-3 xs:flex-row"
          >
            <Link
              href="mailto:emonsingha209@gmail.com"
              className="inline-flex min-h-12 items-center justify-center bg-navy px-8 font-oswald text-sm uppercase tracking-[0.08em] text-paper transition-colors hover:bg-deep dark:bg-signal dark:text-navy dark:hover:bg-paper"
            >
              Email
            </Link>
            <Link
              href="/resume"
              aria-label="Read more about me in Resume"
              className="inline-flex min-h-12 items-center justify-center border border-navy px-8 font-oswald text-sm uppercase tracking-[0.08em] text-navy transition-colors hover:bg-navy hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-navy"
            >
              Resume
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="inline-flex min-h-12 items-center justify-center px-4 font-oswald text-sm uppercase tracking-[0.08em] text-navy underline-offset-4 hover:underline dark:text-paper"
            >
              Contact form
            </button>
          </motion.div>
        </motion.div>
        <div className="w-full max-w-sm md:w-5/12 md:max-w-none lg:w-1/3">
          <div
            className="relative z-20 grid place-items-center rounded-full border border-navy/30 p-11 dark:border-paper/40 md:p-14"
            ref={containerRef}
          >
            <motion.div
              initial={reduce ? false : { scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="z-30 overflow-hidden rounded-full"
            >
              <Image
                src={emon}
                width={720}
                height={720}
                priority
                alt="Emon Singha"
                className="object-cover"
              />
            </motion.div>

            <div
              className="absolute inset-0 grid place-items-center"
              onPointerEnter={() => {
                hovering.current = true;
                holdOrbit();
              }}
              onPointerLeave={() => {
                hovering.current = false;
                releaseOrbit();
              }}
              onPointerDown={holdOrbit}
              onPointerUp={(event) => {
                if (event.pointerType !== "touch") return;
                hovering.current = false;
                releaseOrbit();
              }}
              onPointerCancel={() => {
                hovering.current = false;
                releaseOrbit();
              }}
            >
              {socialIcons.map((item, index) => (
                <Link
                  href={item.link}
                  target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  key={item.label}
                  className="group absolute z-10 grid h-12 w-12 touch-manipulation place-items-center rounded-full bg-navy text-paper dark:bg-paper dark:text-navy"
                  ref={(el) => (circlesRefs.current[index] = el)}
                  aria-label={item.label}
                >
                  <item.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
