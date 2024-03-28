import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import socialIcons from "./icon/Social";
const Footer = () => {
  return (
    <footer className="container flex flex-wrap-reverse items-center justify-center gap-3 py-3 text-sm border-t md:justify-between border-t-border">
      <div className="flex items-center gap-1 flex-nowrap ">
        <FaRegCopyright className="w-4 h-4" /> 2024 Emon Singha. All rights
        reserved.
      </div>
      <div className="hidden md:block">
        <p className="flex items-center gap-1 flex-nowrap ">
          <MdLocationOn className="w-4 h-4" />
          Moulvibazar, Sylhet, Bangladesh
        </p>
      </div>
      <div>
        <ul className="flex gap-3">
          {socialIcons.map((item, index) => (
            <li key={index}>
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <item.Icon className="w-6 h-6 transition-all duration-300 ease-in-out hover:rotate-[360deg]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
