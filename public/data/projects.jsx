import { BiLogoPostgresql } from "react-icons/bi";
import { DiDotnet } from "react-icons/di";
import {
  FaBootstrap,
  FaCss3,
  FaHtml5,
  FaJava,
  FaReact,
  FaPhp,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {
  SiMicrosoftsqlserver,
  SiNestjs,
  SiOpengl,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const projects = [
  {
    id: 1,
    name: "OpenGL London Tower Bridge - A Digital Remake",
    image: "/img/bridge.webp",
    description:
      "An OpenGL project about London iconic Tower Bridge, meticulously recreated with meticulous attention to detail, capturing its majesty and architectural finesse. This visually stunning experience offers viewers a captivating glimpse into the beauty of this historical landmark.",
    technologies: [SiOpengl],
    githubLinks: [
      {
        label: "Code",
        url: "https://github.com/emonsingha209/London-Tower-Bridge--Opengl",
      },
    ],
    liveDemoLinks: [{ label: "Demo", url: "/video/bridge.webm" }],
  },
  {
    id: 2,
    name: " HealthConsult Pro: Your Personalized Symptom Analysis and Medical Scheduling Tool",
    image: "/img/health.webp",
    description:
      "The Health Consultant Application is a Java-based tool that empowers users to input symptoms and receive personalized health recommendations. It employs evidence-based practices to predict potential diseases based on symptoms. Additionally, users can conveniently schedule appointments with doctors, ensuring timely and accurate medical attention to cater to their unique needs and preferences.",
    technologies: [FaJava],
    githubLinks: [
      {
        label: "Code",
        url: "https://github.com/emonsingha209/Health_Consultant",
      },
    ],
    liveDemoLinks: [],
  },
  {
    id: 3,
    name: "Nutrition and Workout System (API): Empowering Nutritionists, Trainers, and Clients for Optimal Fitness Success",
    image: "/img/nws.webp",
    description:
      "Nutrition-and-workout-System is a software system built to provide a simple and convenient system for certified nutritionists and trainers to work with clients using the many useful features of the application. We hope that through this platform the certified nutritionists, trainers and clients can come together and collaborate to build perfect system for achieving fitness goals as effectively as possible.",
    technologies: [SiNestjs, BiLogoPostgresql],
    githubLinks: [
      {
        label: "Code",
        url: "https://github.com/Ratul41Bhatt/Nutrition-and-Workout-System",
      },
    ],
    liveDemoLinks: [],
  },
  {
    id: 4,
    name: "Version One of My Personal Portfolio",
    image: "/img/portfolio.webp",
    description:
      "Explore the first iteration of my personal portfolio, built using ReactJS and Tailwind CSS. Version One represents the beginning of my journey in frontend development, showcasing my early skills and creativity in crafting digital experiences. While subsequent versions may have emerged, this original rendition remains a testament to my growth and evolution as a frontend developer.",
    technologies: [FaHtml5, FaCss3, IoLogoJavascript, SiTailwindcss, FaReact],
    githubLinks: [
      {
        label: "Code",
        url: "https://github.com/emonsingha209/Portfolio-reactjs",
      },
    ],
    liveDemoLinks: [
      { label: "Live", url: "https://emonsinghav1.netlify.app/" },
    ],
  },
  {
    id: 5,
    name: "RoadSaints: Unleash Your Ride's Potential with Premium Motorcycle Accessories",
    image: "/img/roadSaints.webp",
    description:
      "Presenting Road Saints, a showcase of our premier project featuring top-tier motorcycle accessories. Leveraging ReactJS and TailwindCSS for the frontend and ASP.NET for the backend, we have crafted a seamless web experience. Explore meticulously curated high-performance helmets, innovative luggage solutions, and more, with a user-friendly interface designed for effortless navigation and intuitive purchasing. Detailed product insights and responsive assistance ensure a superior shopping journey, enhancing motorcycle adventures with unparalleled style and safety. Join us as we elevate the biking experience – your journey to excellence begins here.",
    technologies: [
      FaHtml5,
      FaCss3,
      IoLogoJavascript,
      SiTailwindcss,
      FaReact,
      DiDotnet,
      SiMicrosoftsqlserver,
    ],
    githubLinks: [
      {
        label: "Frontend",
        url: "https://github.com/AdibAhmed317/RoadSaints-ReactJS",
      },
      {
        label: "Backend",
        url: "https://github.com/AdibAhmed317/RoadSaints-ASPDotNet",
      },
    ],
    liveDemoLinks: [],
  },
  {
    id: 6,
    name: "Innovative Frontend Development for Merlin Technology",
    image: "/img/merlin.webp",
    description:
      "Crafted with precision, the frontend of Merlin Technology’s website showcases a sleek and modern design that enhances user experience. As the architect of this digital interface, I have implemented responsive layouts and interactive elements that seamlessly guide visitors through the company’s extensive portfolio of power generation, elevator, escalator, and solar energy solutions. My work reflects a commitment to aesthetic excellence and functional innovation, providing a robust platform that stands at the forefront of Merlin Technology’s online presence.",
    technologies: [FaHtml5, FaCss3, IoLogoJavascript, FaBootstrap],
    githubLinks: [],
    liveDemoLinks: [
      { label: "Merlin", url: "https://www.merlintechbd.com/" },
      { label: "Hayashimu", url: "https://www.hayashimu.com/" },
    ],
  },
  {
    id: 7,
    name: "SJI Prompting is the ultimate hub for SJI developers",
    image: "/img/sji-prompt.webp",
    technologies: [TbBrandNextjs, SiTailwindcss, SiMongodb],
    githubLinks: [],
    liveDemoLinks: [
      { label: "Live", url: "https://sji-prompting.vercel.app/" },
    ],
  },
  {
    id: 8,
    name: "Swimming Club Management System",
    image: "/img/swim-club.webp",
    description: "a",
    technologies: [
      FaHtml5,
      FaCss3,
      IoLogoJavascript,
      FaBootstrap,
      FaPhp,
      SiMysql,
    ],
    githubLinks: [
      { label: "Code", url: "https://github.com/emonsingha209/swim_club" },
    ],
    liveDemoLinks: [],
  },
];

export default projects;
