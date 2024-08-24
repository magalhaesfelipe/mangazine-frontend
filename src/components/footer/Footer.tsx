import classes from "./style.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className={classes.container}>
      <div>
        <p onClick={handleContactClick}>CONTACT</p>
      </div>
    </div>
  );
};
export default Footer;
