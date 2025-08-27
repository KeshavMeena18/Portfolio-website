import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // adjust if your Navbar is in a different location

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
}
