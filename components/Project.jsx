"use client";

import Pair, { pairMark } from "@/components/Pair";
import expertise from "@/public/data/expertise";
import projects from "@/public/data/projects";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const storygroove = projects.find((project) => project.name === "StoryGroove");

const Project = () => {
  const live = storygroove?.liveDemoLinks?.[0];

  return (
    <Pair
      id="projects"
      record={
        <div>
          <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
            Expertise
          </h2>
          <div className="mt-8">
            {expertise.map((item) => (
              <article key={item.id} className="border-t border-border py-6 first:border-t-0 first:pt-0">
                <h3 className="font-playfair text-2xl italic text-foreground">{item.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {item.icons.map((Icon, index) => (
                    <li key={index} className="text-foreground">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </li>
                  ))}
                </ul>
                <p className="mt-3 max-w-[68ch] text-base leading-7 text-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      }
      work={
        storygroove ? (
          <div>
            <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
              {storygroove.name}
            </h2>
            <div className="relative mt-8 h-52 w-full overflow-hidden shadow-[0_18px_40px_-28px_rgba(2,18,87,0.55)] sm:h-60">
              <Image
                src={storygroove.image}
                alt={`${storygroove.name} preview`}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-left-top"
              />
            </div>
            <p className="mt-6 max-w-[68ch] text-base leading-7 text-foreground">
              {storygroove.description}
            </p>
            {storygroove.technologies?.length ? (
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {storygroove.technologies.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {label}
                  </li>
                ))}
              </ul>
            ) : null}
            {storygroove.stack?.length ? (
              <p className="mt-3 max-w-[68ch] text-sm leading-6 text-muted-foreground">
                {storygroove.stack.join(" · ")}
              </p>
            ) : null}
            {live ? (
              <a
                href={live.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex min-h-11 items-center gap-2 font-oswald text-sm uppercase tracking-[0.08em] underline-offset-4 hover:underline ${pairMark}`}
              >
                Open {storygroove.name}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null
      }
    />
  );
};

export default Project;
