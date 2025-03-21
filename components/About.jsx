"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import expertise from "@/public/data/expertise"
import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { MdDateRange } from "react-icons/md"
import icons from "./icon/Skill"
import Link from "next/link"
import { PortfolioData } from "@/public/data/portfolio-data"

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
}
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
}

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
          {PortfolioData.about.greeting}
        </motion.h2>
        <motion.p
          variants={leftToRight}
          initial="initial"
          whileInView="animate"
          className="leading-7 [&:not(:first-child)]:mt-6"
        >
          {PortfolioData.about.aboutDescription}
        </motion.p>
        <motion.h2
          variants={leftToRight}
          initial="initial"
          whileInView="animate"
          className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0"
        >
          {PortfolioData.about.expertiseTitle}
        </motion.h2>
        {expertise.map((item, index) => (
          <motion.div key={index} className="mt-6" variants={leftToRight} initial="initial" whileInView="animate">
            <Card className="dark:bg-cardBg">
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
                <p className="leading-7 [&:not(:first-child)]:mt-6">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="w-full mt-8 md:w-1/2 md:mt-0 sticky h-[calc(100vh-64px)] top-16 overflow-hidden grid place-items-center">
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
            <TabsList className="grid w-full grid-cols-2 p-1 mb-4 rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <TabsTrigger
                value="experience"
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-violet-800 data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-100 data-[state=active]:shadow-sm"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-violet-800 data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-100 data-[state=active]:shadow-sm"
              >
                Education
              </TabsTrigger>
            </TabsList>
            <TabsContent value="experience">
              <Card className="overflow-hidden shadow-lg">
                <CardHeader className="border-b">
                  <CardTitle>{PortfolioData.about.experienceCard.title}</CardTitle>
                  <CardDescription>
                    {PortfolioData.about.experienceCard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {PortfolioData.about.experience.slice().reverse().map((exp, index) => (
                    <Link
                      key={index}
                      href={exp.link}
                      className="group block p-4 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={exp.ariaLabel}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm px-3 py-1 text-nowrap  rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 w-fit">
                          <MdDateRange className="shrink-0" /> {exp.dateRange}
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education">
              <Card className="overflow-hidden shadow-lg">
                <CardHeader className="border-b">
                  <CardTitle>{PortfolioData.about.educationCard.title}</CardTitle>
                  <CardDescription className="text-violet-100">
                    {PortfolioData.about.educationCard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {PortfolioData.about.education.map((edu, index) => (
                    <Link
                      key={index}
                      href={edu.link}
                      className="group block p-4 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={edu.ariaLabel}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {edu.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">{edu.institution}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm px-3 py-1 text-nowrap rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 w-fit">
                          <MdDateRange className="shrink-0" /> {edu.dateRange}
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

export default About

