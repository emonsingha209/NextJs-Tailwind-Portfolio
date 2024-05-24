import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const contactDetails = [
  {
    id: 1,
    type: "Email",
    value: "emonsingha209@gmail.com",
    link: "mailto:emonsingha209@gmail.com",
    icon: MdEmail,
  },
  {
    id: 2,
    type: "Phone",
    value: "+8801743217209",
    link: "tel:+8801743217209",
    icon: FaPhoneSquareAlt,
  },
  {
    id: 3,
    type: "Phone",
    value: "+8801973217209",
    link: "tel:+8801973217209",
    icon: FaPhoneSquareAlt,
  },
  {
    id: 4,
    type: "Address",
    value: "M. Saifur Rahman Road, Moulvibazar - 3200, Sylhet, Bangladesh",
    link: "#",
    icon: FaLocationDot,
  },
];

export default contactDetails;
