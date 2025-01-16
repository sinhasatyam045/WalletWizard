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
              <h3 className="text-3xl font-bold">Sign in</h3>
              <h3 className="font-semibold italic">Unlock Financial Magic</h3>
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
                placeholder="Password"
                className="p-2 border border-gray-500 outline-none"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              ></input>
            </div>
            <div className="space-y-1">
              <div className="justify-center flex  ">
                <button
                  type="submit"
                  className="w-[80%] border bg-blue-500 p-2 rounded-full "
                  onClick={(e) => submitHandler(e)}
                >
                  Submit
                </button>
              </div>

              <div id="new-user" className="flex justify-center">
                <div className="text-black">Not a user?</div>
                <Link to="/register">
                  <div className="text-blue-500">Click here to register</div>
                </Link>
              </div>
            </div>
          </form>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
