import React, { useEffect, useState } from "react";
import CustomerInfo from "../components/salesPage/CustomerInfo";
import ProductPurchased from "../components/salesPage/ProductPurchased";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../store/inventorySlice";
import { MdAddShoppingCart } from "react-icons/md";
import {
  addProductSection,
  generateInvoiceNumber,
  updateTotalPrice,
} from "../store/salesSlice";
import { getInvoiceData, saveInvoiceNumber } from "../axios/axios";
import Done from "../components/Done";
import InvoiceNumber from "../components/salesPage/InvoiceNumber";

export default function SalesPage() {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales);
  const token = useSelector((state) => state?.auth?.token);
  const [isSubmit, setIsSubmit] = useState(false);
  const [msg, setMsg] = useState("");

  console.log(isSubmit);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        sales.customerInfo.name &&
        sales.customerInfo.address &&
        sales.customerInfo.currentDate &&
        sales.products?.find(
          (product) => product.productName !== "" && product.quantitySold !== 0
        )
      ) {
        await dispatch(generateInvoiceNumber());
        const salesState = await dispatch((_dispatch, getState) => {
          const state = getState();
          return state.sales;
        });
        console.log(salesState);
        const res = await saveInvoiceNumber(salesState);
        if (res?.data?.success) {
          setIsSubmit(true);
          setMsg("");
        }
      } else {
        setMsg("Some fields are missing");
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchInventory(token));
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-y-auto pb-20">
      <p className=" font-bold text-2xl underline mb-4">
        {isSubmit ? "" : "Invoice Generator"}
      </p>
      {isSubmit ? (
        <InvoiceNumber data={sales.invoiceNumber} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-start justify-center md:w-1/2"
        >
          <CustomerInfo />
          <br />
          <p className=" font-bold text-sm mt-6">
            Product purchased:{" "}
            <span className=" text-red-800">
              {sales?.products.length < 10
                ? `0${sales?.products.length}`
                : sales?.products.length}
            </span>
          </p>
          {sales?.products?.map((product, i) => (
            <ProductPurchased key={i} index={i} product={product} />
          ))}
          <button
            className=" flex ms-5 mt-5 p-2 rounded-md bg-blue-800 text-white items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addProductSection());
            }}
          >
            <p className=" font-bold text-sm">Add Product</p>{" "}
            <MdAddShoppingCart size={20} color="white" />
          </button>
          <br />
          <div className="w-full fixed bottom-0 z-10 flex p-5 text-white md:w-1/2 bg-black items-center justify-between">
            <div>
              <p className=" text-red-600">{msg}</p>
              <h2 className=" font-bold text-lg">Total Price:</h2>
              <p>{sales.totalPrice}/-</p>
            </div>
            <button
              className="bg-green-500 text-white p-3 max-h-12  rounded-md font-bold"
              type="submit"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
