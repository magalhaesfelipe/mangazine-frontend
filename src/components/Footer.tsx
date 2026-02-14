import classes from "./footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="mb-5 flex items-center justify-center hover:cursor-pointer">
      <div className="w-[30%]">
        <p
          onClick={handleContactClick}
          className="w-full cursor-pointer border-2 border-zinc-700 p-5 text-center text-[17px] text-white transition duration-200 hover:border-white"
        >
          CONTACT
        </p>
      </div>
    </div>
  );
};
export default Footer;
