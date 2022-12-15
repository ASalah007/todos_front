import React, { useEffect } from "react";
import { getUserTasks } from "../services/user_services.js";

function UserHomePage(props) {
  useEffect(() => {
    getUserTasks().then((tasks) => console.log(tasks));
  }, []);

  return <p>UserHomePage</p>;
}

export default UserHomePage;
