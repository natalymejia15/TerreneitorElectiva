import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center mb-5 bg-">
        <div
          className="bg-red-700 w-10 h-10 font-bold text-2xl flex items-center justify-center rounded-full"
          style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}
        >
          P
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Button
          </button>            
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default Header;
