import { useUser } from "@clerk/clerk-react";
import { useLists } from "./hooks/useLists";
import axios from "axios";
import classes from "./style.module.css";
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
        `http://localhost:2000/api/v1/lists/${listId}/add-to-list/${titleId}`
      );

      // Create a new object for titleExists to ensure re-render
      setItemExistsArray((prevTitleExists) => ({
        ...prevTitleExists,
        [listId]: true, // explicitly set to true
      }));
      console.log('ITEM ADDED TO LIST')
    } catch (error) {
      console.error("Error trying to add item: ", error);
    }
  };

  const removeFromList = async (titleId: any, listId: any) => {
    try {
      const response = await axios.patch(
        `http://localhost:2000/api/v1/lists/${listId}/remove-from-list/${titleId}`
      );
      setItemExistsArray((prevItemExists) => ({
        ...prevItemExists,
        [listId]: false,
      }));
      console.log('ITEM REMOVED FROM LIST')
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
    <div className={classes.promptBackdrop}>
      <div className={classes.container}>
        <div className={classes.promptWindow}>
          <div className={classes.header}>
            <img src={titleData.cover} className={classes.cover} />
            <div className={classes.textContainer}>
              <p className={classes.titleName}>{titleData.name}</p>
              <p className={classes.headline}>Add to list</p>
            </div>
          </div>
          <div>
            {lists.map((list) => (
              <div key={list._id} className={classes.listsContainer}>
                <div
                  className={classes.box}
                  onClick={() => handleClick(titleId, list._id)}
                >
                  {/* Toggle between check and plus icons based on title existence */}
                  {itemExistsArray[list._id] ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className="fa-solid fa-plus"></i>
                  )}
                  <h3 className={classes.listName}>{list.name}</h3>
                </div>
                <div className={classes.verticalLineContainer}>
                  <div className={classes.verticalLine}></div>
                </div>
                <div
                  className={classes.goToList}
                  onClick={() => navigateToList(list._id)}
                >
                  <i className={`fa-solid fa-chevron-right`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onClose} className={classes.closeButton}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default Prompt;
