import { createSlice, nanoid } from "@reduxjs/toolkit";
import { checkInvoiceUniqueness, saveInvoiceNumber } from "../axios/axios";

const isInvoiceNumberUnique = async (invoiceNumber) => {
  const res = await checkInvoiceUniqueness(invoiceNumber);
  return res?.data?.isUnique;
};

const initialState = {
  customerInfo: {
    name: "",
    address: "",
    currentDate: "",
  },
  products: [
    // Initial product section
    {
      productName: "",
      productSerialNumber: "",
      price: 0,
      quantitySold: 1,
      itemPrice: 0,
      id: nanoid(),
    },
  ],
  totalPrice: 0,
  invoiceNumber: "",
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
    addProductSection: (state) => {
      state.products.push({
        productName: "",
        productSerialNumber: "",
        price: 0,
        quantitySold: 1,
        itemPrice: 0,
        id: nanoid(),
      });
    },
    deleteProductSection: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      state.products = state?.products?.filter((product) => product?.id !== id);
    },

    updateProductInfo: (state, action) => {
      const { id, productInfo } = action.payload;
      state.products = state?.products?.map((product) => {
        if (product?.id === id) {
          return { ...product, ...productInfo };
        }

        return product;
      });
    },

    updateTotalPrice: (state) => {
      const newTotalPrice = state.products.reduce(
        (total, product) => total + parseFloat(product.itemPrice || 0),
        0
      );

      // Update the state directly without dispatching another action
      state.totalPrice = newTotalPrice;
    },

    generateInvoiceNumber: (state) => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const length = 15; // You can adjust the length as needed
      let newInvoiceNumber;

      // Generate a unique invoice number
      do {
        newInvoiceNumber = nanoid(length, alphabet);
      } while (!isInvoiceNumberUnique(newInvoiceNumber));

      // Update state with the unique invoice number
      return { ...state, invoiceNumber: newInvoiceNumber };
    },
    resetSalesState: (state) => {
      // Reset the state to the initial state when needed
      return initialState;
    },
  },
});

export const {
  updateCustomerInfo,
  addProductSection,
  updateProductInfo,
  updateTotalPrice,
  generateInvoiceNumber,
  resetSalesState,
  deleteProductSection,
} = salesSlice.actions;

export default salesSlice.reducer;
