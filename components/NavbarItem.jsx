"use client";
import useScrollSpy from "@/hook/useScrollSpy";
import { motion } from "framer-motion";
import Link from "next/link";
import navData from "../public/data/navData.json";

const NavbarItem = () => {
  const { activeSection, scrollToSection } = useScrollSpy();

  return (
    <nav className="order-last -mx-1 mt-2 w-[calc(100%+0.5rem)] min-w-0 border-t border-border md:order-none md:mx-0 md:mt-0 md:w-auto md:flex-1 md:border-0">
      <ul className="flex h-11 items-stretch justify-between gap-1 font-oswald text-[0.7rem] uppercase tracking-[0.06em] xs:gap-2 xs:text-sm xs:tracking-[0.08em] md:justify-center md:gap-8">
        {navData.map((item) => {
          const active = item.text === activeSection;
          return (
            <li key={item.text} className="relative flex min-w-0 flex-1 md:flex-none">
              <Link
                href="/"
                scroll={false}
                aria-current={active ? "page" : undefined}
                onClick={() => scrollToSection(item.text)}
                className={`relative flex h-full w-full items-center justify-center whitespace-nowrap px-1 transition-colors duration-300 md:w-auto ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative inline-flex h-full items-center">
                  {active ? (
                    <motion.span
                      layoutId="nav-mark"
                      className="absolute inset-x-0 -bottom-px h-px bg-[#2451c4] dark:bg-signal md:bottom-0"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                  {item.text}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavbarItem;
