import { useNavigate } from "react-router-dom";

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
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[70%] flex flex-col items-center">
      {" "}
      {/* container */}
      <div>
        <h2 className="text-white mb-12 text-2xl">Select what to create:</h2>{" "}
        {/* title */}
        <div
          className="bg-black text-white m-5 p-3 border-solid border-2 border-white hover:bg-white hover:text-black cursor-pointer transition-all duration-100" // item
          onClick={() => handleClick("manga")}
        >
          Manga
        </div>
        <div
          className="bg-black text-white m-5 p-3 border-solid border-2 border-white hover:bg-white hover:text-black cursor-pointer transition-all duration-100" // item
          onClick={() => handleClick("book")}
        >
          Book
        </div>
        <div
          className="bg-black text-white m-5 p-3 border-solid border-2 border-white hover:bg-white hover:text-black cursor-pointer transition-all duration-100" // item
          onClick={() => handleClick("author")}
        >
          Author
        </div>
      </div>
    </div>
  );
};

export default CreateItemPage;
