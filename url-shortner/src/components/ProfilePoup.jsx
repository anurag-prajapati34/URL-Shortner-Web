import React, { useContext, useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaShoppingBag } from "react-icons/fa";
import { FirebaseAuthContext } from "../contexts/FirebaseAuthContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { logedInUser, logOut } = useContext(FirebaseAuthContext);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        className="flex items-center gap-2 text-white hover:text-blue-600"
        onClick={togglePopup}
      >
        <FaUserCircle className="text-3xl" />
        <span className="hidden sm:block font-medium">My Account</span>
      </button>

      {/* Profile Popup */}
      {isPopupOpen && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 animate-slideDown"
          style={{ zIndex: 50 }}
        >
          {/* User Info Section */}
          <div className="flex items-center gap-4 p-4  gradient-background text-white rounded-t-lg">
            <div className="w-12 h-12 bg-blue-300 rounded-full border-2 border-white flex items-center justify-center text-lg font-bold text-gray-800">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="text-start">
              <h4 className="font-bold text-lg">
                {logedInUser?.displayName || "Guest User"}
              </h4>
              <p className="text-sm">
                {logedInUser?.email || "No email available"}
              </p>
            </div>
          </div>

      

          {/* Logout Section */}
          <div className="py-3 px-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <button
              onClick={logOut}
              className="flex items-center gap-3 w-full text-red-600 font-medium py-2 px-3 hover:bg-red-50 rounded-lg transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay for Closing Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25"
          onClick={togglePopup}
          style={{ zIndex: 40 }}
        ></div>
      )}
    </div>
  );
};

export default ProfilePopup;
