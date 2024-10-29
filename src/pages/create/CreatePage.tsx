import { useNavigate } from "react-router-dom";

const CreateResource = () => {
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
    <div>
      <h2>Select what to create:</h2>
      <div onClick={() => handleClick("manga")}>Manga</div>
      <div onClick={() => handleClick("book")}>Book</div>
      <div onClick={() => handleClick("author")}>Author</div>
    </div>
  );
};

export default CreateResource;
