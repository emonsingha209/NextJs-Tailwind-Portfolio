import { useEffect, useState } from "react";

const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - windowHeight / 2;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    // window.addEventListener("contextmenu", function (event) {
    //   event.preventDefault();
    // });

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (item) => {
    const section = document.getElementById(item);

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 64,
        behavior: "smooth",
      });
    } else {
      setActiveSection("home");
    }
  };

  return { activeSection, scrollToSection };
};

export default useScrollSpy;
