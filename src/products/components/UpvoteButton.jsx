import React from "react";
import { HiArrowCircleDown } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth";

const UpvoteButton = ({ upvoted, onClick, children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };
  
  return (
    <button
      onClick={onLogout}
      className={`bg-violet-500 hover:bg-violet-400 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center
       ${upvoted ? "text-red-600 border-red-600" : "text-gray-600 border-gray-600"
      } hover:bg-white hover:border-red-600`}
    >
      <HiArrowCircleDown className="w-4 h-4 mr-2" />
      {upvoted? children: "0"}
    </button>
  );
};

export default UpvoteButton;
