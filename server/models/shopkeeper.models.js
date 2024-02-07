import mongoose from "mongoose";

const shopkeeperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  establishment: {
    type: String,
    required: true,
  },
  inventory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
  ],
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sales",
    },
  ],
});

export const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);
