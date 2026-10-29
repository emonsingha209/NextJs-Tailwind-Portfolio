import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiAmazonaws,
  SiCloudflare,
  SiExpress,
  SiMongodb,
  SiOpenai,
  SiTypescript,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const projects = [
  {
    id: 1,
    name: "MockTaker",
    image: "/img/mocktaker.webp",
    description:
      "Personal project. A multi-tenant IELTS exam platform for coaching centres in Bangladesh, covering Listening, Reading, Writing, and full mock exams, plus centre-level assignments, quotas, and reviews. It includes a 4-role permission system, a transactional submission flow, and a band scorer that uses official conversion tables and fuzzy matching. Used by 8 coaching centres, with 670+ student accounts and over 8,500 test submissions.",
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "NextAuth",
      "Cloudflare R2",
    ],
    technologies: [
      { Icon: TbBrandNextjs, label: "Next.js" },
      { Icon: SiTypescript, label: "TypeScript" },
      { Icon: SiMongodb, label: "MongoDB" },
      { Icon: SiCloudflare, label: "Cloudflare R2" },
    ],
    githubLinks: [],
    liveDemoLinks: [{ label: "Live", url: "https://mocktaker.com" }],
  },
  {
    id: 2,
    name: "StoryGroove",
    image: "/img/storygroove.webp",
    description:
      "A SaaS platform that helps authors go from idea to finished manuscript, with AI writing and editorial agents, manuscript import, and AI-assisted cover design. Built Ellis, a conversational editorial agent that routes intent with deterministic matching and an LLM classifier, pulls chapter context, and streams responses over SSE, covered by regression tests. Built Cover Studio end to end: conversational cover coaching, quota-controlled AI image generation, canvas mask editing, live preview streaming, and S3-backed version history.",
    stack: [
      "React",
      "Node.js/Express",
      "MongoDB",
      "OpenAI Responses API",
      "AWS S3",
    ],
    technologies: [
      { Icon: FaReact, label: "React" },
      { Icon: FaNodeJs, label: "Node.js" },
      { Icon: SiExpress, label: "Express" },
      { Icon: SiMongodb, label: "MongoDB" },
      { Icon: SiOpenai, label: "OpenAI" },
      { Icon: SiAmazonaws, label: "AWS S3" },
    ],
    githubLinks: [],
    liveDemoLinks: [{ label: "Live", url: "https://storygroove.ai" }],
  },
];

export default projects;
