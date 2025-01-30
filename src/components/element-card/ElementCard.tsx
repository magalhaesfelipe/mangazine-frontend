import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingPrompt from "../RatingPrompt";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Tag from "./components/Tag";

const ElementCard = ({ item }: any) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const userId = user?.id;

  const fetchRatings = async () => {
    try {
      // Fetch average rating
      const avgResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/ratings/item/${
          item.itemId._id
        }/average`
      );
      setAverageRating(avgResponse.data.averageRating);
      console.log("This is the average Rating: ", averageRating);

      // Fetch user rating
      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/ratings/user/${userId}/item/${
            item.itemId._id
          }`
        );
        setUserRating(userResponse.data.userRating.rating);
      } catch (userErr: any) {
        // Handle the case where no user rating is found
        if (userErr.response?.status === 404) {
          setUserRating(null);
        } else {
          console.error("Failed to fetch user rating: ", userErr);
        }
      }
    } catch (err) {
      console.error("Failed to fetch average rating: ", err.message);
    }
  };
  useEffect(() => {
    if (!user) return;

    fetchRatings();
  }, [user, item, userId]);

  const handleRatingChange = () => {
    fetchRatings();
  };

  const navigateToDetails = (itemId: any, type: any) => {
    navigate(`/details/${itemId}/${type}`);
  };

  const openPrompt = () => {
    setShowPrompt(true);
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <>
      <div className="bg-[#161616] flex flex-col w-[190px] max-h-[440px] pb-[50px] mb-[30px] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <div
          className="h-[270px] w-full text-center inline-block rounded-t-[5%] cursor-pointer relative"
          onClick={() => navigateToDetails(item.itemId._id, item.itemModel)}
        >
          <img
            src={item.itemId.cover}
            alt={item.itemId.name}
            className="h-[270px] w-full flex rounded-t-lg hover:filter-brightness-75"
          />
        </div>

        <div className="block h-auto font-['Franklin_Gothic_Medium'] mt-2 mb-5 max-w-[180px]">
          {" "}
          {/* Font name might need adjustment */}
          <p className="line-clamp-2 overflow-hidden text-ellipsis ml-2 text-base text-white leading-[1.2]">
            {item.itemId.name}
          </p>
        </div>

        <div className="flex flex-col text-left">
          <div className="pl-2 font-arial">
            {" "}
            {/* Font name might need adjustment */}
            <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-400 mb-2 leading-[1.2]">
              {item.itemId.authorName}
            </p>
            <p className="text-sm text-gray-400 mb-2 whitespace-nowrap">
              {item.itemId.releaseYear}
            </p>
          </div>

          <div className="flex items-baseline justify-center m-0 mt-2">
            <div className="flex flex-row items-baseline justify-center h-5 pr-2 ml-10 cursor-pointer relative">
              <div className="absolute left-[-22px] top-[7px]">
                {" "}
                {/* Absolute positioning for icon */}
                <i className="fa-solid fa-star fa-2xs text-sm text-yellow-400"></i>{" "}
                {/* Star icon styling */}
              </div>
              <p className="text-sm font-arial text-gray-500 m-0">
                {" "}
                {/* Font name might need adjustment */}
                {averageRating ? averageRating.toFixed(1) : "N/A"}
              </p>
            </div>
            <div
              className="flex flex-row items-baseline justify-center h-5 pr-2 ml-10 cursor-pointer relative"
              onClick={openPrompt}
            >
              <div className="absolute left-[-22px] top-[7px]">
                {" "}
                {/* Absolute positioning for icon */}
                <i
                  className={`fa-solid fa-star fa-2xs text-sm ${
                    userRating ? "text-main-color" : "text-gray-500" // Conditional color
                  }`}
                ></i>
              </div>
              <p className="text-sm font-arial text-gray-500 m-0">
                {" "}
                {/* Font name might need adjustment */}
                {userRating ? Math.round(userRating) : "Rate"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 relative flex items-baseline">
          <div className="ml-4">
            {" "}
            {/* Adjusted margin for button */}
            <button
              onClick={() => navigateToDetails(item.itemId._id)}
              className="text-base text-gray-300 rounded-md font-['Trebuchet_MS'] pl-6 pr-6 pt-2 pb-2 bg-[#ffffff12] cursor-pointer border-0 hover:bg-white/30"
            >
              Details
            </button>
          </div>
          <div className="absolute right-[55px] top-[-6px]">
            {userId && <Tag userId={userId} itemId={item.itemId._id} />}
          </div>
        </div>
      </div>
      {showPrompt && (
        <RatingPrompt
          onClose={closePrompt}
          titleData={item.itemId}
          onRatingChange={handleRatingChange}
        />
      )}
    </>
  );
};

export default ElementCard;
