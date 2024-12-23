import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingPrompt from "../rating-prompt/RatingPrompt";
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
        `${import.meta.env.VITE_API_URL}/ratings/item/${item.itemId._id}/average`
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
      <div className={classes.contentContainer}>
        <div
          className={classes.coverContainer}
          onClick={() => navigateToDetails(item.itemId._id, item.itemModel)}
        >
          <img src={item.itemId.cover} alt={item.itemId.name} />
        </div>

        <div className={classes.title}>
          <p>{item.itemId.name}</p>
        </div>

        <div className={classes.info}>
          <div className={classes.authorDate}>
            <p className={classes.author}>{item.itemId.authorName} </p>
            <p className={classes.year}>{item.itemId.releaseYear}</p>
          </div>

          <div className={classes.rating}>
            <div className={classes.test}>
              <div className={classes.avgRating}>
                <i className="fa-solid fa-star fa-2xs"></i>
              </div>
              <div>
                <p>{averageRating ? averageRating.toFixed(1) : "N/A"}</p>
              </div>
            </div>
            <div className={classes.test} onClick={openPrompt}>
              <div className={classes.userRating}>
                <i
                  className={
                    userRating
                      ? `fa-solid fa-star fa-2xs`
                      : `fa-regular fa-star fa-2xs`
                  }
                ></i>
              </div>
              <div>
                <p>{userRating ? Math.round(userRating) : "Rate"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.buttonContainer}>
          <div>
            <button
              onClick={() => navigateToDetails(item.itemId._id)}
              className={classes.elementCardButton}
            >
              Details
            </button>
          </div>
          <div className={classes.tag}>
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
