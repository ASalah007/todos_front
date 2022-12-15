import React from "react";
import { CircularProgress } from "@mui/material";

function Button(props) {
  const value = props.value || props.children;

  const ol = props.outlined
    ? "hover:bg-primary border-2 border-primary text-primary hover:text-white"
    : "bg-primary hover:ring ring-primary-200 active:ring-0 text-white ";

  const rounded = props.rounded ? " rounded-3xl " : " rounded-md ";

  return (
    <button
      {...props}
      className={
        ol + "px-4 py-1 text-center block w-full " + rounded + props.className
      }
    >
      {props.loading ? (
        <div className="flex justify-center items-center py-1">
          <CircularProgress size={25} thickness={6} sx={{ color: "white" }} />
        </div>
      ) : (
        value
      )}
    </button>
  );
}

export default Button;
