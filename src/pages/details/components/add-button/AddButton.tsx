import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import classess from "./style.module.css";
import { useEffect, useState } from "react";
import Prompt from "../prompt/Prompt";

const AddButton = ({ titleData }) => {
  const { user } = useUser();
  const [showPrompt, setShowPrompt] = useState(false);
  const [titleExists, setTitleExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const userId = user?.id;
  const titleId = titleData._id;

  const checkItemExistsInReadlist = async () => {
    if (!userId || !titleId) return;
    try {
      const response = await axios.get(
        `http://localhost:2000/api/v1/user/readlist/${userId}/check-item-exists/${titleId}`
      );
      console.log(response);
      setTitleExists(response.data.exists);
    } catch (err) {
      console.error("Error trying to send the request ", err);
    } finally {
      setIsLoading(false); // set loading to false once the check is complete
    }
  };

  const handleAddOrRemove = async () => {
    if (titleExists) {
      try {
        const response = await axios.delete(
          `http://localhost:2000/api/v1/user/readlist/${userId}/remove-from-readlist/${titleId}`
        );
        console.log(
          "This is the response of removing item from the readlist",
          response
        );
        checkItemExistsInReadlist();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:2000/api/v1/user/readlist/${userId}/add-to-readlist/${titleId}`
        );
        console.log(response);
        // After adding/removing the item, re-check if it exists in the readlist
        checkItemExistsInReadlist();
      } catch (error) {
        console.error("Error trying to send the request ", error);
      }
    }
  };

  const handleButton2Click = () => {
    setShowPrompt(true);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  useEffect(() => {
    checkItemExistsInReadlist();
  }, [userId, titleId]);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while checking
  }

  return (
    <div className={classess.container}>
      <button onClick={handleAddOrRemove} className={classess.button1}>
        {titleExists ? (
          <div>
            <i className="fa-solid fa-check"></i>
            In Readlist
          </div>
        ) : (
          <div>
            <i className="fa-solid fa-plus"></i>
            Add to Readlist
          </div>
        )}
      </button>
      <button onClick={handleButton2Click} className={classess.button2}>
        <div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </button>
      {showPrompt && <Prompt onClose={handleClose} titleData={titleData} />}
    </div>
  );
};

export default AddButton;
