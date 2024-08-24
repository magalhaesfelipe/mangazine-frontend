import React, { useState } from "react";
import classes from "./style.module.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const RatingPrompt = ({ onClose, titleData, onRatingChange }) => {
  const { user } = useUser();
  const [rating, setRating] = useState(null);

  const handleClick = (ratingValue) => {
    const adjustedRatingValue = 11 - ratingValue;
    setRating(adjustedRatingValue);
  };

  const createUpdateRating = async () => {
    try {
      console.log("Creating/updating rating...");
      const response = await axios.post(
        `http://localhost:2000/api/v1/rating/create-update-rating`,
        {
          userId: user.id,
          titleId: titleData._id,
          ratingValue: rating,
        }
      );
      console.log("Create/Update Response:", response.data); // Debug
      onRatingChange();
    } catch (err) {
      console.error("Error trying to send the request ", err);
    }
  };

  const deleteRating = async () => {
    try {
      console.log("Deleting rating..."); // Debug log
      const response = await axios.delete(
        `http://localhost:2000/api/v1/rating/${user.id}/delete-rating/${titleData._id}`
      );
      console.log("Delete Response:", response.data); // Debug
      onRatingChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.promptBackdrop}>
      <div className={classes.promptWindow}>
        <div className={classes.theHeader}>
          <img src={titleData.cover} className={classes.cover} />
          <p className={classes.mainText}>RATE</p>
          <p className={classes.titleName}>Berserk</p>
        </div>

        <div className={classes.rating}>
          {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            return (
              <React.Fragment key={starValue}>
                <input
                  type="radio"
                  name="star"
                  id={`star${starValue}`}
                  onClick={() => handleClick(starValue)}
                />
                <label htmlFor={`star${starValue}`}></label>
              </React.Fragment>
            );
          })}
        </div>

        <div className={classes.buttonContainer}>
          <button className={classes.rateButton} onClick={createUpdateRating}>
            RATE
          </button>
          <button className={classes.button2} onClick={deleteRating}>
            REMOVE RATING
          </button>
        </div>
        <button onClick={onClose} className={classes.closeButton}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default RatingPrompt;
