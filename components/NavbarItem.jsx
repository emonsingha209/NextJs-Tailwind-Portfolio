import useScrollSpy from "@/hook/useScrollSpy";
import { motion } from "framer-motion";
import Link from "next/link";
import navData from "../public/data/navData.json";

const NavbarItem = () => {
  const { activeSection, scrollToSection } = useScrollSpy();

  const handleClick = (item) => {
    scrollToSection(item);
  };
  return (
    <nav className="flex items-center justify-center z-40 h-full font-oswald ">
      <ul className="flex items-center gap-5 px-5  uppercase list-none text-base  md:text-lg rounded-full h-12 flex-row text-nowrap bg-secondary md:bg-secondary/50">
        {navData.map((item, index) => (
          <li key={index} className="relative h-full">
            <Link
              href="/"
              className={`relative grid h-full transition-colors duration-300 place-items-center ${
                item.text === activeSection
                  ? "dark:text-white text-black"
                  : "dark:text-slate-300 text-gray-800 hover:text-black dark:hover:text-white"
              }`}
              onClick={() => handleClick(item.text)}
              scroll={false}
            >
              {item.text === activeSection ? (
                <motion.div
                  className="dark:bg-[#f2f2f2] text-black bg-gray-800 absolute rounded-sm bottom-0 w-full h-1 shadow-[0_-2px_25px_2px_#fff] "
                  layoutId="light"
                />
              ) : null}
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarItem;
