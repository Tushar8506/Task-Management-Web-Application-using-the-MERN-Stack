import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbUserCircle } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

const Layout = () => {
    const [showMenu, setShowMenu] = useState(false);
      const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };  
  return (
    <div className="max-w-screen-sm mx-auto mt-10 p-5 shadow-sm border rounded ">
    <div className="flex justify-end relative">
        <TbUserCircle
          size={35}
          className="cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div className="absolute top-10 right-0 bg-white shadow-lg border rounded-md p-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:bg-gray-100 px-3 py-2 rounded"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;