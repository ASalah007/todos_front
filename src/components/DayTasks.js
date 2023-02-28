import List from "./List.js";
import React, { useState } from "react";
import { motion } from "framer-motion";

function DayTasks({ tasks }) {
  return (
    <motion.div
      className="p-1 xs:p-3 flex flex-col items-center gap-3 mb-20"
      layout
    >
      {!tasks
        ? "loading"
        : tasks.map((list, i) => <List key={i} list={list} />)}
    </motion.div>
  );
}

export default DayTasks;
