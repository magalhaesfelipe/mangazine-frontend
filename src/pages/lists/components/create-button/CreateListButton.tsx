import classess from "./style.module.css";
import { Link } from "react-router-dom";

const CreateListButton = () => {
  return (
      <Link to="/create-list">
        <button className={classess.theButton}>
          <i className="fa-solid fa-plus"></i>
          CREATE LIST
        </button>
      </Link>
  );
};

export default CreateListButton;
