"use client";
import { Button } from "@/components/ui/button";
import useScrollSpy from "@/hook/useScrollSpy";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { TbFileCv } from "react-icons/tb";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const { scrollToSection } = useScrollSpy();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container flex flex-wrap items-center gap-x-8 pt-3 md:h-16 md:flex-nowrap md:py-0">
        <Link
          href="/"
          scroll={false}
          onClick={() => scrollToSection("home")}
          className="font-playfair text-2xl italic leading-none text-foreground"
        >
          Emon Singha
        </Link>
        <NavbarItem />
        <div className="ml-auto flex items-center md:ml-0">
          <Button asChild variant="ghost" size="icon" className="h-11 w-11 hover:bg-transparent hover:text-[#2451c4] dark:hover:text-signal">
            <Link href="/resume" aria-label="Read more about me in Resume">
              <TbFileCv className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-11 w-11 hover:bg-transparent hover:text-[#2451c4] dark:hover:text-signal">
            <Link
              href="mailto:emonsingha209@gmail.com"
              aria-label="Contact with me via mail"
            >
              <BiLogoGmail className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-11 w-11 hover:bg-transparent hover:text-[#2451c4] dark:hover:text-signal"
          >
            <SunIcon className="block h-5 w-5 dark:hidden" />
            <MoonIcon className="hidden h-5 w-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
