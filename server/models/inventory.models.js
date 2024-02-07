import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productSerialNumber: {
      type: String,
      required: true,
    },
    quantitiesReceived: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Inventory = new mongoose.model("Inventory", inventorySchema);
