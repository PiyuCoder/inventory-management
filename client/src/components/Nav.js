import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/authSlice";

export default function Nav() {
  const [isMenu, setIsMenu] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (token) {
      navigate("/login");
    }
    sessionStorage.clear();
    dispatch(setToken(null));
  };

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

        <button
          className=" bg-green-500 text-white p-2   rounded-lg font-bold"
          onClick={logoutHandler}
        >
          {token ? "Logout" : "Login"}
        </button>
      </ul>
      {isMenu && <Menu setIsMenu={setIsMenu} />}
    </nav>
  );
}
