import { useDragControls, Reorder, motion, LayoutGroup } from "framer-motion";
import React, { useState } from "react";
import Task from "./Task";

export default function List({ list }) {
  const [items, setItems] = useState(list.tasks.map((t, i) => i));
  return (
    <Reorder.Group
      key={list.id}
      className="w-full lg:max-w-[900px]"
      values={items}
      onReorder={setItems}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="divider grow">{list["title"]}</div>
      </div>
      <div className="flex flex-col gap-2">
        <LayoutGroup>
          {items.map((i) => (
            <Task key={list.tasks[i].id} task={list.tasks[i]} value={i} />
          ))}
        </LayoutGroup>
      </div>
    </Reorder.Group>
  );
}
