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
        className=" flex items-center justify-center h-screen  "
      >
        {loading ? (
          <RiseLoader
            color={"#0000FF"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <form
            className=" w-[25%] border shadow-2xl space-y-8 p-4 bg-gray-100 rounded-md "
            onSubmit={(e) => submitHandler(e)}
          >
            <div>
              <h3 className="text-3xl font-bold">Sign up</h3>
              <h3 className="font-semibold italic">Unlock Financial Magic</h3>
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="p-2 border border-gray-500 outline-none w-[100%]"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              ></input>
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="email"
                className="p-2 border border-gray-500 outline-none"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              ></input>
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Password (6 characters minimum)"
                className="p-2 border border-gray-500 outline-none"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              ></input>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-extralight">
                By clicking Accept and Register,you agree to the{" "}
                <span className="font-bold text-blue-400">terms of Use</span>and
                the
                <span className="font-bold text-blue-400">Privacy Policy</span>
                Wallet Wizard
              </div>
              <div className="justify-center flex  ">
                <button
                  type="submit"
                  className="w-[80%] border bg-blue-500 p-2 rounded-full "
                >
                  Accept and register
                </button>
              </div>

              <div id="new-user" className="flex justify-center text-blue-500">
                <div className="text-black">Already registered?</div>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </form>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
