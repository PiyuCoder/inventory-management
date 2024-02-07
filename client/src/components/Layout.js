import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
  return (
    <div className=" h-screen w-screen">
      <Nav />
      <div className=" w-full h-full md:pt-20 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
