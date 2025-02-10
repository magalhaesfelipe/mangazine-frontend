import React from "react";
import { Rating } from "@material-tailwind/react";

const StarRate = () => {

  return (
    <div className="flex flex-col gap-4">
      <Rating unratedColor="blue" ratedColor="purple" />
    </div>
  );
}

export default StarRate;