import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const logoutHandler = () => {
    if (loginUser) {
      sessionStorage.clear();
      navigate("/login");
    }
  };
  return (
    
    <header className="bg-gradient-to-r from-green-400 to-blue-500 shadow-md border-rounded-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Title */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h2 className="text-white font-bold text-xl tracking-wide transition-all duration-200 hover:text-green-100">
              Wallet Wizard
            </h2>
          </div>
          
          {/* Right side - User info and logout */}
          <div className="flex items-center space-x-6">
            {loginUser && (
              <div className="flex items-center">
                <div className="flex items-center mr-6">
                  <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-medium mr-2">
                    {loginUser.name ? loginUser.name.charAt(0).toUpperCase() : ""}
                  </div>
                  <span className="text-white font-medium hidden sm:block">
                    {loginUser.name}
                  </span>
                </div>
                <button
                  onClick={logoutHandler}
                  className="bg-white text-blue-500 py-1.5 px-4 rounded-md font-medium text-sm shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
            {!loginUser && (
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-500 py-1.5 px-4 rounded-md font-medium text-sm shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;