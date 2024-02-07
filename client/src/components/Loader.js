import React from "react";
import loader from "../assets/spinner.gif";
export default function Loader() {
  return (
    <div className=" w-screen h-screen absolute flex items-center justify-center">
      <img className=" h-24" src={loader} />
    </div>
  );
}
