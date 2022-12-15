import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./roots/HomePage";
import BasePage from "./roots/BasePage";
import SignInPage from "./roots/SignInPage";
import UserHomePage from "./roots/UserHomePage";
import { getUserData } from "./services/user_services";

export const UserContext = React.createContext({ isLoggedIn: false, name: "" });

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, name: "" });
  useEffect(() => {
    getUserData().then((data) => {
      setUser({ isLoggedIn: true, name: data.name });
    });
  }, []);
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<HomePage />} />
          <Route path="signin/" element={<SignInPage />} />
          <Route path="home/" element={<UserHomePage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
