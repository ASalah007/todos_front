import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Group({ group }) {
  const [menu, setMenu] = useState(false);
  console.log(group);
  const menuList = [
    ["add_task", "Add Task", "/"],
    ["edit", "Edit Group", "/"],
    ["person_add", "Add Member", "/"],
    ["logout", "Leave Group", "/"],
  ];
  return (
    <div
      className={
        "rounded-xl bg-base-100 shadow-2xl p-3 grow max-w-sm " +
        (menu && "bg-gray-300")
      }
    >
      <div className="flex justify-between gap-3">
        <Link className="font-bold text-slate-700 truncate text-ellipsis grow">
          {group.title}
        </Link>
        <ClickAwayListener onClickAway={() => setMenu(false)}>
          <div
            className="hover:cursor-pointer select-none relative"
            onClick={() => setMenu((old) => !old)}
          >
            <span className="material-symbols-rounded text-[28px] -translate-y-2">
              more_horiz
            </span>
            <div
              className={
                "absolute bg-white right-1 top-5 z-10 shadow-2xl rounded-xl  flex flex-col gap-1 overflow-hidden " +
                (menu ? "border py-2 h-auto" : "h-0")
              }
            >
              {menuList.map((menu, i) => (
                <Link
                  to={menu[2]}
                  key={i}
                  className={
                    "p-1 px-2 hover:bg-gray-100 whitespace-nowrap w-40 flex items-center gap-4 " +
                    (i === menuList.length - 1 && "text-red-500")
                  }
                >
                  <span
                    className={
                      "material-symbols-rounded " +
                      (i === menuList.length - 1 && "text-red-500")
                    }
                  >
                    {menu[0]}
                  </span>
                  <div>{menu[1]}</div>
                </Link>
              ))}
            </div>
          </div>
        </ClickAwayListener>
      </div>
      <div className="flex items-center gap-2">
        <div>12/25</div>
        <progress
          className="progress progress-info w-56 grow"
          value="30"
          max="100"
        ></progress>
      </div>
      <div className="flex items-center gap-1 justify-end">
        {group.members.length}
        <span className="material-symbols-rounded">group</span>
      </div>
    </div>
  );
}

export default Group;
