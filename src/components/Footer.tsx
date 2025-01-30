import classes from "./footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="flex items-center justify-center hover:cursor-pointer">
      <div>
        <p
          onClick={handleContactClick}
          className="text-white inline-block m-5 text-[17px] cursor-pointer"
        >
          CONTACT
        </p>
      </div>
    </div>
  );
};
export default Footer;
