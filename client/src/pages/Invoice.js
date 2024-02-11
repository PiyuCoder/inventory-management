import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getInvoiceData } from "../axios/axios";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Invoice() {
  const sales = useSelector((state) => state?.sales);
  const invoiceClickHandler = async (e) => {
    console.log(e.target.innerText);
    const res = await getInvoiceData(e.target.innerText);
    console.log(res);
  };
  return (
    <div className=" w-screen h-screen flex items-center justify-center overflow-auto">
      <div className="text-black p-5 pb-14 w-full m-5 shadow-2xl sm:w-1/2 rounded-lg text-center bg-white flex flex-col items-center justify-center">
        <h1 className="text-sm font-bold ">Invoice Summary</h1>
        <div className=" text-start text-xs w-full">
          <h1 className="text-sm font-bold underline ">Customer Details</h1>
          <h2>Customer Name: {sales?.customerInfo.name}</h2>
          <h2>Address: {sales?.customerInfo.address}</h2>
          <h2>Date: {sales?.customerInfo.currentDate}</h2>
        </div>
        <br />
        <p className=" text-sm underline font-bold text-start w-full">
          Products purchased:
        </p>
        <table className=" w-full">
          <thead>
            <tr className="text-xs gap-1 border-2 text-white bg-black">
              <th>S.No.</th>
              <th>Product</th>
              <th>Serial</th>
              <th>Qty.</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales?.products?.map((product, i) => (
              <tr key={i} className="text-xs gap-1 border-2 ">
                <td className=" font-bold">{i + 1}.</td>

                <td className=" capitalize text-center py-1 border-l-2 border-r-2">
                  {product.productName}
                </td>
                <td className=" capitalize text-center py-1 border-l-2 border-r-2">
                  {product.productSerialNumber}
                </td>
                <td className=" capitalize text-center py-1 border-l-2 border-r-2">
                  {product.quantitySold}
                </td>
                <td className=" capitalize text-center py-1 border-l-2 border-r-2">
                  {product.itemPrice}/-
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className=" text-end font-bold w-full text-sm mt-2">
          Total Price: Rs.{sales?.totalPrice}/-
        </p>
      </div>
    </div>
  );
}
