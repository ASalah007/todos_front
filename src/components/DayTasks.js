import React from "react";
import Task from "./Task";

function DayTasks({ tasks }) {
  return (
      <div className="p-1 xs:p-3 flex flex-col items-center gap-3 mb-20">
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
  );
}

export default DayTasks;
