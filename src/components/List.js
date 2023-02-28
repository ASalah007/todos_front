import { Reorder, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Task from "./Task";

export default function List({ list }) {
  const [items, setItems] = useState(list.tasks && list.tasks.map((t, i) => i));
  return (
    list.tasks &&
    list.tasks.length > 0 && (
      <Reorder.Group
        className="w-full lg:max-w-[900px]"
        values={items}
        onReorder={setItems}
      >
        <div className="divider grow text-white before:bg-white after:bg-white">
          {list["title"]}
        </div>
        <AnimatePresence>
          <div className="flex flex-col gap-2">
            {items.map((i) => (
              <Task key={list.tasks[i].id} task={list.tasks[i]} value={i} />
            ))}
          </div>
        </AnimatePresence>
      </Reorder.Group>
    )
  );
}
