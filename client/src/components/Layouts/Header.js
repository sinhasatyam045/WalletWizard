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
    <div
      className="flex justify-between border bg-blue-400 text-white p-2  "
      id="main "
    >
      <div id="title" className="hover:text-gray-300 cursor-pointer f">
        <h2>Wallet Wizard</h2>
      </div>
      <div id="subs" className="flex justify-evenly items-center">
        <div id="sub1" className="hover:text-gray-300">
          <h5>{loginUser && loginUser.name}</h5>
        </div>
        <div>
          <button
            onClick={logoutHandler}
            className="bg-gray-600 p-1 rounded-md  "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
