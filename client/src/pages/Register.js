import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Loaded");
      const response = await axios.post("/users/register", values);
      console.log("Response", response);
      toast.success("Registration successful");
      console.log("Done");
      setLoading(false);
      navigate("/login");
      console.log("navigated to login page");
    } catch (error) {
      console.log("eroor occured");
      setLoading(false);
      toast.error("Invalid username or password");
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
        id="register--page"
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
                <h3 className="text-3xl font-bold tracking-wide">Create Account</h3>
                <p className="mt-2 text-indigo-200 font-medium">Unlock Financial Magic</p>
              </div>
              
              {/* Form Fields */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full p-3 pl-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-indigo-500 outline-none transition-all duration-200"
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                    />
                  </div>
                </div>
                
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
                      placeholder="6 characters minimum"
                      className="w-full p-3 pl-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-indigo-500 outline-none transition-all duration-200"
                      value={values.password}
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-600 mb-4">
                    By clicking Accept and Register, you agree to the{" "}
                    <span className="text-blue-400 font-medium">Terms of Use</span> and the{" "}
                    <span className="text-blue-400 font-medium">Privacy Policy</span> of Wallet Wizard
                  </p>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                    onClick={(e) => submitHandler(e)}
                  >
                    Accept and Register
                  </button>
                </div>
                
                <div className="text-center pt-4 text-sm">
                  <span className="text-gray-600">Already registered? </span>
                  <Link to="/login" className="text-blue-400 font-medium hover:text-blue-500 transition-colors duration-200">
                    Sign In
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

export default Register;