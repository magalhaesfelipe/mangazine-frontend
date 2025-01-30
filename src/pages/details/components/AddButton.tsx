import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Prompt from "./prompt/Prompt";
import { useNavigate } from "react-router-dom";

const AddButton = ({ titleData }) => {
  const { user } = useUser();
  const [showPrompt, setShowPrompt] = useState(false);
  const [titleExists, setTitleExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const userId = user?.id;
  const titleId = titleData._id;

  const checkItemExistsInReadlist = async () => {
    if (!userId || !titleId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/readlists/${userId}/item/${titleId}`
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
    if (!userId) {
      navigate(`/auth`);
    }

    if (titleExists) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/readlists/${userId}/item/${titleId}`
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
          `${import.meta.env.VITE_API_URL}/readlists/${userId}/item/${titleId}`
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

  {
    userId && !titleExists && <div>Loading...</div>;
  }
  {
    /* Loading condition */
  }

  <div className="flex justify-end">
    {" "}
    {/* container */}
    <button
      onClick={handleAddOrRemove}
      className="pl-4 pr-5 py-2 text-lg rounded-l-[25px] bg-main-color text-black font-impact border-0 border-r-4 border-black whitespace-nowrap hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-200" // button1
    >
      {titleExists ? (
        <div className="flex items-center">
          {" "}
          {/* Added flex for icon and text alignment */}
          <i className="fa-solid fa-check mr-4"></i> {/* Added margin-right */}
          In Readlist
        </div>
      ) : (
        <div className="flex items-center">
          {" "}
          {/* Added flex for icon and text alignment */}
          <i className="fa-solid fa-plus mr-4"></i> {/* Added margin-right */}
          Add to Readlist
        </div>
      )}
    </button>
    <button
      onClick={handleButton2Click}
      className="pl-3 pr-3 ml-0 text-lg rounded-r-[25px] bg-main-color text-black font-impact border-0 hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-200" // button2
    >
      <i className="fa-solid fa-angle-down"></i>
    </button>
    {showPrompt && <Prompt onClose={handleClose} titleData={titleData} />}
  </div>;
};

export default AddButton;
