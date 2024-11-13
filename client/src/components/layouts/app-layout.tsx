import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/navbar";

export default function AppLayout() {
  return (
    <div className="bg-zinc-950">
      <Navbar />
      <Outlet />
    </div>
  );
}
