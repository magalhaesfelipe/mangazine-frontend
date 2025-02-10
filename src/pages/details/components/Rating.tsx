import { useEffect, useState } from "react";
import RatingPrompt from "../../../components/RatingPrompt";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
    setTimeout(() => {
      setShowPrompt(true);
    }, 0);
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
        <p className="text-sm font-bold text-white mb-2 hover:cursor-default">
          OVERALL RATING
        </p>{" "}
        <div className="flex items-center hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 text-2xl mr-1"
          />
          <p className="font-bebas-neue text-2xl">
            {averageRating ? averageRating.toFixed(1) : "N/A"}/10
          </p>
        </div>
      </div>
      <div className="flex flex-col mr-5 items-center whitespace-nowrap">
        <p className="text-sm font-bold text-white mb-2 hover:cursor-default">
          YOUR RATING
        </p>
        <div className="flex items-center hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => openPrompt()}
            className="text-2xl mr-1"
          />
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
