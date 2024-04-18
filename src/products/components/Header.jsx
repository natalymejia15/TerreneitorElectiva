import React from "react";
import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <div className="flex flex-col bg-slate-200">
      <div className="flex flex-row justify-between items-center mb-5 bg-">
        <div
          className="bg-red-600 w-10 h-10 font-bold text-2xl flex items-center justify-center rounded-full ml-5 mt-2"
          style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}
        >
          P
        </div>
        <h1 className="text-2xl font-bold hover:text-blue-600">PRODUCT HUNT</h1>
        <NavLink
            to="/login"
            className="bg-violet-900 hover:bg-red-400 text-white rounded-md p-8 py-2 text-sm font-medium mr-5"
            aria-current="page"
          >
            Sign In
        </NavLink>            
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default Header;
