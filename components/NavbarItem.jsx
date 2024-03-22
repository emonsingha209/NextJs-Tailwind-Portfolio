import useScrollSpy from "@/hook/useScrollSpy";
import Link from "next/link";
import navData from "../public/data/navData.json";

const NavbarItem = () => {
  const { activeSection, scrollToSection } = useScrollSpy();

  const handleClick = (item) => {
    scrollToSection(item);
  };
  return (
    <nav className="flex justify-center pt-6 md:h-full md:pt-0 md:items-center font-oswald ">
      <ul className="flex flex-col items-center gap-5 px-5 text-xl uppercase list-none rounded-md md:rounded-full h-fit md:h-12 md:flex-row text-nowrap bg-background/50">
        {navData.map((item, index) => (
          <li key={index} className="relative h-full ">
            <Link
              href={item.path}
              className="relative grid h-full place-items-center"
              onClick={() => handleClick(item.text)}
              scroll={false}
            >
              <span
                className={`w-0 h-0 dark:bg-[#f2f2f2] bg-gray-800 shadow-[0_-2px_0px_0px_#fff] absolute -translate-x-2/4 transition-[width] duration-500 ease-in-out rounded-sm left-2/4 -bottom-1.5 md:bottom-0 ${
                  activeSection === item.text
                    ? "w-full h-1 shadow-[0_-2px_25px_2px_#fff] "
                    : ""
                }`}
              ></span>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarItem;
