import { useEffect, useState } from "react";
import RatingPrompt from "../../../components/RatingPrompt";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Rating = ({ titleData }: any) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const { user } = useUser();

  const titleId = titleData?._id;
  const userId = user?.id;

  const fetchRatings = async () => {
    if (!user) return;
    try {
      const averageResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/ratings/item/${titleId}/average`
      );
      setAverageRating(averageResponse.data.averageRating);
    } catch (err) {
      console.log(err);
    }
    try {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/ratings/user/${userId}/item/${titleId}`
      );
      setUserRating(userResponse.data.userRating.rating);
    } catch (err) {
      console.error(err);
      setUserRating(null);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [user, titleId]);

  const openPrompt = () => {
    setShowPrompt(true);
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  const handleRatingChange = () => {
    fetchRatings(); // Re-fetch ratings when prompt is closed
    closePrompt();
  };

  return (
    <>
      <div className="flex flex-col mr-5 items-center whitespace-nowrap">
        {" "}
        {/* rating */}
        <p className="text-sm font-bold text-white mb-2">OVERALL RATING</p>{" "}
        {/* type */}
        <div className="flex items-baseline">
          {" "}
          {/* score */}
          <i className="fa-solid fa-star text-2xl text-yellow-400 mr-1"></i>{" "}
          {/* fullStar */}
          <p className="font-bebas-neue text-2xl">
            {averageRating ? averageRating.toFixed(1) : "N/A"}/10
          </p>
        </div>
      </div>
      <div className="flex flex-col mr-5 items-center whitespace-nowrap">
        {" "}
        {/* rating */}
        <p className="text-sm font-bold text-white mb-2">YOUR RATING</p>{" "}
        {/* type */}
        <div className="flex items-baseline">
          {" "}
          {/* score */}
          <i
            className={`fa-solid fa-star text-2xl ${
              userRating
                ? "text-main-color cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`} // userStar with conditional class
            onClick={openPrompt}
          ></i>
          <p className="font-bebas-neue text-2xl">
            {userRating ? `${Math.round(userRating)}/10` : "Rate"}
          </p>
        </div>
        {showPrompt && (
          <RatingPrompt
            onClose={closePrompt}
            titleData={titleData}
            onRatingChange={handleRatingChange}
          />
        )}
      </div>
    </>
  );
};

export default Rating;
