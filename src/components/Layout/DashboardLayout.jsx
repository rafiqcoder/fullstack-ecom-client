import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <Sidebar></Sidebar>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
