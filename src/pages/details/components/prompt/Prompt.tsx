import { useUser } from "@clerk/clerk-react";
import { useLists } from "./hooks/useLists";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Prompt = ({ onClose, titleData }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const titleId = titleData._id;
  const { lists, itemExistsArray, setItemExistsArray } = useLists(
    user?.id,
    titleId
  );

  const addToList = async (titleId: any, listId: any) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/lists/${listId}/add-to-list/${titleId}`
      );

      // Create a new object for titleExists to ensure re-render
      setItemExistsArray((prevTitleExists) => ({
        ...prevTitleExists,
        [listId]: true, // explicitly set to true
      }));
      console.log("ITEM ADDED TO LIST");
    } catch (error) {
      console.error("Error trying to add item: ", error);
    }
  };

  const removeFromList = async (titleId: any, listId: any) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/lists/${listId}/remove-from-list/${titleId}`
      );
      setItemExistsArray((prevItemExists) => ({
        ...prevItemExists,
        [listId]: false,
      }));
      console.log("ITEM REMOVED FROM LIST");
    } catch (error) {
      console.error("Error removing item from the list:", error);
    }
  };

  useEffect(() => {}, [itemExistsArray]);

  const navigateToList = (listId: any) => {
    navigate(`/list/${listId}`);
  };

  const handleClick = (titleId: any, listId: any) => {
    if (itemExistsArray[listId]) {
      removeFromList(titleId, listId);
    } else {
      addToList(titleId, listId);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center overflow-y-auto">
      {" "}
      {/* promptBackdrop */}
      <div className="bg-gray-800 w-[600px] rounded-lg shadow-lg pb-4 mt-20">
        {" "}
        {/* promptWindow */}
        <div className="flex bg-gray-900 pt-4 pb-4">
          {" "}
          {/* header */}
          <img
            src={titleData.cover}
            alt={titleData.name}
            className="h-[100px] rounded-lg ml-4"
          />{" "}
          {/* cover */}
          <div className="ml-4 w-[200px] flex flex-col">
            {" "}
            {/* textContainer */}
            <p className="font-tertiary">{titleData.name}</p> {/* titleName */}
            <p className="text-2xl font-bold font-tertiary text-white mt-2">{`Add to list`}</p>{" "}
            {/* headline */}
          </div>
        </div>
        <div>
          {lists.map((list) => (
            <div key={list._id} className="flex">
              {" "}
              {/* listsContainer */}
              <div
                className="flex items-center w-[85%] hover:bg-gray-700 cursor-pointer" // box
                onClick={() => handleClick(titleId, list._id)}
              >
                {itemExistsArray[list._id] ? (
                  <i className="fa-solid fa-check ml-4 mr-4"></i>
                ) : (
                  <i className="fa-solid fa-plus ml-4 mr-4"></i>
                )}
                <h3 className="font-tertiary">{list.name}</h3> {/* listName */}
              </div>
              <div className="flex items-center">
                {" "}
                {/* verticalLineContainer */}
                <div className="border h-9 mt-1"></div> {/* verticalLine */}
              </div>
              <div
                className="w-[15%] flex justify-center items-center hover:bg-gray-700 cursor-pointer" // goToList
                onClick={() => navigateToList(list._id)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer bg-transparent border-none hover:bg-gray-600" // closeButton
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Prompt;
