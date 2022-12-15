import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App.js";

const leftButtons = ["Home", "About", "All Tasks"];

function Navbar() {
  const user = useContext(UserContext);
  return (
    <nav className="text-center h-20 flex shadow-md items-center justify-between">
      {/* left  */}
      <div className="flex items-center sm:gap-7 justify-start">
        {/* logo */}
        <Link to="/" className="flex items-center ">
          <img src="/images/logo.png" alt="logo" className="w-16" />
          <span className="font-bold font-sans text-xl -translate-x-4">
            todos
          </span>
        </Link>

        {leftButtons.map((txt) => {
          return (
            <Link to="" className="hover:text-primary text-lg">
              {txt}
            </Link>
          );
        })}
      </div>

      {/* right */}
      <div className="flex justify-end justify-self-end">
        {user && user.isLoggedIn ? (
          <Link
            to="info/"
            className="text-blue-800 underline underline-offset-2"
          >
            {user && user.name}
          </Link>
        ) : (
          <>
            <Link
              to="/signin/"
              className="text-blue-800 underline underline-offset-2"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-blue-800 underline underline-offset-2"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
