import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App.js";
import { signOut } from "../services/user_services.js";
import Button from "./Button.js";

const leftButtons = [
  ["Home", "/"],
  ["Dashboard", "/dashboard"],
  ["About Us", "/"],
];

function Navbar({ sidebar, setSidebar, inAllowedPages }) {
  const user = useContext(UserContext);
  const [avatarMenuState, setAvatarMenuState] = useState(false);
  const navigate = useNavigate();
  const toggleAvatarMenu = () => {
    setAvatarMenuState((oldState) => {
      if (!oldState)
        setTimeout(() => window.addEventListener("click", closeAvatarMenu), 1);
      return !oldState;
    });
  };

  const closeAvatarMenu = () => {
    setAvatarMenuState(false);
    window.removeEventListener("click", closeAvatarMenu);
  };

  return (
    <nav className="text-center h-full flex shadow-md items-center justify-between z-10">
      {/* left  */}
      <div className="flex items-center sm:gap-5 justify-start">
        {inAllowedPages && (
          <div
            onClick={() => setSidebar((old) => !old)}
            className="flex justify-center items-center text-gray-500 p-2 ml-3 sm:hidden"
          >
            <span className="material-symbols-rounded">
              {sidebar ? "close" : "menu"}
            </span>
          </div>
        )}
        {/* logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src="/images/logo.png" alt="logo" className="w-16 shrink-0 " />
          <span className="font-bold font-sans text-xl -translate-x-2 hidden xs:block">
            todos
          </span>
        </Link>

        {/* btns */}
        {leftButtons.map((btn, i) => {
          return (
            <Link
              to={btn[1]}
              className="hover:text-primary text-md whitespace-nowrap hidden md:block"
              key={i}
            >
              {btn[0]}
            </Link>
          );
        })}
      </div>

      {/* right */}
      <div className="flex justify-end justify-self-end">
        {user.isLoggedIn ? (
          <div className="flex items-center md:gap-7 gap-3">
            {/* search */}
            <div className="flex gap-3 items-center p-1 sm:p-2 sm:px-4 rounded hover:bg-gray-100 hover:cursor-pointer active:bg-gray-50 select-none">
              <div className="w-5">
                <img src="/images/search_icon.svg" alt="" />
              </div>
              <div className="text-lg hidden sm:block ">Search</div>
            </div>

            {/* border */}
            <div className="h-8 border-gray-400 border-r"></div>

            <div className="relative">
              {/* avatar */}
              <div
                onClick={toggleAvatarMenu}
                className="rounded-full border-2 border-primary text-primary hover:text-white hover:bg-primary hover:cursor-pointer text-md font-bold w-8 h-8 flex justify-center items-center mr-6 select-none"
              >
                {user.name[0]}
              </div>

              {avatarMenuState && (
                <>
                  {/* avatar menu */}
                  <div
                    className={
                      "absolute bg-gray-50 -translate-x-[86%] translate-y-2 flex flex-col shadow-lg w-60 shadow-stone-400"
                    }
                  >
                    <Link to="/dashboard">
                      <div className="p-4 flex items-center hover:cursor-pointer hover:bg-gray-200">
                        <div className="rounded-full bg-primary text-white text-md font-bold w-9 h-9 flex justify-center items-center mr-4">
                          {user.name[0]}
                        </div>
                        <div className="flex flex-col items-start">
                          <div>{user.name}</div>
                          <div className="text-sm text-gray-400">
                            view profile
                          </div>
                        </div>
                      </div>
                    </Link>

                    {[
                      ["settings", "settings", () => navigate("/")],
                      [
                        "sign out",
                        "logout",
                        () => {
                          signOut();
                          navigate("/");
                        },
                      ],
                    ].map((txt, i) => {
                      return (
                        <button
                          onClick={txt[2]}
                          className="flex items-center gap-2 p-3 border-t border-gray-200 hover:cursor-pointer hover:bg-gray-200"
                          key={i}
                        >
                          <span className="material-symbols-rounded">
                            {txt[1]}
                          </span>
                          <div>{txt[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                  {/* avatar menu end */}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-4">
            <Link
              to="/signin/"
              className="underline underline-offset-2 hover:text-primary text-lg whitespace-nowrap"
            >
              Log In
            </Link>
            <Link to="/signup/" className="whitespace-nowrap">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
