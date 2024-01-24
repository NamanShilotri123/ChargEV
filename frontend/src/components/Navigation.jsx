import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import MainContext from "../context/MainContext";
import UserProfilePic from "./UserProfilePic";
function Navigation() {
  const { isUserLogin } = useContext(MainContext);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  return (
    <header>
      <nav className="flex justify-between items-center px-5 z-50 py-3 border-b-2 animate-fadeInUp ">
        <Link
          className="text-4xl font-bold tracking-wider text-red-400  "
          to={"/"}
        >
          ChargEV.
        </Link>
        <ul className="hidden md:flex justify-center items-center space-x-10">
          <li>
            <NavLink
              className="hover:text-red-400 transition-all duration-200 ease-in-out"
              to={"explore/"}
            >
              Explore
            </NavLink>
          </li>
          {isUserLogin && (
            <li>
              <NavLink
                className="hover:text-red-400 transition-all duration-200 ease-in-out"
                to={"dashboard/"}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className="hover:text-red-400 transition-all duration-200 ease-in-out"
              to={"help/"}
            >
              Help
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:text-red-400 transition-all duration-200 ease-in-out"
              to={"about/"}
            >
              About
            </NavLink>
          </li>
          {isUserLogin == true ? (
            <li>
              <UserProfilePic />
            </li>
          ) : (
            <li>
              <NavLink
                to={"login/"}
                className="bg-red-400 flex justify-center items-center text-white active:bg-red-300 hover:bg-red-500 font-bold uppercase text-base px-6 py-2 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all   duration-150"
              >
                <i className="fa-solid fa-arrow-right-to-arc"></i>
                login
              </NavLink>
            </li>
          )}
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:hidden "
          fill="black"
          viewBox="0 0 24 24"
          id="toggle-button"
          onClick={() => setIsNavBarOpen((prev) => !prev)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </nav>
      {isNavBarOpen && (
        <div
          id="mobile-menu"
          className={`px-10 space-y-3 md:hidden last:pb-5  overflow-hidden animate-navbar bg-gray-100 ${
            isNavBarOpen ? "w-full" : ""
          } `}
        >
          <NavLink
            onClick={() => setIsNavBarOpen((prev) => !prev)}
            className="block"
            to={"explore/"}
          >
            Explore
          </NavLink>
          <NavLink
            onClick={() => setIsNavBarOpen((prev) => !prev)}
            className="block"
            to={"explore/"}
          >
            Profile
          </NavLink>
          <NavLink
            onClick={() => setIsNavBarOpen((prev) => !prev)}
            className="block"
            to={"explore/"}
          >
            Help
          </NavLink>
          <NavLink
            onClick={() => setIsNavBarOpen((prev) => !prev)}
            className="block"
            to={"login/"}
          >
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Navigation;
