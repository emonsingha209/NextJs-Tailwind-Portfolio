import { socialLinkRel } from "@/lib/seo";
import Link from "next/link";
import { FaRegCopyright, FaStar } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";

import socialIcons from "./icon/Social";
const Footer = () => {
  return (
    <>
      <footer className="container flex min-w-0 flex-col-reverse items-center justify-center gap-4 border-t border-border py-6 text-sm lg:flex-row lg:justify-between">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-1 text-center leading-relaxed lg:justify-start lg:text-left">
          <FaRegCopyright className="h-4 w-4 shrink-0" /> {new Date().getFullYear()}{" "}
          <span>
            <Link
              href="https://www.linkedin.com/in/emon-singha209/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Linkedin Via Credit"
            >
              Emon Singha.
            </Link>
          </span>{" "}
          All rights reserved.
        </div>
        <div className="flex shrink-0 gap-3">
          <Link
            href="https://github.com/emonsingha209/NextJs-Tailwind-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star"
            className="inline-flex min-h-11 items-center gap-1"
          >
            <FaStar className="w-4 h-4" />
            Star
          </Link>
          <Link
            href="https://github.com/emonsingha209/NextJs-Tailwind-Portfolio/fork"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fork"
            className="inline-flex min-h-11 items-center gap-1"
          >
            <GoRepoForked className="w-4 h-4" />
            Fork
          </Link>
        </div>
        <div className="w-full min-w-0 max-w-full lg:w-auto">
          <ul className="flex flex-wrap justify-center gap-1 lg:justify-end">
            {socialIcons.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={socialLinkRel(item.link)}
                  aria-label={item.label}
                  className="grid h-11 w-11 place-items-center text-foreground transition-colors hover:text-signal"
                >
                  <item.Icon className="h-5 w-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
