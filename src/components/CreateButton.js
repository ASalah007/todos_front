import React, { useState } from "react";
import { ClickAwayListener, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

function CreateButton() {
  const [active, setActive] = useState(false);
  const list = [
    ["/taskadd/", <AddTaskIcon />, "Task"],
    ["/listadd/", <PlaylistAddIcon />, "List"],
    ["/groupadd/", <GroupAddIcon />, "Group"],
  ];
  return (
    <ClickAwayListener onClickAway={() => setActive(false)}>
      <div className="fixed bottom-5 md:bottom-10 right-5 md:right-16 lg:right-24 flex justify-end md:justify-center">
        <motion.ol
          transition={{
            type: "spring",
            damping: 40,
            stiffness: 350,
          }}
          layout
          className={
            "absolute bottom-14 menu bg-base-100 w-36 p-2 rounded-box shadow-2xl " +
            (active ? "h-auto" : "h-0 overflow-hidden p-0")
          }
        >
          {list.map((item, i) => (
            <li>
              <Link to={item[0]}>
                {item[1]} {item[2]}
              </Link>
            </li>
          ))}
        </motion.ol>
        <Fab
          size="large"
          sx={{ backgroundColor: "#FFF" }}
          onClick={() => setActive((o) => !o)}
        >
          <motion.div
            animate={{
              rotate: active ? "225deg" : "0",
            }}
            className="origin-center"
          >
            <AddIcon fontSize="large" />
          </motion.div>
        </Fab>
      </div>
    </ClickAwayListener>
  );
}

export default CreateButton;
