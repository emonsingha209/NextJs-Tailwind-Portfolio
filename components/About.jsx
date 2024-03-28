"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useMediaQuery from "@/hook/useMediaQuery";
import expertise from "@/public/data/expertise";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { MdDateRange } from "react-icons/md";
import icons from "./icon/Skill";

const About = () => {
  const isSmallScreen = useMediaQuery("(max-width: 370px)");

  const lrValue = isSmallScreen ? -100 : -300;
  const rlValue = isSmallScreen ? -100 : 300;

  const leftToRight = {
    initial: {
      x: lrValue,
      opacity: 0,
    },

    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 50,
      },
    },
  };
  const rightToLeft = {
    initial: {
      x: rlValue,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 50,
      },
    },
  };
  return (
    <section className="flex flex-wrap py-5" id="about">
      <div className="w-full md:w-1/2">
        <motion.h1
          variants={leftToRight}
          initial="initial"
          whileInView="animate"
          className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl"
        >
          About Me
        </motion.h1>
        <motion.h2
          variants={leftToRight}
          initial="initial"
          whileInView="animate"
          className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0"
        >
          Hello, I&apos;m Emon Singha
        </motion.h2>
        <motion.p
          variants={leftToRight}
          initial="initial"
          whileInView="animate"
          className="leading-7 [&:not(:first-child)]:mt-6"
        >
          I&apos;m a passionate Frontend Developer dedicated to creating
          immersive UI experiences that resonate with users. With a keen eye for
          detail and a love for clean code, I bring ideas to life through
          elegant and functional interfaces.
        </motion.p>
        <motion.h2
          variants={leftToRight}
          initial="initial"
          whileInView="animate"
          className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0"
        >
          Experties Area
        </motion.h2>
        {expertise.map((item, index) => (
          <motion.div
            key={index}
            className="mt-6"
            variants={leftToRight}
            initial="initial"
            whileInView="animate"
          >
            <Card>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                  <span className="flex flex-wrap gap-3 mt-1 text-lg">
                    {item.icons.map((Icon, i) => (
                      <Icon key={i} />
                    ))}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="w-full mt-6 md:w-1/2 md:mt-0">
        <div className="sticky top-16 flex justify-center items-center md:min-h-[calc(100vh-64px)] overflow-hidden">
          <motion.div
            variants={rightToLeft}
            initial="initial"
            whileInView="animate"
            className="w-full space-y-5 md:w-4/5"
          >
            <Marquee pauseOnHover>
              <ul className="flex gap-5 pr-5 text-5xl flex-nowrap cursor-grabbing">
                {icons.map((IconSlider, iconIndex) => (
                  <li key={iconIndex}>
                    <IconSlider />
                  </li>
                ))}
              </ul>
            </Marquee>
            <Tabs defaultValue="experience">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                    <CardDescription>
                      Gained valuable industry insights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <p className="flex items-center gap-1 text-sm">
                        <MdDateRange />3 Sept 2023 - 31 Dec 2023
                      </p>
                      <h3 className="font-semibold leading-none tracking-wide ">
                        Web Developer - Intern
                      </h3>
                      <p>Aamra Infotainment Ltd.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                      Academic Background and Qualifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <p className="flex items-center gap-1 text-sm">
                        <MdDateRange />
                        2020 - 2023
                      </p>
                      <h3 className="font-semibold leading-none tracking-wide">
                        Bachelor of Science in Computer Science & Engineering
                      </h3>
                      <p>American International University-Bangladesh (AIUB)</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
