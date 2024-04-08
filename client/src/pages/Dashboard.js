import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBox, FiFileText } from "react-icons/fi"; // Import icons from react-icons library

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-10">
      <div
        onClick={() => navigate("/inventory")}
        className="w-72 h-40 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:bg-green-500 cursor-pointer flex items-center justify-center flex-col transition duration-300 transform hover:scale-105"
      >
        <FiBox className="text-white text-4xl mb-2" /> {/* Box icon */}
        <h1 className="text-white font-bold text-2xl">Manage Inventories</h1>
        <p className="text-white text-sm text-center">
          Browse and manage your products with ease
        </p>
      </div>
      <div
        onClick={() => navigate("/sales")}
        className="w-72 h-40 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-blue-500 cursor-pointer flex items-center justify-center flex-col transition duration-300 transform hover:scale-105"
      >
        <FiFileText className="text-white text-4xl mb-2" />{" "}
        {/* FileText icon */}
        <h1 className="text-white font-bold text-2xl">View Invoices</h1>
        <p className="text-white text-sm text-center">
          Access and manage your generated invoices
        </p>
      </div>
    </div>
  );
}
