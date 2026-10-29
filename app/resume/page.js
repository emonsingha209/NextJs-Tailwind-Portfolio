import JsonLd from "@/components/JsonLd";
import { ogImage, resume, resumeJsonLd } from "@/lib/seo";
import { PortfolioData } from "@/public/data/portfolio-data";
import dynamic from "next/dynamic";
import Link from "next/link";

const ResumeViewer = dynamic(() => import("@/components/ResumeViewer"), {
  ssr: false,
});

const resumeTitle = `${resume.title} | ${PortfolioData.name}`;

export const metadata = {
  title: resume.title,
  description: resume.description,
  alternates: {
    canonical: resume.path,
    types: {
      "application/pdf": resume.pdfPath,
    },
  },
  openGraph: {
    title: resumeTitle,
    description: resume.description,
    url: resume.path,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: resumeTitle,
    description: resume.description,
    images: [ogImage.url],
  },
};

export default function Resume() {
  return (
    <main className="bg-background pt-8 md:pt-10">
      <JsonLd data={resumeJsonLd()} />
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Resume
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
          Resume
        </h1>
        <p className="mt-4 text-base leading-7 text-foreground">
          {resume.description}
        </p>
      </div>
      <div className="container pb-10 pt-6">
        <ResumeViewer file={resume.pdfPath} downloadName="Emon-Singha-Resume" />
      </div>
    </main>
  );
}
