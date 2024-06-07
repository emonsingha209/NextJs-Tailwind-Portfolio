import {
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const socialIcons = [
  {
    Icon: FaLinkedin,
    link: "https://www.linkedin.com/in/emon-singha209/",
    label: "Linkedin",
  },
  { Icon: FaGithub, link: "https://github.com/emonsingha209", label: "Github" },
  { Icon: FaWhatsapp, link: "https://wa.me/+8801743217209", label: "Whatsapp" },
  {
    Icon: FaFacebook,
    link: "https://www.facebook.com/thounaojam.emon",
    label: "Facebook",
  },
  {
    Icon: FaFacebookMessenger,
    link: "https://m.me/thounaojam.emon",
    label: "Messanger",
  },
  {
    Icon: FaInstagram,
    link: "https://www.instagram.com/thounaojam_emon/",
    label: "Instagram",
  },
  {
    Icon: FaXTwitter,
    link: "https://x.com/EmonSingha209",
    label: "Twitter",
  },
  {
    Icon: MdEmail,
    link: "mailto:emonsingha209@gmail.com",
    label: "Mail",
  },
];

export default socialIcons;
