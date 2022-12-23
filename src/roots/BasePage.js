import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BasePage() {
  const location = useLocation();
  const inAllowedPages = location.pathname !== "/signin/";
  const fixmargin = !inAllowedPages ? "sm:ml-0" : "sm:ml-28";

  return (
    <div className="min-h-screen flex-col flex">
      <Navbar />
      <div className="flex grow min-h-[800px]">
        {inAllowedPages && (
          <div className="overflow-hidden w-28 bg-green-400 fixed sm:block h-screen mt-20 hidden">
            adfasdfsafsadfsdf
          </div>
        )}

        <div
          className={"flex flex-col grow mt-20 justify-between " + fixmargin}
        >
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
