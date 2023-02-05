import List from "./List.js";
import React from "react";

function DayTasks({ tasks }) {
  return (
    <div className="p-1 xs:p-3 flex flex-col items-center gap-3 mb-20">
      {!tasks
        ? "loading"
        : tasks.map(
            (list, i) => list.tasks.length > 0 && <List key={i} list={list} />
          )}
    </div>
  );
}

export default DayTasks;