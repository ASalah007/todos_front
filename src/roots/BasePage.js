import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

class BasePage extends Component {
  render() {
    return (
      <div className="min-h-screen flex-col flex">
        <Navbar />
        <div className="flex grow flex-col min-h-[800px]">
          <Outlet />
        </div>
        <div className="justify-self-end">
          <Footer />
        </div>
      </div>
    );
  }
}

export default BasePage;
