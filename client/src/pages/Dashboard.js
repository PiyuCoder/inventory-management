import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full flex items-center justify-center flex-col gap-10">
      <div
        onClick={() => navigate("/inventory")}
        className=" w-60 h-32 rounded-lg shadow-2xl bg-green-500 hover:bg-green-400 cursor-pointer flex items-center justify-center flex-col"
      >
        <h1 className=" text-white font-bold text-xl">INVENTORIES</h1>
        <p className=" text-xs">View your products</p>
      </div>
      <div
        onClick={() => navigate("/invoices")}
        className=" w-60 h-32 rounded-lg shadow-2xl bg-blue-500 hover:bg-blue-400 cursor-pointer flex items-center justify-center flex-col"
      >
        <h1 className=" text-white font-bold text-xl">INVOICES</h1>
        <p className=" text-xs">View generated invoices</p>
      </div>
    </div>
  );
}
