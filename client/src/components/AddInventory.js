import React, { useEffect, useRef, useState } from "react";
import Done from "./Done";
import { addInventory } from "../axios/axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const AddInventory = ({ setIsAddInventory }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productSerialNumber: "",
    quantitiesReceived: 0,
    pricePerUnit: 0,
    vendorName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await addInventory(formData, data?.token);

    if (res?.data?.success) {
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsAddInventory(false);
      }, 2000);
    }
  };

  const handleClose = (e) => {
    setIsAddInventory(false);
  };

  return (
    <div className=" absolute w-svw p-5 h-screen top-0 bg-black bg-opacity-10 flex items-center justify-center ">
      {isLoading && <Loader />}
      {!isSubmitted ? (
        <form
          ref={formRef}
          className=" bg-white w-full md:w-96 flex-col flex items-center justify-center gap-4 pb-7 rounded-lg overflow-hidden shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className=" w-full p-2 bg-yellow-400 text-start font-bold py-5 px-5  text-lg">
            Add Inventory
          </h2>
          <div className=" flex flex-col items-start">
            <label className=" text-sm text-cyan-600" htmlFor="productName">
              Product Name
            </label>
            <input
              className=" w-60 md:w-72 border-2 border-slate-500 rounded-md p-2"
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex flex-col items-start">
            <label
              className=" text-sm text-cyan-600"
              htmlFor="productSerialNumber"
            >
              Product Serial Number:
            </label>
            <input
              className=" w-60 md:w-72 border-2 border-slate-500 rounded-md p-2"
              type="text"
              id="productSerialNumber"
              name="productSerialNumber"
              value={formData.productSerialNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex flex-col items-start">
            <label
              className=" text-sm text-cyan-600"
              htmlFor="quantitiesReceived"
            >
              Quantities Received:
            </label>
            <input
              className=" w-60 md:w-72 border-2 border-slate-500 rounded-md p-2"
              type="number"
              id="quantitiesReceived"
              name="quantitiesReceived"
              value={formData.quantitiesReceived}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex flex-col items-start">
            <label className=" text-sm text-cyan-600" htmlFor="pricePerUnit">
              Price per Unit:
            </label>
            <input
              className=" w-60 md:w-72 border-2 border-slate-500 rounded-md p-2"
              type="number"
              id="pricePerUnit"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex flex-col items-start">
            <label className=" text-sm text-cyan-600" htmlFor="vendorName">
              Vendor Name:
            </label>
            <input
              className=" w-60 md:w-72 border-2 border-slate-500 rounded-md p-2"
              type="text"
              id="vendorName"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex items-center justify-center flex-col">
            <button
              className=" bg-green-500 text-white p-3 w-40 rounded-lg font-bold"
              type="submit"
            >
              Save
            </button>
            <button
              className=" bg-slate-500 text-white p-3 w-40 mt-1 rounded-lg font-bold"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      ) : (
        <Done title="Added Successfully!" />
      )}
    </div>
  );
};

export default AddInventory;
