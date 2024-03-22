import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Menu from "./Menu";

export default function Nav() {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <nav className=" w-screen flex items-center justify-end md:justify-center md:bg-yellow-600 px-4 z-50 md:px-10 p-4 fixed">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsMenu((prev) => (prev ? false : true));
        }}
        className=" bg-yellow-600 p-1 rounded-md md:hidden"
      >
        <IoMenu size={35} color="white" />
      </div>
      <ul className=" hidden w-screen md:flex justify-between items-center text-white text-lg font-bold">
        <h2 className=" italic">Logo</h2>
        <div className="flex gap-10 items-center">
          <Link className=" hover:text-amber-800 transition-all" to={"/"}>
            HOME
          </Link>
          <Link className=" hover:text-amber-800 transition-all" to={"/"}>
            ABOUT
          </Link>
          <Link
            className=" hover:text-amber-800 transition-all"
            to={"/inventory"}
          >
            INVENTORY
          </Link>
          <Link className=" hover:text-amber-800 transition-all" to={"/sales"}>
            SALES
          </Link>
          <Link
            className=" hover:text-amber-800 transition-all"
            to={"/newSale"}
          >
            NEW SALE
          </Link>
        </div>

        <Link
          className=" bg-green-500 text-white p-2   rounded-lg font-bold"
          to={"/login"}
        >
          Login
        </Link>
      </ul>
      {isMenu && <Menu setIsMenu={setIsMenu} />}
    </nav>
  );
}
