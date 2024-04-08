import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllInvoiceData, getInvoiceData } from "../axios/axios";
import Loader from "../components/Loader";

export default function SalesPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedSubFilterOption, setSelectedSubFilterOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllInvoiceData(token);
        setData(res?.data?.allInvoices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  const filteredInvoices = data?.filter((el) => {
    if (selectedFilterOption === "product") {
      return el.invoiceData.products.some((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (selectedFilterOption === "customer") {
      return el.invoiceData.customerInfo.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    } else if (selectedFilterOption === "date") {
      if (selectedSubFilterOption === "particularDate") {
        // Filter for a particular date
        return el.invoiceData.customerInfo.currentDate === specificDate;
      } else if (selectedSubFilterOption === "lastWeek") {
        // Filter for the last 1 week
        const currentDate = new Date();
        const lastWeekDate = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        const invoiceDate = new Date(el.invoiceData.customerInfo.currentDate);
        return invoiceDate > lastWeekDate;
      } else if (selectedSubFilterOption === "lastMonth") {
        // Filter for the last 1 month
        const currentDate = new Date();
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        return (
          new Date(el.invoiceData.customerInfo.currentDate) > lastMonthDate
        );
      } else if (selectedSubFilterOption === "dateRange") {
        if (startDate && endDate) {
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);
          const invoiceDate = new Date(el.invoiceData.customerInfo.currentDate);
          return invoiceDate >= startDateObj && invoiceDate <= endDateObj;
        }
      } else {
        return true;
      }
    } else if (selectedFilterOption === "priceRange") {
      const minPriceNumber = parseFloat(minPrice);
      const maxPriceNumber = parseFloat(maxPrice);

      return (
        el.invoiceData.totalPrice >= minPriceNumber &&
        el.invoiceData.totalPrice <= maxPriceNumber
      );
    } else {
      return true;
    }
  });

  const filterOptionHandler = (e) => {
    setSelectedFilterOption(e.target.value);
    if (searchText || selectedSubFilterOption) {
      setSearchText("");
      setSelectedSubFilterOption("");
    }
  };

  const invoiceClickHandler = async (invoiceNumber) => {
    setIsLoading(true);
    try {
      const res = await getInvoiceData(invoiceNumber);
      navigate("/invoice", { state: res?.data?.invoiceData.invoiceData });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  const totalFilteredPrice = filteredInvoices?.reduce(
    (total, invoice) => total + invoice.invoiceData.totalPrice,
    0
  );

  return (
    <>
      {!data.length ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center flex-col">
          {isLoading && <Loader />}
          <h1 className=" text-start w-full font-bold text-lg md:text-[30px]">
            Sales Tracker
          </h1>
          <p className=" text-start w-full text-xs mb-8">
            Track your recent sales made
          </p>
          <div className=" flex items-center justify-center gap-2 mb-5">
            <p className=" font-bold"> Filter By</p>
            <div>
              <select
                className=" border bg-blue-900 text-white p-1 rounded-md "
                value={selectedFilterOption}
                onChange={filterOptionHandler}
              >
                <option value="">Select</option>
                <option value="product">Product Name</option>
                <option value="customer">Customer Name</option>
                <option value="date">Date</option>
                <option value="priceRange">Price range</option>
              </select>
              {selectedFilterOption === "priceRange" && (
                <div>
                  <input
                    className=" border p-1 rounded-md border-black"
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    className=" border p-1 rounded-md border-black"
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              )}
              {(selectedFilterOption === "customer" ||
                selectedFilterOption === "product") && (
                <input
                  className=" border p-1 md:ml-2 rounded-md border-black"
                  placeholder="Type here..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              )}
              {selectedFilterOption === "date" && (
                <select
                  className=" border bg-blue-800 text-white p-1 rounded-md "
                  value={selectedSubFilterOption} // Change selectedFilterOption to selectedSubFilterOption
                  onChange={(e) => setSelectedSubFilterOption(e.target.value)} // Use setSelectedSubFilterOption instead of setSelectedFilterOption
                >
                  <option value="">Select</option>
                  <option value="particularDate">Particular date</option>
                  <option value="lastWeek">Last 1 week</option>
                  <option value="lastMonth">Last 1 month</option>
                  <option value="dateRange">Date Range</option>
                </select>
              )}

              {selectedSubFilterOption === "particularDate" && (
                <input
                  className=" border-red-600 border-2"
                  type="date" // Set the input type to "date"
                  value={specificDate} // Bind value to specificDate
                  onChange={(e) => setSpecificDate(e.target.value)} // Update specificDate on change
                />
              )}
              {selectedSubFilterOption === "dateRange" && (
                <div>
                  <input
                    className=" border p-1  rounded-md border-black"
                    placeholder="Start date"
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <input
                    className=" border p-1 md:ml-2 rounded-md border-black"
                    placeholder="End date"
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="overflow-auto border w-full h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-cyan-950 text-white">
                <tr>
                  <th className="px-6 py-3  text-xs font-medium text-center  uppercase tracking-wider">
                    S.no
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    Invoice No.
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    Products Sold
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    Sold On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices?.map((d, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <p
                        onClick={() => invoiceClickHandler(d.invoiceNumber)}
                        className="text-blue-500 hover:underline text-center cursor-pointer"
                      >
                        {d.invoiceNumber}
                      </p>
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      {d?.invoiceData?.products?.map((product, index) => (
                        <p key={index} className="capitalize">
                          {product.productName}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {d.invoiceData.customerInfo.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {d.invoiceData.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {d.invoiceData.customerInfo.currentDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className=" text-lg w-full bg-black p-6 text-white text-start font-bold mt-5 fixed bottom-0 md:w-1/2">
            Total Sale: {totalFilteredPrice}/-
          </p>
        </div>
      )}
    </>
  );
}
