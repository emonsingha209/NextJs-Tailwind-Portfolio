import { BiLogoPostgresql } from "react-icons/bi";
import { CgPerformance } from "react-icons/cg";
import { DiDotnet } from "react-icons/di";
import {
  FaBootstrap,
  FaCss3,
  FaGithub,
  FaHtml5,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { FaGit } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import {
  SiLighthouse,
  SiMicrosoftsqlserver,
  SiMysql,
  SiNestjs,
  SiPagespeedinsights,
  SiPostman,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandVscode } from "react-icons/tb";

const expertise = [
  {
    id: 1,
    title: "Frontend Development",
    icons: [
      FaHtml5,
      FaCss3,
      IoLogoJavascript,
      FaReact,
      TbBrandNextjs,
      FaBootstrap,
      SiTailwindcss,
    ],
    description:
      "I specialize in creating captivating digital experiences using HTML, CSS, and JavaScript. With expertise in ReactJS and Next.js, I design dynamic and scalable user interfaces that leverage modern web technologies for seamless interactions.",
  },
  {
    id: 2,
    title: "Web Design",
    icons: [FaHtml5, FaCss3, IoLogoJavascript, FaBootstrap, SiTailwindcss],
    description:
      "I translate concepts into visually captivating interfaces, prioritizing aesthetics and user experience. My designs enhance brand identity and effectively engage users, ensuring a cohesive and impactful online presence.",
  },
  {
    id: 3,
    title: "Responsive Design",
    icons: [FaCss3, IoLogoJavascript, FaBootstrap, SiTailwindcss],
    description:
      "I ensure websites adapt seamlessly to all devices using responsive design techniques like Bootstrap and Tailwind's breakpoints and media queries, ensuring consistent user experience.",
  },
  {
    id: 4,
    title: "Performance Optimization",
    icons: [CgPerformance, SiPagespeedinsights],
    description:
      "I optimize websites for speed and efficiency through code optimization, image compression, and lazy loading, enhancing user satisfaction and engagement.",
  },
  {
    id: 5,
    title: "Tools",
    icons: [SiPostman, TbBrandVscode, FaGit, FaGithub, SiLighthouse, SiVercel],
    description:
      "I am proficient in using various tools for development, version control, testing, and deployment, including Postman, VScode, Git, Github, Lighthouse, and Vercel.",
  },
  {
    id: 6,
    title: "Others",
    icons: [
      SiNestjs,
      DiDotnet,
      FaPhp,
      SiMicrosoftsqlserver,
      SiMysql,
      BiLogoPostgresql,
    ],
    description:
      "I have basic backend skills in NestJS, ASP.NET MVC, and PHP, alongside familiarity with SQL Server, MySQL, and PostgreSQL databases. This complements my frontend expertise for effective full-stack collaboration.",
  },
];

export default expertise;
