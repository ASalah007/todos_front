import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Aside from "../components/Aside";
import CreateButton from "../components/CreateButton";

function BasePage() {
  const location = useLocation();
  const inAllowedPages = !["/signin/", "/"].includes(location.pathname);
  const [sidebar, setSidebar] = useState(false);
  const [expand, setExpand] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      <div className="w-screen fixed top-0 left-0 bg-white dark:bg-gray-800 dark:text-white h-20 z-10">
        <Navbar
          sidebar={sidebar}
          setSidebar={setSidebar}
          inAllowedPages={inAllowedPages}
        />
      </div>

      {inAllowedPages && (
        <div
          className={
            "sm:block fixed h-screen pt-20 " +
            (sidebar ? " block " : " hidden ") +
            (expand ? "w-24" : "w-16")
          }
        >
          <Aside expand={expand} />
        </div>
      )}
      <div className="h-20 w-screen"></div>
      <div
        className={
          "grow flex flex-col justify-between h-full w-screen overflow-x-hidden " +
          (inAllowedPages ? (expand ? "sm:pl-24" : "sm:pl-16") : "pl-0")
        }
      >
        {/* content */}
        <div className="grow flex flex-col bg-sky dark:bg-dessert bg-fixed bg-no-repeat bg-cover ">
          <Outlet />
        </div>

        {/* footer */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default BasePage;
