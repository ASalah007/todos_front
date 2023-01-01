import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navs = [
  ["Dashboard", "space_dashboard", "/dashboard"],
  ["Lists", "receipt_long", "/lists"],
  ["My Groups", "groups", "/groups"],
  ["Insights", "insights", "/insights"],
  ["Store", "storefront", "/store"],
  ["Calendar", "calendar_month", "/calendar"],
];

function Aside({ expand }) {
  const activeStyle = " bg-primary text-gray-100 hover:bg-primary-800";
  const [activeIdx, setActiveIdx] = useState(0);
  const location = useLocation();
  useEffect(() => {
    let i;
    for (i = 0; i < navs.length; i++) {
      if (navs[i].includes(location.pathname)) {
        setActiveIdx(i);
        break;
      }
    }
  }, [activeIdx, setActiveIdx, location.pathname]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-0 h-full flex flex-col border-t border-r border-gray-200 overflow-auto">
      {navs.map((nav, i) => {
        return (
          <React.Fragment key={i}>
            {i === navs.length - 1 && <div className="grow"></div>}
            <Link
              to={nav[2]}
              className={
                "flex flex-col gap-1 items-center py-4 hover:cursor-pointer px-1 relative " +
                (activeIdx === i
                  ? activeStyle
                  : "hover:bg-gray-200 dark:hover:bg-gray-900")
              }
            >
              <span className="material-symbols-rounded text-[40px]">
                {nav[1]}
              </span>
              <div
                className={
                  "text-sm tracking-wide text-center w-20 " +
                  (expand ? "block" : "hidden")
                }
              >
                {nav[0]}
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Aside;
