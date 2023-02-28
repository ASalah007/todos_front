import React, { useState } from "react";
import { useDragControls, Reorder, motion } from "framer-motion";
import { finishUserTask } from "../services/user_services";

function Task({ task, value }) {
  const [done, setDone] = useState(false);
  const [date, setDate] = useState(false);
  const [expand, setExpand] = useState(false);
  const [dragging, setDragging] = useState(false);
  const toggleDetails = () => {
    setExpand((old) => !old);
  };
  const controls = useDragControls();
  function finish() {
    if (done) {
      setDone(false);
      finishUserTask(task.id, { finished_date: null });
    } else {
      setDone(true);
      finishUserTask(task.id, {
        finished_date: new Date(Date.now()).toISOString(),
      });
    }
  }
  let dueDate = new Date(task.due_date).toLocaleDateString().split("/");
  dueDate.pop();
  dueDate = dueDate.reverse().join("/");
  const timeLeft = new Date(task.due_date).getTime() - Date.now();

  const days = Math.ceil(Math.abs(timeLeft) / (1000 * 60 * 60 * 24));
  const daysLeft = days + "d " + (timeLeft > 0 ? "left" : "over due");

  function getColor() {
    if (timeLeft <= 1) return "text-red-600";
    else if (days > 3) return "text-blue-600";
    return "text-cyan-500";
  }

  return (
    !done && (
      <Reorder.Item
        value={value}
        dragListener={false}
        dragControls={controls}
        key={task.id}
        layoutId={task.id}
      >
        <div className="bg-white dark:bg-white/30 dark:backdrop-blur-2xl rounded-xl shadow-md">
          <div className="flex gap-2 p-3 ">
            {/* task header */}
            <div className={"grow flex flex-col font-sans "}>
              {/* upper part */}
              <div className="flex items-center gap-2">
                {/* task checkbox */}
                <div className="flex justify-center">
                  <div
                    onClick={() => finish()}
                    className={
                      "mt-1 border-2 rounded-lg border-green-400 w-6 h-6 lg:hover:bg-green-400 flex justify-center items-center hover:cursor-pointer " +
                      (done && " bg-green-400")
                    }
                  >
                    {
                      <span className="material-symbols-rounded text-[28px] text-white">
                        done
                      </span>
                    }
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
                {task.due_date && (
                  <div
                    onClick={() => setDate((old) => !old)}
                    className={
                      "flex items-center text-sm hover:cursor-pointer " +
                      getColor()
                    }
                  >
                    <span
                      className={
                        "material-symbols-rounded text-[16px] mr-[2px]" +
                        getColor()
                      }
                    >
                      {!date ? "timer" : "calendar_today"}
                    </span>
                    <span>{!date ? daysLeft : dueDate}</span>
                  </div>
                )}
                {/* deadline end */}

                {/* notes */}
                <div className="text-gray-500 dark:text-white/70 text-sm max-w-[200px] hidden xs:block sm:max-w-[350px] text-ellipsis truncate ">
                  {task.notes}
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
            className="overflow-hidden flex"
            animate={{ height: expand ? "auto" : 0 }}
            initial={false}
            transition={{ type: "spring", damping: 50, stiffness: 500 }}
          >
            <div className="p-3 grow flex gap-8 flex-col">
              {task.start_date && (
                <div>
                  <h1 className="font-bold text-lg">Start Date</h1>
                  <div>{task.start_date.substr(0, 16).replace("T", " @ ")}</div>
                </div>
              )}

              {task.due_date && (
                <div>
                  <h1 className="font-bold text-lg">Due Date</h1>
                  <div>{task.due_date.substr(0, 16).replace("T", " @ ")}</div>
                </div>
              )}

              {task.notes && (
                <div className="grow">
                  <h1 className="font-bold text-lg">Notes</h1>
                  <div>{task.notes}</div>
                </div>
              )}
            </div>
          </motion.div>
          {/* task details end */}
        </div>
      </Reorder.Item>
    )
  );
}

export default Task;
