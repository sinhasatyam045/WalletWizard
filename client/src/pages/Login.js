import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import RiseLoader from "react-spinners/RiseLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Entered");
    try {
      console.log("Entered");
      setLoading(true);
      console.log("Entered");
      console.log(values);
      const { data } = await axios.post("/users/login", values);
      console.log("Entered");

      console.log(data);
      setLoading(false);
      console.log("About to happen");
      toast.success("Login successful");
      console.log("Happened");
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );

      navigate("/");
    } catch (error) {
      console.log("occured");
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div
        id="login-page"
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
      >
        {loading ? (
          <div className="p-8 bg-white rounded-lg shadow-xl">
            <RiseLoader
              color={"#00BFFF"}
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
            <form
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              onSubmit={(e) => submitHandler(e)}
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 text-white">
                <h3 className="text-3xl font-bold tracking-wide">Welcome Back</h3>
                <p className="mt-2 text-indigo-200 font-medium">Unlock Financial Magic</p>
              </div>
              
              {/* Form Fields */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full p-3 pl-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-indigo-500 outline-none transition-all duration-200"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-3 pl-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-indigo-500 outline-none transition-all duration-200"
                      value={values.password}
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                    onClick={(e) => submitHandler(e)}
                  >
                    Sign In
                  </button>
                </div>
                
                <div className="text-center pt-4 text-sm">
                  <span className="text-gray-600">Not a user? </span>
                  <Link to="/register" className="text-blue-400 font-medium hover:text-indigo-600 transition-colors duration-200">
                    Create an account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;