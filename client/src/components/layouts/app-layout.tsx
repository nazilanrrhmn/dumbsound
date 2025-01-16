import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../ui/navbar";
import { useAppSelector } from "../../hooks/use-store";
import { roleEnum } from "../../types/user";

export default function AppLayout() {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.entities);
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    if (loading === "pending") return; // Wait until loading is complete

    if (!auth?.role) {
      navigate("/login", { replace: true }); // Use 'replace' to prevent navigation stack buildup
    } else if (auth.role === roleEnum.ADMIN) {
      navigate("/add-music", { replace: true });
    }
  }, [auth, loading, navigate]);

  if (loading === "pending") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    ); // Show a loading indicator while authentication status is pending
  }

  return (
    <div className="bg-zinc-950">
      <Navbar />
      <Outlet />
    </div>
  );
}
