import React, { useState } from "react";

function Task({ task }) {
  const [done, setDone] = useState();
  const [date, setDate] = useState(false);
  return (
    <div className="flex gap-2 p-3 bg-white rounded-xl shadow-md">
      <div className={"grow flex flex-col font-sans "}>
        {/* upper part */}
        <div className="flex items-center gap-2">
          {/* task checkbox */}
          <div className="flex justify-center">
            <div
              onClick={() => setDone((old) => !old)}
              className={
                "mt-1 border-2 rounded-lg border-green-400 w-6 h-6 lg:hover:bg-green-400 flex justify-center items-center hover:cursor-pointer " +
                (done && " bg-green-400")
              }
            >
              <span className="material-symbols-rounded text-[28px] text-white">
                done
              </span>
            </div>
          </div>
          {/* task checkbox end */}

          {/* title */}
          <div
            className={
              "xxs:max-w-[150px] xs:max-w-[180px] md:max-w-none truncate text-ellipsis text-lg " +
              (done && " line-through ")
            }
          >
            {task.title}
          </div>
          {/* title end */}
        </div>
        {/* upper part end */}

        {/* lower part */}
        <div className="flex items-center gap-2 ml-9">
          {/* deadline */}
          <div
            onClick={() => setDate((old) => !old)}
            className="flex items-center text-sm text-red-600 hover:cursor-pointer"
          >
            <span className="material-symbols-rounded text-[16px] text-red-600 mr-[2px] mt-[2px]">
              timer
            </span>
            <span>{date ? "3d left" : "08/12"}</span>
          </div>
          {/* deadline end */}

          {/* notes */}
          <div className="text-gray-500 text-sm max-w-[200px] hidden xs:block sm:max-w-[350px] text-ellipsis truncate ">
            {task.notes + " this is some long ass notes that the user "}
          </div>
          {/* notes end */}
        </div>
        {/* lower part end */}
      </div>

      <div className="hover:cursor-pointer">
        <span className="material-symbols-rounded text-[28px]">
          keyboard_arrow_down
        </span>
      </div>

      <div className="hover:cursor-move flex items-center">
        <span className="material-symbols-rounded text-[28px]">
          drag_indicator
        </span>
      </div>
    </div>
  );
}

export default Task;
