import React, { useState } from "react";
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
        `${import.meta.env.VITE_API_URL}/ratings`,
        {
          userId: user?.id,
          itemId: titleData._id,
          ratingValue: rating,
        }
      );
      onRatingChange(); // Called after updating the rating
      onClose();
    } catch (err) {
      console.error("Error trying to send the request ", err);
    }
  };

  const deleteRating = async () => {
    try {
      console.log("Deleting rating..."); // Debug log
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/rating/${user.id}/delete-rating/${
          titleData._id
        }`
      );
      onRatingChange(); // Called after deleting the rating
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
      <div className="relative bg-zinc-900 flex flex-col items-center justify-center w-[600px] rounded-lg shadow-[0_1px_10px_rgba(246,246,246,0.762)] p-0 pb-2">
        <div className="flex flex-col justify-center items-center text-white mb-2 mt-[-60px] mb-16 font-['var(--font1)']">
          <img
            src={titleData.cover}
            className="h-[180px] rounded-lg"
            alt="Cover"
          />{" "}
          {/* Added alt attribute */}
          <p className="text-white mt-[5%] mb-[10%]">RATE</p>
          <p className="text-2xl text-white font-['var(--font1)']">
            {titleData.title || "Berserk"}
          </p>{" "}
          {/* Dynamic title */}
        </div>

        <div className="translate-x-[-0%] translate-y-[-80%] rotate-y-180 flex rounded-md pl-2 pr-2">
          {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            return (
              <React.Fragment key={starValue}>
                <input
                  type="radio"
                  name="star"
                  id={`star${starValue}`}
                  className="hidden" // Added hidden class
                  onClick={() => handleClick(starValue)}
                />
                <label
                  htmlFor={`star${starValue}`}
                  className="cursor-pointer w-[50px]"
                >
                  <span className="content-['\\f005'] font-fontAwesome relative block text-[40px] text-gray-500"></span>{" "}
                  {/* Span for before pseudo-element */}
                  <span className="content-['\\f005'] font-fontAwesome absolute block text-[40px] text-white top-0 opacity-0 transition-transform duration-500 text-shadow-[0_2px_5px_rgba(0,0,0,0.5)]"></span>{" "}
                  {/* Span for after pseudo-element */}
                </label>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex flex-col">
          <button
            className="text-base font-bold rounded-md p-2 pr-[110px] pl-[110px] bg-gray-300 text-black font-['var(--font1)'] border-solid border-2 border-transparent hover:border-white hover:text-white hover:bg-zinc-800 transition-all duration-150 hover:cursor-pointer"
            onClick={createUpdateRating}
          >
            RATE
          </button>
          <button
            className="bg-transparent border-solid border-2 border-transparent text-white rounded-md p-2 pr-[110px] pl-[110px] mt-[5%] mb-[5%] font-['var(--font1)'] text-sm hover:bg-gray-200 hover:text-black hover:border-gray-200 transition-all duration-170 hover:cursor-pointer"
            onClick={deleteRating}
          >
            REMOVE RATING
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center w-[50px] h-[50px] rounded-full p-5 text-white cursor-pointer top-[-16%] right-[1%] bg-transparent border-0 hover:bg-gray-600/40"
        >
          <i className="fa-solid fa-xmark text-xl"></i>{" "}
          {/* Added text-xl for icon size */}
        </button>
      </div>
    </div>
  );
};

export default RatingPrompt;
