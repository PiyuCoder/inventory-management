import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useSelector } from "react-redux";

export default function Layout() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      if (location.pathname !== "/register") navigate("/login");
    }
  }, [location.pathname]);
  return (
    <div className=" h-screen w-screen">
      <Nav />
      <div className=" w-full h-full md:pt-20 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
