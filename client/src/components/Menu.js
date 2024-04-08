import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Menu({ setIsMenu }) {
  const menuRef = useRef();
  const token = useSelector((state) => state.auth.token);

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuRef]);
  return (
    <div className=" absolute top-10 right-14 bg-white border-2 shadow-2xl w-40 py-5 z-30 flex flex-col  rounded-md items-center justify-center">
      <ul
        ref={menuRef}
        onClick={() => setIsMenu(false)}
        className=" flex flex-col gap-5 "
      >
        <Link className=" hover:text-amber-800 " to={"/"}>
          HOME
        </Link>

        <Link className=" hover:text-amber-800 " to={"/inventory"}>
          INVENTORY
        </Link>
        <Link className=" hover:text-amber-800 " to={"/sales"}>
          Sales
        </Link>
        <Link className=" hover:text-amber-800 " to={"/newsale"}>
          New Sale
        </Link>
        <Link
          className=" bg-green-500 text-white p-2 text-center   rounded-lg font-bold"
          to={"/login"}
        >
          {token ? "Logout" : "Login"}
        </Link>
      </ul>
    </div>
  );
}
