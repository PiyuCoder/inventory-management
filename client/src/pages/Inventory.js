import React, { useEffect, useState } from "react";
import AddInventory from "../components/AddInventory";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../store/inventorySlice";

export default function Inventory() {
  const [isAddInventory, setIsAddInventory] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const token = useSelector((state) => state?.auth?.token);
  const inventories = useSelector((state) => state?.inventory?.inventories);

  const handleAddInventoryClick = (e) => {
    e.stopPropagation();
    setIsAddInventory(true);
  };

  console.log(inventories);
  useEffect(() => {
    dispatch(fetchInventory(token));
  }, [isAddInventory]);

  return (
    <div className=" w-full h-full bg-white flex flex-col py-10">
      <p className=" ms-10"> {`Welcome, ${user.name}`}</p>
      <h2 className=" font-bold ms-10">Inventory</h2>
      <div className=" self-end">
        <button
          className=" bg-green-500 text-white p-3  rounded-lg font-bold me-10 text-sm"
          onClick={handleAddInventoryClick}
        >
          + Add Inventory
        </button>
      </div>
      <div className="max-h-96 overflow-auto border-2 m-5 md:m-10">
        <table className=" w-full">
          <thead className=" bg-cyan-950 text-white ">
            <tr className=" border-2 gap-10">
              <th className=" text-sm py-4">S.no</th>
              <th className=" text-sm border-l-white border-r-white border-2 ">
                Product Name
              </th>
              <th className=" text-sm border-l-white border-r-white border-2">
                Serial Number
              </th>
              <th className=" text-sm border-l-white border-r-white border-2">
                Quantities Received
              </th>
              <th className=" text-sm border-l-white border-r-white border-2">
                Price Per Unit
              </th>
              <th className=" text-sm border-l-white border-r-white border-2">
                Vendor Name
              </th>
            </tr>
          </thead>
          <tbody>
            {inventories?.map((inventory, index) => (
              <tr className=" border-2 hover:bg-slate-100" key={inventory._id}>
                <td className=" text-center py-4 border-l-2 border-r-2 ">
                  {index + 1}
                </td>
                <td className=" text-center border-l-2 border-r-2 text-cyan-500 capitalize ">
                  {inventory.productName}
                </td>
                <td className=" text-center border-l-2 border-r-2 ">
                  {inventory.productSerialNumber}
                </td>
                <td className=" text-center border-l-2 border-r-2 ">
                  {inventory.quantitiesReceived}
                </td>
                <td className=" text-center border-l-2 border-r-2 ">
                  {inventory.pricePerUnit}
                </td>
                <td className=" text-center border-l-2 border-r-2 ">
                  {inventory.vendorName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddInventory && <AddInventory setIsAddInventory={setIsAddInventory} />}
    </div>
  );
}
