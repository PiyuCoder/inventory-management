import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerInfo } from "../../store/salesSlice";

export default function CustomerInfo() {
  const dispatch = useDispatch();
  const customerInfo = useSelector((state) => state.sales.customerInfo);
  const [formData, setFormData] = useState(
    customerInfo || {
      name: "",
      address: "",
      currentDate: "",
    }
  );

  const updateCustomerInfoHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(updateCustomerInfo(formData));
  }, [formData]);
  return (
    <div className=" w-full">
      <p className=" font-bold text-sm ">Customer Info:</p>
      <div className=" flex  items-center justify-start gap-2 bg-white p-10 border-2 rounded-lg w-full flex-wrap">
        <div className=" flex flex-col items-start justify-center">
          <label className=" font-bold text-xs text-cyan-600">
            Customer Name
          </label>
          <input
            value={formData.name}
            name="name"
            onChange={updateCustomerInfoHandler}
            className="mt-1 p-1 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className=" flex flex-col items-start justify-center">
          <label className=" font-bold text-xs text-cyan-600">
            Customer Address
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={updateCustomerInfoHandler}
            className="mt-1 p-1 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className=" flex flex-col items-start justify-center">
          <label className=" font-bold text-xs text-cyan-600">Date</label>
          <input
            type="date"
            name="currentDate"
            value={formData.currentDate}
            onChange={updateCustomerInfoHandler}
            className="mt-1 p-1 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
