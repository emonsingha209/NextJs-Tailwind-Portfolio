"use client";

import Pair, { pairMark } from "@/components/Pair";
import { PortfolioData } from "@/public/data/portfolio-data";
import projects from "@/public/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const mocktaker = projects.find((project) => project.name === "MockTaker");

const About = () => {
  const roles = PortfolioData.about.experience.slice().reverse();

  return (
    <Pair
      id="about"
      record={
        <div>
          <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
            Experience
          </h2>
          <p className="mt-6 max-w-[68ch] font-playfair text-2xl italic leading-snug text-foreground">
            {PortfolioData.about.greeting}
          </p>
          <p className="mt-4 max-w-[68ch] text-base leading-7 text-foreground">
            {PortfolioData.about.aboutDescription}
          </p>

          <ol className="mt-10">
            {roles.map((exp, index) => (
              <li key={`${exp.title}-${exp.dateRange}`}>
                <Link
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={exp.ariaLabel}
                  className="block border-t border-border py-5 transition-colors hover:bg-secondary/70"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
                    <div>
                      <h3
                        className={`text-xl text-foreground ${
                          index === 0 ? "font-playfair text-2xl italic md:text-3xl" : "font-oswald tracking-[0.02em]"
                        }`}
                      >
                        {exp.title}
                      </h3>
                      <p className="mt-1 text-base text-foreground">{exp.company}</p>
                      {exp.location ? (
                        <p className="text-sm leading-6 text-muted-foreground">{exp.location}</p>
                      ) : null}
                    </div>
                    <p
                      className={`font-oswald text-sm uppercase tracking-[0.08em] ${
                        index === 0 ? pairMark : "text-muted-foreground"
                      }`}
                    >
                      {exp.dateRange}
                    </p>
                  </div>
                  {exp.highlights?.length ? (
                    <ul className="mt-3 max-w-[68ch] list-disc space-y-1 pl-5 text-sm leading-6 text-foreground">
                      {exp.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 font-playfair text-3xl italic text-foreground">Education</h3>
          <p className="mt-3 max-w-[68ch] text-base leading-7 text-muted-foreground">
            {PortfolioData.about.educationCard.description}
          </p>
          <ul className="mt-4">
            {PortfolioData.about.education.map((edu) => (
              <li key={edu.title}>
                <Link
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={edu.ariaLabel}
                  className="block border-t border-border py-5 transition-colors hover:bg-secondary/70"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
                    <div>
                      <p className="font-playfair text-xl italic text-foreground">{edu.title}</p>
                      <p className="mt-1 text-base text-foreground">{edu.institution}</p>
                    </div>
                    <p className="font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
                      {edu.dateRange}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
      work={
        mocktaker ? (
          <WorkColumn project={mocktaker} />
        ) : null
      }
    />
  );
};

function WorkColumn({ project }) {
  const live = project.liveDemoLinks?.[0];

  return (
    <div>
      <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
        {project.name}
      </h2>
      <div className="relative mt-8 h-52 w-full overflow-hidden shadow-[0_18px_40px_-28px_rgba(2,18,87,0.55)] sm:h-60">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          sizes="(min-width: 768px) 42vw, 100vw"
          className="object-cover object-left-top"
        />
      </div>
      <p className="mt-6 max-w-[68ch] text-base leading-7 text-foreground">{project.description}</p>
      {project.technologies?.length ? (
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {project.technologies.map(({ Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </li>
          ))}
        </ul>
      ) : null}
      {project.stack?.length ? (
        <p className="mt-3 max-w-[68ch] text-sm leading-6 text-muted-foreground">
          {project.stack.join(" · ")}
        </p>
      ) : null}
      {live ? (
        <a
          href={live.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex min-h-11 items-center gap-2 font-oswald text-sm uppercase tracking-[0.08em] underline-offset-4 hover:underline ${pairMark}`}
        >
          Open {project.name}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

export default About;
