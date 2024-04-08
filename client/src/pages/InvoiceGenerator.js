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
import { saveInvoiceNumber } from "../axios/axios";
import InvoiceNumber from "../components/salesPage/InvoiceNumber";
import { setCurrentUser } from "../store/authSlice";

export default function InvoiceGenerator() {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales);
  const token = useSelector((state) => state?.auth?.token);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        const res = await saveInvoiceNumber(salesState, token);
        if (res?.data?.success) {
          setIsSubmit(true);
          setMsg("");
          dispatch(setCurrentUser(res?.data?.user));
        } else {
          setMsg(res?.data?.message);
        }
      } else {
        setMsg("Some fields are missing");
      }
      setIsLoading(false);
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
          <p className=" text-red-600">{msg}</p>
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
              <h2 className=" font-bold text-lg">Total Price:</h2>
              <p>{sales.totalPrice}/-</p>
            </div>
            <button
              className={`${
                isLoading ? "bg-gray-500" : "bg-green-500"
              }  text-white p-3 max-h-12  rounded-md font-bold`}
              type="submit"
            >
              {isLoading ? "Loading..." : "Generate Invoice"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
