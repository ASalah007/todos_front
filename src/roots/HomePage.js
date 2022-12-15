import React, { useEffect } from "react";
import { isLoggedIn } from "../services/user_services.js";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  // isLoggedIn()
  //   .then(() => navigate("/home/"))
  //   .catch(() => {});
  return <div>HomePage</div>;
}

export default HomePage;
