import Link from "next/link";
import { FaRegCopyright, FaStar } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";

import socialIcons from "./icon/Social";
const Footer = () => {
  return (
    <>
      <div className="flex justify-center translate-y-[1px]">
        <div className="w-3/4">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
      </div>
      <footer className="container flex flex-col-reverse md:flex-row items-center justify-center gap-3 py-3 text-sm border-t md:justify-between border-t-border">
        <div className="flex items-center gap-1 flex-nowrap ">
          <FaRegCopyright className="w-4 h-4" /> 2024{" "}
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
            className="flex items-center gap-1 flex-nowrap "
          >
            <FaStar className="w-4 h-4" />
            Star
          </Link>
          <Link
            href="https://github.com/emonsingha209/NextJs-Tailwind-Portfolio/fork"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fork"
            className="flex items-center gap-1 flex-nowrap "
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
                >
                  <item.Icon className="md:w-6 md:h-6 w-5 h-5 transition-all duration-300 ease-in-out hover:rotate-[360deg]" />
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
