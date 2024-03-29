import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

export default function Invoice({ salesPage }) {
  const invoiceRef = useRef();
  const location = useLocation();
  const sales = useSelector((state) => state?.sales);
  const user = useSelector((state) => state?.auth.user);
  const [pdfWidth, setPdfWidth] = useState(210); // A4 paper width in mm
  const [pdfHeight, setPdfHeight] = useState(297);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  console.log("test", location);

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait", // or 'landscape'
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });
    doc.html(invoiceRef.current, {
      callback: function (pdf) {
        pdf.save("invoice.pdf");
      },
    });
  };

  return (
    <div
      className={`${
        salesPage ? " absolute top-1 md:top-14" : ""
      } w-screen h-screen flex flex-col items-center justify-center gap-5 overflow-y-auto bg-slate-200`}
    >
      <div className=" absolute bottom-5 md:relative">
        <button
          className="bg-green-500 text-white p-3 rounded-md font-bold mt-4"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-md font-bold mt-4 ml-2"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
      <div
        ref={invoiceRef}
        className="text-black p-5 py-5 pb-16 w-full  shadow-2xl sm:w-2/3 lg:w-1/2  text-center bg-white flex flex-col items-center justify-center"
      >
        <div className=" w-full flex items-center justify-start">
          {user.logo ? (
            <img className=" h-10" src={`${baseUrl}/${user.logo}`} />
          ) : (
            <h1 className=" font-bold text-red-700">{user.establishment}</h1>
          )}
        </div>
        {/* <br /> */}
        <h1 className="text-[9px] sm:text-xs font-bold ">Invoice Summary</h1>
        <div className=" text-start text-[9px] sm:text-xs w-full">
          <h1 className="text-[9px] sm:text-xs font-bold underline ">
            Customer Details
          </h1>
          <h2>Customer Name: {location?.state?.customerInfo.name}</h2>
          <h2>Address: {location?.state?.customerInfo.address}</h2>
          <h2>Date: {location?.state?.customerInfo.currentDate}</h2>
        </div>
        <br />
        <div className=" text-start text-[9px] sm:text-xs w-full">
          <h1 className="text-[9px] sm:text-xs font-bold underline ">
            Invoice Details
          </h1>
          <h2>Invoice no: {location?.state?.invoiceNumber}</h2>
          {/* <h2>Address: {sales?.customerInfo.address}</h2>
          <h2>Date: {sales?.customerInfo.currentDate}</h2> */}
        </div>
        <br />
        <p className=" text-[9px] sm:text-xs underline font-bold text-start w-full">
          Products purchased:
        </p>
        <table className=" w-full">
          <thead>
            <tr className="text-[9px] sm:text-xs gap-1 border-2 text-white bg-black">
              <th>S.No.</th>
              <th>Product</th>
              <th>Serial</th>
              <th>Qty.</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {location?.state?.products?.map((product, i) => (
              <tr key={i} className="text-[9px] sm:text-xs gap-1 border-2 ">
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
        <p className=" text-end font-bold w-full text-[9px] sm:text-xs mt-2">
          Total Price: Rs.{location?.state?.totalPrice}/-
        </p>
        <br />
        <div className=" w-full text-start text-[9px] sm:text-xs">
          <p className=" font-bold">Invoice issued by {user.establishment}</p>
          <p>{user.address}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      </div>
    </div>
  );
}
