import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import MainContext from "../context/MainContext";
import { Alert } from "@mui/material";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", delay: 0.5 },
  },
};

function Auth() {
  const { setAccessToken, setRefreshToken, setProfileId, setIsUserLogin } =
    useContext(MainContext);
  const [isOpen, setisOpen] = useState(false);
  const [alertOpen, setalertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  let navigate = useNavigate();
  const InputValueFunction = (e) => {
    setInputFields((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const resisterLogin = (e) => {
    if (inputFields.password.length <= 5 || inputFields.email <= 5) {
      return;
    }
    e.preventDefault();
    if (inputFields.password != inputFields.password2) {
      setErrorMessage("Password and Confirm password does noe match");
    }
    let requestSend;
    if (isOpen == true) {
      requestSend = "resister";
    } else {
      requestSend = "login";
    }
    axios
      .post(`http://localhost:8000/auth/${requestSend}/`, { ...inputFields })
      .then((res) => {
        if (res.data.errors) {
          setErrorMessage("username or password is incorrect");
          console.log("username or password is incorrect");
        } else {
          console.info(res.data);
          setAccessToken(res.data["token"]["access"]);
          setRefreshToken(res.data["token"]["refresh"]);
          setProfileId(res.data["profile_id"]);
          setIsUserLogin(true);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e.message);
        if (requestSend == "login") {
          setErrorMessage("Username Or Password Is Incorrect");
        }

        setalertOpen(true);
        console.log("username or password is incorrect");
      });
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-[90vh] flex bg-gradient-to-tl from-rose-700 to-pink-600 justify-center items-center flex-col space-y-5 "
    >
      {errorMessage
        ? alertOpen && (
            <Alert
              severity="error"
              className="-translate-x-[50%]"
              sx={{
                position: "fixed",
                top: "10px",
                left: "50%",
                width: "600px",
              }}
              onClose={() => {
                setalertOpen(false);
              }}
            >
              {errorMessage}
            </Alert>
          )
        : ""}
      {isOpen ? (
        <>
          <motion.h1
            variants={containerVariants}
            custom={1}
            className="title-auth"
          >
            Create User
          </motion.h1>
          <motion.form
            variants={containerVariants}
            id="resistrationForm"
            className="form-auth space-y-1"
          >
            <div>
              <label className="label-auth" htmlFor="username">
                Username
              </label>
              <input
                className=" input-auth"
                type="text"
                id="username"
                onChange={InputValueFunction}
                required
                name="username"
              />
            </div>
            <div>
              <label className="label-auth" htmlFor="email">
                Email
              </label>
              <input
                className=" input-auth"
                type="email"
                id="email"
                required
                onChange={InputValueFunction}
                name="email"
              />
            </div>
            <div>
              <label className="label-auth" htmlFor="password">
                Password
              </label>
              <input
                className=" input-auth"
                type="password"
                id="password"
                onChange={InputValueFunction}
                name="password"
                required
              />
            </div>
            <div>
              <label className="label-auth" htmlFor="password2">
                Confirm-Password
              </label>
              <input
                className=" input-auth"
                type="password"
                id="password2"
                onChange={InputValueFunction}
                name="password2"
                required
              />
            </div>
            <motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                class=" mt-4 button-auth"
                onClick={resisterLogin}
              >
                Resister
              </motion.button>
            </motion.div>
            <h4 className="text-gray-300 text-sm">
              Already have a account{" "}
              <span
                onClick={() => setisOpen(false)}
                className="underline text-blue-500 font-bold cursor-pointer "
              >
                Login
              </span>{" "}
              here{" "}
            </h4>
          </motion.form>
        </>
      ) : (
        <>
          <h1 variants={containerVariants} className="title-auth">
            Login User
          </h1>
          <form
            variants={containerVariants}
            id="loginForm"
            className="form-auth space-y-3"
          >
            <div>
              <label className="label-auth" htmlFor="email">
                Email
              </label>
              <input
                className=" input-auth"
                type="email"
                id="email"
                name="email"
                onChange={InputValueFunction}
                required
              />
            </div>
            <div>
              <label className="label-auth" htmlFor="password">
                Password
              </label>
              <input
                className="input-auth"
                type="password"
                id="password"
                name="password"
                onChange={InputValueFunction}
                required
              />
            </div>
            <div className="mt-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resisterLogin}
                class=" mt-4 button-auth"
              >
                Login
              </motion.button>
            </div>
            <h4 className="text-gray-300 text-sm">
              Don't have a account{" "}
              <span
                onClick={() => setisOpen(true)}
                className="underline text-blue-500 font-bold cursor-pointer "
              >
                Resister
              </span>{" "}
              here{" "}
            </h4>
          </form>
        </>
      )}
    </motion.div>
  );
}

export default Auth;
