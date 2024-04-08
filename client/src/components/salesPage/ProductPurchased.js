import React, { useEffect, useState } from "react";
import {
  deleteProductSection,
  updateProductInfo,
  updateTotalPrice,
} from "../../store/salesSlice";
import { useDispatch, useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";

export default function ProductPurchased({ index, product }) {
  const dispatch = useDispatch();
  const inventories = useSelector((state) => state?.inventory?.inventories);
  const sales = useSelector((state) => state?.sales);
  const [currProduct, setCurrProduct] = useState(
    sales?.products[index]?.productName || ""
  );

  useEffect(() => {
    // Update the input value when the product name changes in the Redux state
    setCurrProduct(sales?.products[index]?.productName || "");
  }, [sales?.products[index]?.productName]);

  const handleProductInfoChange = (e) => {
    const productName = e.target.value;
    setCurrProduct(productName);

    const selectedProduct = inventories.find(
      (inventory) => inventory.productName === productName
    );

    if (selectedProduct) {
      const { productSerialNumber, pricePerUnit } = selectedProduct;
      dispatch(
        updateProductInfo({
          id: product?.id,
          productInfo: {
            productName,
            productSerialNumber,
            price: pricePerUnit,
            itemPrice: sales?.products[index]?.quantitySold * pricePerUnit,
          },
        })
      );

      dispatch(updateTotalPrice());
    } else {
      console.log("not");
      dispatch(
        updateProductInfo({
          id: product?.id,
          productSerialNumber: "",
          price: 0,
          quantitySold: 1,
          itemPrice: 0,
        })
      );
    }
  };

  const handleQuantityChange = (e) => {
    const quantitySold = parseInt(e.target.value);
    dispatch(
      updateProductInfo({
        id: product?.id,
        productInfo: {
          quantitySold,
          itemPrice: quantitySold * product?.price,
        },
      })
    );

    dispatch(updateTotalPrice());
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    console.log(sales.products[index]?.id);
    dispatch(deleteProductSection({ id: sales.products[index]?.id }));
    dispatch(updateTotalPrice());
  };

  return (
    <div className="w-full relative">
      <div className="flex items-start justify-start gap-2 bg-white p-10 border-2 rounded-lg flex-wrap">
        <div className=" relative flex flex-col items-start justify-center">
          <label className="font-bold text-xs text-cyan-600">
            Product Name
          </label>
          <input
            list="products"
            value={currProduct}
            onChange={handleProductInfoChange}
            className="mt-1 p-1 w-full border border-gray-300 rounded-md"
          />

          <datalist id="products">
            {inventories?.map((inventory) => (
              <option
                className=" hover:bg-slate-100 cursor-pointer"
                key={inventory._id}
                value={inventory.productName}
              >
                {inventory?.productName}
              </option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold text-xs text-cyan-600">
            Serial Number
          </label>
          <input
            readOnly
            type="text"
            className="mt-1 p-1 w-full border border-gray-300 rounded-md bg-slate-300"
            value={product?.productSerialNumber}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold text-xs text-cyan-600">Price</label>
          <input
            type="text"
            readOnly
            className="mt-1 p-1 w-full border border-gray-300 rounded-md bg-slate-300"
            value={product?.price}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold text-xs text-cyan-600">
            Quantities Sold
          </label>
          <input
            type="number"
            value={sales?.products[index]?.quantitySold || 0}
            onChange={handleQuantityChange}
            className="mt-1 p-1 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold text-xs text-cyan-600">Item Price</label>
          <input
            type="number"
            value={product?.itemPrice || 0}
            readOnly
            className="mt-1 p-1 w-full border border-gray-300 rounded-md bg-slate-300"
          />
        </div>
      </div>
      <button
        className=" absolute right-3 top-2 hover:bg-blue-500 rounded-full"
        onClick={deleteHandler}
      >
        <TiDelete size={30} />
      </button>
    </div>
  );
}
