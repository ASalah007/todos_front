import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navs = [
  ["Dashboard", "space_dashboard", "/dashboard"],
  ["Lists", "receipt_long", "/b"],
  ["My Groups", "groups", "/a"],
  ["Insights", "insights", "/b"],
  ["Store", "storefront", "/b"],
  ["Calendar", "calendar_month", "/b"],
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
    <div className="bg-gray-100 h-full flex flex-col border-t border-gray-300 overflow-auto">
      {navs.map((nav, i) => {
        return (
          <React.Fragment key={i}>
            {i === navs.length - 1 && <div className="grow"></div>}
            <Link
              to={nav[2]}
              className={
                "flex flex-col gap-1 items-center py-4 hover:cursor-pointer px-1 relative " +
                (activeIdx === i ? activeStyle : "hover:bg-gray-200")
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
