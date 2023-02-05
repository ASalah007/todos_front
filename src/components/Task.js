import React, { useState } from "react";
import { useDragControls, Reorder, motion } from "framer-motion";

function Task({ task, value }) {
  const [done, setDone] = useState();
  const [date, setDate] = useState(false);
  const [expand, setExpand] = useState(false);
  const [dragging, setDragging] = useState(false);
  const toggleDetails = () => {
    setExpand((old) => !old);
  };
  const controls = useDragControls();

  return (
    <Reorder.Item value={value} dragListener={false} dragControls={controls}>
      <div className="bg-white dark:bg-white/30 dark:backdrop-blur-2xl rounded-xl shadow-md">
        <div className="flex gap-2 p-3 ">
          {/* task header */}
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
                  {done && (
                    <span className="material-symbols-rounded text-[28px] text-white">
                      done
                    </span>
                  )}
                </div>
              </div>
              {/* task checkbox end */}

              {/* title */}
              <div
                className={
                  "xxs:max-w-[150px] xs:max-w-[180px] md:max-w-none truncate text-ellipsis text-lg dark:text-white/80 " +
                  (done && " line-through")
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
                <span className="material-symbols-rounded text-[16px] text-red-600 mr-[2px]">
                  {!date ? "timer" : "calendar_today"}
                </span>
                <span>{!date ? "3d left" : "08/12"}</span>
              </div>
              {/* deadline end */}

              {/* notes */}
              <div className="text-gray-500 dark:text-white/70 text-sm max-w-[200px] hidden xs:block sm:max-w-[350px] text-ellipsis truncate ">
                {task.notes + " this is some long ass notes that the user "}
              </div>
              {/* notes end */}
            </div>
            {/* lower part end */}
          </div>
          {/* task header end */}

          <div onClick={toggleDetails} className="hover:cursor-pointer">
            <span className="material-symbols-rounded text-[28px]">
              {expand ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </div>

          <div
            className={
              " flex items-center " +
              (dragging ? "hover:cursor-grabbing" : "hover:cursor-grab")
            }
            onPointerDown={(e) => {
              setDragging(true);
              controls.start(e);
              const pointerUp = () => {
                setDragging(false);
                window.removeEventListener("pointerup", pointerUp);
              };
              window.addEventListener("pointerup", pointerUp);
            }}
            style={{ touchAction: "none" }}
          >
            <span className="material-symbols-rounded text-[28px]">
              drag_indicator
            </span>
          </div>
        </div>

        {/* task details */}
        <motion.div
          className="overflow-hidden"
          animate={{ height: expand ? 450 : 1 }}
          initial={false}
          transition={{ type: "spring", damping: 50, stiffness: 500 }}
        >
          <div className="p-3">
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
            <div>sadfadsf</div>
          </div>
        </motion.div>
        {/* task details end */}
      </div>
    </Reorder.Item>
  );
}

export default Task;
