import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  invoiceData: Object,
  invoiceNumber: String,
});

export const Sales = new mongoose.model("Sales", salesSchema);
