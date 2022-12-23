import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navs = [
  ["Dashboard", "calendar_today", "/"],
  ["Something", "calendar_today", "/a"],
  ["Something", "calendar_today", "/b"],
  ["Calendar", "calendar_view_month", "/b"],
];

function Aside() {
  const activeStyle = " bg-primary-800 text-gray-200 hover:bg-primary-1000";
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
    <div className="overflow-hidden bg-gray-100 h-full flex flex-col border-t border-gray-300">
      {navs.map((nav, i) => {
        return (
          <React.Fragment key={i}>
            {i === navs.length - 1 && <div className="grow"></div>}
            <Link
              to={nav[2]}
              className={
                "flex flex-col items-center py-4 hover:cursor-pointer hover:bg-gray-200 px-1 " +
                (activeIdx === i ? activeStyle : "")
              }
            >
              <span className="material-symbols-rounded text-[45px]">
                {nav[1]}
              </span>
              <div className="text-md font-semibold tracking-wide">
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
