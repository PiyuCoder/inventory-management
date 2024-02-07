import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Done({ title }) {
  return (
    <div className="text-black p-5 rounded-lg text-center shadow-2xl bg-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <FaCheckCircle size={20} color="green" />
    </div>
  );
}
