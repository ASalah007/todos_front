import React, { useEffect, useContext } from "react";
import { UserContext } from "../App.js";
import { getUserTasks } from "../services/user_services.js";
import { Navigate } from "react-router-dom";
import Taskboard from "../components/Taskboard.js";

function Dashboard(props) {
  const user = useContext(UserContext);

  return !user.isLoggedIn ? (
    <Navigate to="/signin/" />
  ) : (
    <div className="bg-blue-100 dark:bg-dessert bg-fixed bg-no-repeat bg-cover flex h-full grow">
      <div className="py-4 px-1 md:px-10 xl:px-16 grow">
        <Taskboard />
      </div>

      {/* <div className="w-64 bg-green-200 text-center hidden lg:block">
        calendar timeline
      </div> */}
    </div>
  );
}

export default Dashboard;
