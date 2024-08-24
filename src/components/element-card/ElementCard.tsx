import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingPrompt from "../rating-prompt/RatingPrompt";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Tag from "./components/Tag";

const ElementCard = (props: any) => {
  const { item } = props;
  const [showPrompt, setShowPrompt] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const itemId = item?._id;
  const userId = user?.id;

  useEffect(() => {
    if (!user) return;

    const fetchRatings = async () => {
      try {
        // Fetch average rating
        const avgResponse = await axios.get(
          `http://localhost:2000/api/v1/rating/average-rating/${itemId}`
        );
        setAverageRating(avgResponse.data.averageRating);

        // Fetch user rating
        try {
          const userResponse = await axios.get(
            `http://localhost:2000/api/v1/rating/${userId}/get-rating/${itemId}`
          );
          setUserRating(userResponse.data.userRating.rating);
        } catch (userErr) {
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

    fetchRatings();
  }, [user, itemId, userId]);

  const navigateToDetails = (itemId: any) => {
    navigate(`/details/${itemId}`);
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
          onClick={() => navigateToDetails(item._id)}
        >
          <img src={item.cover} alt={item.name} />
        </div>

        <div className={classes.title}>
          <p>{item.name}</p>
        </div>

        <div className={classes.info}>
          <div className={classes.authorDate}>
            <p>{item.author} </p>
            <p>{item.releaseYear}</p>
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
              onClick={() => navigateToDetails(item._id)}
              className={classes.elementCardButton}
            >
              Details
            </button>
          </div>
          <div className={classes.tag}>
            {userId && <Tag userId={userId} itemId={itemId} />}
          </div>
        </div>
      </div>
      {showPrompt && <RatingPrompt onClose={closePrompt} titleData={item} />}
    </>
  );
};

export default ElementCard;
