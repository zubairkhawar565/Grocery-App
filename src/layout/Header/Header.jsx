import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";


const Header = () => {



  return (
    <>
      <div className="flex justify-between items-center px-6 py-4">
        <img src="logo (2).png" alt="" className="w-20" />
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="text-white bg-gradient-to-b from-primarycolor to-secondarycolor rounded-full mt-1.5 hover:text-gray-800">
              <FaRegBell className="text-4xl p-2" />

            </button>
            {/* <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span> */}
          </div>
          <div className="flex items-center">
            <h1 className="bg-gradient-to-b from-primarycolor to-secondarycolor text-white rounded-full"><IoPersonOutline className="text-4xl p-2" /></h1>
            <span className="ml-2 text-xl font-bold text-primarycolor">My Profile</span>
          </div>
        </div>
      </div>


    </>
  );
};

export default Header;