import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import expertise from "@/public/data/expertise";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { MdDateRange } from "react-icons/md";
import icons from "./icon/Skill";
import Link from "next/link";

const leftToRight = {
  initial: {
    x: -200,
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
    x: 200,
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

const About = () => {
  return (
    <section className="container flex flex-wrap py-5" id="about">
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
          className="pb-2 mt-8 text-3xl font-semibold tracking-tight transition-colors border-b md:mt-10 scroll-m-20 first:mt-0"
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
            <Card className=" dark:bg-cardBg">
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
      <div className="w-full mt-8 md:w-1/2 md:mt-0 sticky h-[calc(100vh-64px)] top-16 overflow-auto grid place-items-center">
        <motion.div
          variants={rightToLeft}
          initial="initial"
          whileInView="animate"
          className="w-full space-y-5 overflow-auto md:w-4/5"
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
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-6">
                    <Link
                      href="https://aamrainfotainment.com/"
                      className="relative space-y-2 group "
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="AIL"
                    >
                      <p className="flex items-center gap-1 text-sm">
                        <MdDateRange />3 Sept 2023 - 31 Dec 2023
                      </p>
                      <h3 className="font-semibold leading-none tracking-wide ">
                        Web Developer - Intern
                      </h3>
                      <p>Aamra Infotainment Ltd.</p>
                      <div className="absolute w-0 transition-all duration-500 ease-primary group-hover:w-full h-0.5 bg-violet-500 rounded-md -bottom-2"></div>
                    </Link>
                    <Link
                      href="https://sjinnovation.com/"
                      className="relative space-y-2 group"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SJI"
                    >
                      <p className="flex items-center gap-1 text-sm">
                        <MdDateRange />3 June 2024 - 30 November 2024
                      </p>
                      <h3 className="font-semibold leading-none tracking-wide ">
                        Intern Frontend Developer
                      </h3>
                      <p>SJ Innovation LLC</p>
                      <div className="absolute w-0 transition-all duration-500 ease-primary group-hover:w-full h-0.5 bg-violet-500 rounded-md -bottom-2"></div>
                    </Link>
                    <Link
                      href="https://sjinnovation.com/"
                      className="relative space-y-2 group"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SJI"
                    >
                      <p className="flex items-center gap-1 text-sm">
                        <MdDateRange />1 December 2024 - Present
                      </p>
                      <h3 className="font-semibold leading-none tracking-wide ">
                        Jr. Software Engineer
                      </h3>
                      <p>SJ Innovation LLC</p>
                      <div className="absolute w-0 transition-all duration-500 ease-primary group-hover:w-full h-0.5 bg-violet-500 rounded-md -bottom-2"></div>
                    </Link>
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
                  <Link
                    href="https://www.aiub.edu/"
                    className="relative space-y-2 group"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="AIUB"
                  >
                    <p className="flex items-center gap-1 text-sm">
                      <MdDateRange />
                      2020 - 2023
                    </p>
                    <h3 className="font-semibold leading-none tracking-wide">
                      Bachelor of Science in Computer Science & Engineering
                    </h3>
                    <p>American International University-Bangladesh (AIUB)</p>
                    <div className="absolute w-0 transition-all duration-500 ease-primary group-hover:w-full h-0.5 bg-violet-500 rounded-md -bottom-2"></div>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
