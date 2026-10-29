import { PortfolioData } from "@/public/data/portfolio-data";
import dynamic from "next/dynamic";

const ResumeViewer = dynamic(() => import("@/components/ResumeViewer"), {
  ssr: false,
});

const resumeDescription = `Resume of ${PortfolioData.name}, a ${PortfolioData.title} focused on React, Next.js, Node.js, and Express.`;

export const metadata = {
  title: `Resume | ${PortfolioData.name}`,
  description: resumeDescription,
  robots: "index, follow",
  canonical: `${PortfolioData.website}/resume`,
  openGraph: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Resume",
    url: `${PortfolioData.website}/resume`,
    image: {
      url: `${PortfolioData.website}/img/ogImage.webp`,
      width: 1200,
      height: 630,
      alt: `${PortfolioData.name}, ${PortfolioData.title}`,
    },
    description: resumeDescription,
  },
};
export default function Resume() {
  return (
    <div className="grid w-full pt-16 md:pt-5 overflow-auto bg-background place-items-center">
      <ResumeViewer
        file="/resume/Emon-Singha-Resume.pdf"
        downloadName="Emon-Singha-Resume"
      />
    </div>
  );
}
