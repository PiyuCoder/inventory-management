import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getInvoiceData } from "../../axios/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InvoiceNumber({ data }) {
  const sales = useSelector((state) => state?.sales);
  const invoiceClickHandler = async (e) => {
    console.log(e.target.innerText);
    const res = await getInvoiceData(e.target.innerText);
    console.log(res);
  };
  return (
    <div className="text-black p-5 pb-14 w-full m-5 shadow-2xl sm:w-1/2 rounded-lg text-center bg-white flex flex-col items-center justify-center">
      <FaCheckCircle size={20} color="green" />
      <p className=" font-bold text-sm">
        Click on below generated Invoice number to direct to Page 3rd.
      </p>
      <Link className=" w-full text-start flex justify-center text-sm">
        Invoice no.:
        <h2
          onClick={invoiceClickHandler}
          className="text-sm underline font-bold text-center  text-blue-600"
        >
          {data}
        </h2>
      </Link>
      <br />
      <hr className="w-full bg-slate-600" />
      <br />
      <h1 className="text-sm font-bold ">Invoice Summary</h1>
      <div className=" text-start text-xs w-full">
        <h2>Customer Name: {sales?.customerInfo.name}</h2>
        <h2>Address: {sales?.customerInfo.address}</h2>
        <h2>Date: {sales?.customerInfo.currentDate}</h2>
      </div>
      <br />
      <p className=" text-xs font-bold text-start w-full">
        Products purchased:
      </p>
      <table className=" w-full">
        <thead>
          <tr className="text-xs gap-1 border-2">
            <th>S.No.</th>
            <th>Product</th>
            <th>Qty.</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales?.products?.map((product, i) => (
            <tr key={i} className="text-xs gap-1 border-2">
              <td className=" font-bold">{i + 1}.</td>

              <td className=" capitalize text-center py-1 border-l-2 border-r-2">
                {product.productName}
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
  );
}
