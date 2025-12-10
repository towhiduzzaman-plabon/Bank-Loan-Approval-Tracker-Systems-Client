import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navber";
import Footer from "../components/Footer";

const MainLayout = () => {

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
