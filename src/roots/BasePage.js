import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Aside from "../components/Aside";

function BasePage() {
  const location = useLocation();
  const inAllowedPages = !["/signin/", "/"].includes(location.pathname);

  return (
    <div className="h-screen grid grid-cols-12 grid-rows-12 gap-0">
      <div className="col-span-12 row-span-1">
        <Navbar />
      </div>
      {inAllowedPages && (
        <div className="hidden sm:block sm:col-span-2 xl:col-span-1 row-start-2 row-end-13">
          <Aside />
        </div>
      )}

      <div
        className={
          "col-span-full sm:col-span-10 xl:col-span-11 row-start-2 row-end-13 bg-yellow-300 overflow-y-auto " +
          (!inAllowedPages && "sm:col-span-full")
        }
      >
        <div className="flex flex-col grow justify-between h-full">
          {/* content */}
          <div className="grow flex flex-col">
            <Outlet />
          </div>

          {/* footer */}
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasePage;
