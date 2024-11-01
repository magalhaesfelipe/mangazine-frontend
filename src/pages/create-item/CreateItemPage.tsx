import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";

const CreateItemPage = () => {
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    switch (type) {
      case "manga":
        navigate("/add-manga");
        break;
      case "book":
        navigate("add-book");
        break;
      case "author":
        navigate("/add-author");
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

export default CreateItemPage;
