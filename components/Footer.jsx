import Link from "next/link";
import { FaRegCopyright, FaStar } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";

import socialIcons from "./icon/Social";
const Footer = () => {
  return (
    <>
      <footer className="container flex flex-col-reverse items-center justify-center gap-3 border-t border-border py-6 text-sm md:flex-row md:justify-between">
        <div className="flex items-center gap-1 flex-nowrap ">
          <FaRegCopyright className="w-4 h-4" /> {new Date().getFullYear()}{" "}
          <span>
            <Link
              href="https://www.linkedin.com/in/emon-singha209/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin Via Credit"
            >
              Emon Singha.
            </Link>
          </span>{" "}
          All rights reserved.
        </div>
        <div className="flex gap-3 flex-nowrap">
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
        <div>
          <ul className="flex gap-3">
            {socialIcons.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
