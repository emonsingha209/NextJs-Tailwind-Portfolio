"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useScrollSpy from "@/hook/useScrollSpy";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { CgMenuRight } from "react-icons/cg";
import { TbFileCv } from "react-icons/tb";
import letters from "../public/data/name.json";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const { activeSection, scrollToSection } = useScrollSpy();
  const { setTheme } = useTheme();

  const handleClick = (item) => {
    scrollToSection(item);
  };
  return (
    <header className="sticky top-0 z-50 flex items-center justify-around w-full h-16 shadow-md shadow-ring/10 backdrop-blur-md">
      <Link href="/" scroll={false} onClick={() => handleClick("home")}>
        <div className="flex text-2xl uppercase lg:text-3xl font-playfair">
          {letters.map((letter, index) => (
            <div
              key={index}
              className="animate-glow"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {letter === " " ? <>&nbsp;</> : letter}
            </div>
          ))}
        </div>
      </Link>
      <div className="hidden md:block">
        <NavbarItem />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link
            href="https://emonsingha.vercel.app/resume/Emon-Singha.pdf"
            aria-label="Read more about me in Resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbFileCv className="w-6 h-6" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link
            href="mailto:emonsingha209@gmail.com"
            aria-label="Contact with me via mail"
          >
            <BiLogoGmail className="w-6 h-6" />
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger>
              <CgMenuRight className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <NavbarItem />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
