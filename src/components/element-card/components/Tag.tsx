import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Tag = ({ userId, itemId }) => {
  const [isOnReadlist, setIsOnReadlist] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkItemExists = async () => {
      console.log(userId, itemId);

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/user/readlist/${userId}/check-item-exists/${itemId}`
        );
        setIsOnReadlist(response.data.exists);
      } catch (error) {
        console.error("Error checking item existence:", error);
      }
    };

    checkItemExists();
  }, [userId, itemId]);

  const addOrRemoveItem = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      if (isOnReadlist) {
        await axios.delete(
          `${
            import.meta.env.VITE_API_URL
          }/user/readlist/${userId}/remove-from-readlist/${itemId}`
        );
        setIsOnReadlist(false); // Reflect item removal in UI
      } else {
        await axios.patch(
          `${
            import.meta.env.VITE_API_URL
          }/user/readlist/${userId}/add-to-readlist/${itemId}`
        );
        setIsOnReadlist(true); // Reflect item addition in UI
      }
    } catch (err) {
      console.error("Error updating readlist", err);
    }
  };

  return (
    <span
      className={`material-icons absolute text-[45px] text-white cursor-pointer`}
      onClick={addOrRemoveItem}
    >
      {isOnReadlist ? "bookmark_added" : "bookmark_add"}
    </span>
  );
};

export default Tag;
