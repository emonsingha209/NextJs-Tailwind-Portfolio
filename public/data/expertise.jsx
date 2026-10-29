import { BiLogoPostgresql } from "react-icons/bi";
import { FaAws, FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {
  SiAngular,
  SiExpress,
  SiGoogle,
  SiMongodb,
  SiNetlify,
  SiOpenai,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const expertise = [
  {
    id: 1,
    title: "Frontend Development",
    icons: [FaReact, TbBrandNextjs, SiAngular, SiTypescript, IoLogoJavascript],
    description:
      "I build production interfaces with React, Next.js, and Angular, using TypeScript and JavaScript. The focus is turning product and design requirements into interfaces that stay maintainable as a product grows.",
  },
  {
    id: 2,
    title: "Styling and UI",
    icons: [SiTailwindcss, FaBootstrap, FaHtml5, FaCss3],
    description:
      "I implement interfaces with Tailwind CSS, Bootstrap, HTML, CSS, and Web Components, including reusable UI components and high-fidelity frontend work.",
  },
  {
    id: 3,
    title: "Backend and Databases",
    icons: [FaNodeJs, SiExpress, SiMongodb, BiLogoPostgresql],
    description:
      "I also work across the stack with Node.js and Express, and with MongoDB and PostgreSQL, including REST APIs and database logic alongside the UI.",
  },
  {
    id: 4,
    title: "APIs and Integrations",
    icons: [SiOpenai, FaAws, SiStripe, SiGoogle],
    description:
      "I integrate OpenAI APIs, AWS S3, Stripe, Google authentication, and SendGrid/Nodemailer, along with JWT-based authorization, email verification, and rate limiting.",
  },
  {
    id: 5,
    title: "Tools and Platforms",
    icons: [FaGit, FaGithub, SiVercel, SiNetlify, SiWordpress],
    description:
      "I use Git and GitHub for version control, and Vercel, Netlify, and WordPress for deployment, hosting, and content work.",
  },
];

export default expertise;
