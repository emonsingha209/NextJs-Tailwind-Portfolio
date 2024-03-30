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
    <nav className="flex items-center justify-center h-full font-oswald ">
      <ul className="flex flex-col items-center gap-5 px-5 -mt-40 text-2xl uppercase list-none rounded-md md:mt-0 md:text-lg md:rounded-full h-fit md:h-12 md:flex-row text-nowrap bg-background/50">
        {navData.map((item, index) => (
          <li key={index} className="relative h-full ">
            <Link
              href="/"
              className="relative grid h-full transition-colors duration-300 place-items-center hover:text-blue-400"
              onClick={() => handleClick(item.text)}
              scroll={false}
            >
              {item.text === activeSection ? (
                <motion.div
                  className="dark:bg-[#f2f2f2] bg-gray-800 absolute rounded-sm -bottom-1.5 md:bottom-0 w-full h-1 shadow-[0_-2px_25px_2px_#fff] "
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
