import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";

const CreateNewTitlePage = () => {
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    switch (type) {
      case "manga":
        navigate("/create-manga");
        break;
      case "book":
        navigate("create-book");
        break;
      case "author":
        navigate("/create-author");
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Select what to create:</h2>
        <div className={classes.item} onClick={() => handleClick("manga")}>
          Manga
        </div>
        <div className={classes.item} onClick={() => handleClick("book")}>
          Book
        </div>
        <div className={classes.item} onClick={() => handleClick("author")}>
          Author
        </div>
      </div>
    </div>
  );
};

export default CreateNewTitlePage;
