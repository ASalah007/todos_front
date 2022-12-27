import React, { useState, useEffect, useContext } from "react";
import { getUserTasks } from "../services/user_services.js";
import { UserContext } from "../App.js";
import Task from "./Task.js";

const periods = ["Archive", "Today", "This Week", "This Month", "This Year"];
function Taskboard() {
  const [activePeriod, setActivePeriod] = useState(1);
  const user = useContext(UserContext);
  const [tasks, setTasks] = useState(false);
  useEffect(() => {
    if (user.isLoggedIn)
      getUserTasks().then((tasks) => {
        setTasks(tasks);
        console.log(tasks);
      });
  }, [user]);

  return (
    <div className="flex flex-col h-full gap-5 select-none whitespace-nowrap">
      {/* periods navigation */}
      <div className="bg-white h-16 flex justify-between rounded-xl shadow-md">
        {/* down period */}
        <div className="flex justify-start gap-2 items-center w-16 sm:w-36 px-3 text-sm ">
          {activePeriod > 0 && (
            <>
              {/* down arrow */}
              <div
                onClick={() => setActivePeriod((old) => old - 1)}
                className="flex justify-center items-center rounded-lg border-2 w-8 h-8 sm:hover:bg-gray-100 hover:cursor-pointer"
              >
                <span className="material-symbols-rounded text-[32px] text-gray-500">
                  keyboard_arrow_down
                </span>
              </div>

              {/* period name */}
              <div
                onClick={() => setActivePeriod((old) => old - 1)}
                className="sm:hover:underline hover:cursor-pointer underline-offset-8 sm:hover:text-primary hidden xs:block whitespace-nowrap"
              >
                {periods[activePeriod - 1]}
              </div>
            </>
          )}
        </div>

        {/* center period */}
        <div className="flex justify-center items-center text-lg w-24 sm:w-28 sm:text-2xl text-primary-800 whitespace-nowrap">
          {periods[activePeriod]}
        </div>

        {/* up period */}
        <div className="flex justify-end gap-2 items-center w-16 sm:w-36 px-3 text-sm ">
          {activePeriod < periods.length - 1 && (
            <>
              {/* period name */}
              <div
                onClick={() => setActivePeriod((old) => old + 1)}
                className="sm:hover:underline hover:cursor-pointer underline-offset-8 sm:hover:text-primary hidden xs:block whitespace-nowrap"
              >
                {periods[activePeriod + 1]}
              </div>

              {/* up arrow */}
              <div
                onClick={() => setActivePeriod((old) => old + 1)}
                className="flex justify-center items-center rounded-lg border-2 w-8 h-8 sm:hover:bg-gray-100 hover:cursor-pointer"
              >
                <span className="material-symbols-rounded text-[32px] text-gray-500">
                  keyboard_arrow_up
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* period navigation end */}

      <div className="p-1 xs:p-3 flex flex-col items-center gap-3">
        {!tasks
          ? "loading"
          : tasks.map((list) => {
              return (
                list.tasks.length > 0 && (
                  <div key={list.id} className="w-full lg:max-w-[900px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="divider grow">{list["title"]}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {list["tasks"].map((task) => {
                        return (
                          <div className="">
                            <Task key={task.id} task={task} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
            })}
      </div>
    </div>
  );
}

export default Taskboard;
