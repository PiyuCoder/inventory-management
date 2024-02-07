import { Inventory } from "../models/inventory.models.js";
import { Shopkeeper } from "../models/shopkeeper.models.js";

export const updateInventory = async (req, res) => {
  try {
    const {
      productId,
      productName,
      productSerialNumber,
      quantitiesReceived,
      pricePerUnit,
      vendorName,
    } = req.body.formData;

    if (
      !productName ||
      !productSerialNumber ||
      !quantitiesReceived ||
      !pricePerUnit ||
      !vendorName
    )
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory." });

    const inventory = await Inventory.findByIdAndUpdate(
      { productId },
      {
        productName,
        productSerialNumber,
        quantitiesReceived,
        pricePerUnit,
        vendorName,
      }
    );

    if (!inventory)
      return res.status(400).json({
        success: false,
        message: "Product doesn't exist.",
      });

    await inventory.save();
    return res.status(200).json({
      success: true,
      message: "Added Inventory Succesfully!",
      inventory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
