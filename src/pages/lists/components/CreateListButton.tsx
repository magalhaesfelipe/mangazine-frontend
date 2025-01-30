import classess from "./style.module.css";
import { Link } from "react-router-dom";

const CreateListButton = () => {
  return (
    <Link to="/create-list">
      <button className="border-0 rounded-md bg-main-color text-black mr-5 pr-5 pt-2 pb-2 text-lg font-fantasy font-light whitespace-nowrap border-solid border-2 border-transparent hover:border-white hover:bg-black hover:text-white transition-all duration-100">
        <i className="fa-solid fa-plus text-lg pr-4 pl-4 bg-white text-black hover:bg-black hover:text-white"></i>
        CREATE LIST
      </button>
    </Link>
  );
};

export default CreateListButton;
