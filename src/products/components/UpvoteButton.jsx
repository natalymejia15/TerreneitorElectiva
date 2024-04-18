import React from "react";

const UpvoteButton = ({ upvoted, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold border ${
        upvoted ? "text-red-600 border-red-600" : "text-gray-600 border-gray-600"
      } hover:bg-white hover:border-red-600`}
    >
      {upvoted? children: "boton"}
    </button>
  );
};

export default UpvoteButton;
