import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const Star = (props) => {
  return (
    <>
      {[...new Array(5)].map((star, index) => {
        const isFilled = index < props.rate;
        return isFilled ? (
          <AiFillStar key={index} className="text-yellow-500" />
        ) : (
          <AiOutlineStar key={index} className="text-yellow-500" />
        );
      })}
    </>
  );
};
