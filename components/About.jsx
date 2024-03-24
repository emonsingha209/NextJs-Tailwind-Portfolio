"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaBootstrap, FaCss3, FaHtml5, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
const About = () => {
  return (
    <section className="" id="about">
      <div className="w-1/2">
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          About Me
        </h1>
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0">
          Hello, I&aposm Emon Singha
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          I&aposm a passionate Frontend Developer dedicated to creating immersive UI
          experiences that resonate with users. With a keen eye for detail and a
          love for clean code, I bring ideas to life through elegant and
          functional interfaces.
        </p>
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0">
          Experties Area
        </h2>
        <Card className="mt-6">
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
            <p>
              I specialize in creating captivating digital experiences using
              HTML, CSS, and JavaScript. With expertise in ReactJS and Next.js,
              I design dynamic and scalable user interfaces that leverage modern
              web technologies for seamless interactions.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-6">
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
            <p>
              I translate concepts into visually captivating interfaces,
              prioritizing aesthetics and user experience. My designs enhance
              brand identity and effectively engage users, ensuring a cohesive
              and impactful online presence.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-6">
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
            <p>
              I ensure websites adapt smoothly to different devices and screen
              sizes by employing responsive design techniques such as Bootstrap
              and Tailwind&aposs responsive breakpoints and media queries. This
              guarantees a consistent user experience across desktops, tablets,
              and smartphones.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Optimization</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <FaHtml5 /> <FaCss3 /> <IoLogoJavascript />
                <FaReact />
                <TbBrandNextjs />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              I enhance website speed and efficiency through various
              optimization strategies including code optimization, image
              compression, and lazy loading. By reducing load times and
              improving overall performance, I prioritize user satisfaction and
              drive higher engagement.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Others</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap gap-3 mt-1 text-lg">
                <FaHtml5 /> <FaCss3 /> <IoLogoJavascript />
                <FaReact />
                <TbBrandNextjs />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              I have foundational knowledge in backend technologies like NestJS,
              ASP.NET MVC, and PHP, acquired through academic study. Similarly,
              I&aposve gained familiarity with database management systems such as
              SQL Server, MySQL, and PostgreSQL. While not yet an expert, this
              understanding complements my frontend development skills, enabling
              effective collaboration on full-stack projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
