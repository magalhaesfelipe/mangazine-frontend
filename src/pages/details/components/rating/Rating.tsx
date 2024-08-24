import { useEffect, useState } from "react";
import RatingPrompt from "../../../../components/rating-prompt/RatingPrompt";
import classes from "./style.module.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Rating = ({ titleData }) => {
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
        `http://localhost:2000/api/v1/rating/average-rating/${titleId}`
      );
      setAverageRating(averageResponse.data.averageRating);
    } catch (err) {
      console.log(err);
    }
    try {
      const userResponse = await axios.get(
        `http://localhost:2000/api/v1/rating/${userId}/get-rating/${titleId}`
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
      <div className={classes.rating}>
        <p className={classes.type}>OVERALL RATING</p>
        <div className={classes.score}>
          <i className={`fa-solid fa-star ${classes.fullStar}`}></i>
          <p>{averageRating ? averageRating.toFixed(1) : "N/A"}/10</p>
        </div>
      </div>
      <div>
        <div className={classes.rating}>
          <p className={classes.type}>YOUR RATING</p>
          <div className={classes.score}>
            <i
              className={
                userRating
                  ? `fa-solid fa-star ${classes.userStar}`
                  : `fa-regular fa-star ${classes.userStar}`
              }
              onClick={openPrompt}
            ></i>
            <p>{userRating ? `${Math.round(userRating)}/10` : "Rate"}</p>
          </div>
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
