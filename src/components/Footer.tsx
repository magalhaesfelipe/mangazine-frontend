import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleContactClick = () => navigate("/contact");

  return (
    <div className="mb-5 flex items-center justify-center hover:cursor-pointer">
      <div className="flex w-[90%] justify-center">
        <p
          onClick={handleContactClick}
          className="w-full cursor-pointer border-b-2 border-zinc-800 p-5 text-center text-[17px] text-white transition duration-200 hover:border-white"
        >
          CONTACT
        </p>
      </div>
    </div>
  );
};
export default Footer;
