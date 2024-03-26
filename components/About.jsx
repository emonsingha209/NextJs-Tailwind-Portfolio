"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";
import { BiLogoPostgresql } from "react-icons/bi";
import { CgPerformance } from "react-icons/cg";
import { DiDotnet } from "react-icons/di";
import { FaBootstrap, FaCss3, FaHtml5, FaPhp, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {
  SiMicrosoftsqlserver,
  SiMysql,
  SiNestjs,
  SiPagespeedinsights,
  SiTailwindcss,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

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
    <section className="flex flex-wrap min-h-screen pt-5" id="about">
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
        <Card motionVariant={leftToRight} className="mt-6">
          <CardHeader>
            <CardTitle>Frontend Development</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <FaHtml5 /> <FaCss3 /> <IoLogoJavascript />
                <FaReact />
                <TbBrandNextjs />
                <FaBootstrap />
                <SiTailwindcss />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              I specialize in creating captivating digital experiences using
              HTML, CSS, and JavaScript. With expertise in ReactJS and Next.js,
              I design dynamic and scalable user interfaces that leverage modern
              web technologies for seamless interactions.
            </p>
          </CardContent>
        </Card>
        <Card motionVariant={leftToRight} className="mt-6">
          <CardHeader>
            <CardTitle>Web Design</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <FaHtml5 /> <FaCss3 /> <IoLogoJavascript />
                <FaBootstrap />
                <SiTailwindcss />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              I translate concepts into visually captivating interfaces,
              prioritizing aesthetics and user experience. My designs enhance
              brand identity and effectively engage users, ensuring a cohesive
              and impactful online presence.
            </p>
          </CardContent>
        </Card>
        <Card motionVariant={leftToRight} className="mt-6">
          <CardHeader>
            <CardTitle>Responsive Design</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <FaCss3 /> <IoLogoJavascript />
                <FaBootstrap />
                <SiTailwindcss />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              I ensure websites adapt seamlessly to all devices using responsive
              design techniques like Bootstrap and Tailwind&apos;s breakpoints
              and media queries, ensuring consistent user experience.
            </p>
          </CardContent>
        </Card>
        <Card motionVariant={leftToRight} className="mt-6">
          <CardHeader>
            <CardTitle>Performance Optimization</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <CgPerformance />
                <SiPagespeedinsights />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              I optimize websites for speed and efficiency through code
              optimization, image compression, and lazy loading, enhancing user
              satisfaction and engagement.
            </p>
          </CardContent>
        </Card>
        <Card motionVariant={leftToRight} className="mt-6">
          <CardHeader>
            <CardTitle>Others</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <SiNestjs />
                <DiDotnet />
                <FaPhp />
                <SiMicrosoftsqlserver />
                <SiMysql />
                <BiLogoPostgresql />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              I have basic backend skills in NestJS, ASP.NET MVC, and PHP,
              alongside familiarity with SQL Server, MySQL, and PostgreSQL
              databases. This complements my frontend expertise for effective
              full-stack collaboration.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="w-full mt-6 md:w-1/2 md:mt-0">
        <div className="sticky top-16 flex justify-center items-center lg:min-h-[calc(100vh-64px)] overflow-hidden">
          <motion.div
            variants={rightToLeft}
            initial="initial"
            whileInView="animate"
            className="w-full md:w-4/5"
          >
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
                      <h3 className="text-lg font-semibold leading-none tracking-wide ">
                        Aamra Infotainment Ltd. - Intern
                      </h3>
                      <p className="text-sm ">3 Sept 2023 - 31 Dec 2023</p>
                      <ul className=" ml-6 list-disc [&>li]:mt-2 ">
                        <li>
                          Worked as a frontend developer, contributing to the
                          development of engaging and user-friendly web
                          interfaces.
                        </li>
                        <li>
                          Created reusable UI components using HTML, CSS,
                          JavaScript, and Bootstrap.
                        </li>
                        <li>
                          Developed web pages utilizing a page builder,
                          customized pre-designed templates, and managed content
                          management systems in WordPress.
                        </li>
                      </ul>
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
                      <h3 className="text-lg font-semibold leading-none tracking-wide ">
                        American International University-Bangladesh (AIUB)
                      </h3>
                      <p>
                        Bachelor of Science in Computer Science & Engineering
                      </p>
                      <p className="text-sm">2020 - 2023</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-none tracking-wide ">
                        Moulvibazar Govt College (MGC)
                      </h3>
                      <p>HSC - Science</p>
                      <p className="text-sm">2019</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-none tracking-wide ">
                        Moulvibazar Govt High School (MGHS)
                      </h3>
                      <p>SSC - Science</p>
                      <p className="text-sm">2017</p>
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
