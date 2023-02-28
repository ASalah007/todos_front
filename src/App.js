import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./roots/HomePage";
import BasePage from "./roots/BasePage";
import SignInPage from "./roots/SignInPage";
import { getUserData } from "./services/user_services";
import Dashboard from "./roots/Dashboard";
import GroupsPage from "./roots/GroupsPage";
import InsightsPage from "./roots/InsightsPage";
import CalendarPage from "./roots/CalendarPage";
import StorePage from "./roots/StorePage";
import ListsPage from "./roots/ListsPage";
import TaskAddPage from "./roots/TaskAddPage";
import ListAddPage from "./roots/ListAddPage";
import GroupAddPage from "./roots/GroupAddPage";

export const UserContext = React.createContext({ isLoggedIn: false, name: "" });

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, name: "" });
  useEffect(() => {
    getUserData().then((data) => {
      if (data) setUser({ isLoggedIn: true, name: data.name });
    });
  }, []);
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<HomePage />} />
          <Route path="signin/" element={<SignInPage />} />
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="groups/" element={<GroupsPage />} />
          <Route path="insights/" element={<InsightsPage />} />
          <Route path="lists/" element={<ListsPage />} />
          <Route path="calendar/" element={<CalendarPage />} />
          <Route path="store/" element={<StorePage />} />
          <Route path="taskadd/" element={<TaskAddPage />} />
          <Route path="listadd/" element={<ListAddPage />} />
          <Route path="groupadd/" element={<GroupAddPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
