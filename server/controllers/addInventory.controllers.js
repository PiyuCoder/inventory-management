import { Inventory } from "../models/inventory.models.js";
import { Shopkeeper } from "../models/shopkeeper.models.js";

export const addInventory = async (req, res) => {
  try {
    const {
      productName,
      productSerialNumber,
      quantitiesReceived,
      pricePerUnit,
      vendorName,
    } = req.body.formData;
    const userId = req.user.id;

    if (!productName || !productSerialNumber || !vendorName)
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory." });

    const user = await Shopkeeper.findById(userId);
    const inventory = await Inventory.findOne({ productSerialNumber });

    if (inventory)
      return res.status(400).json({
        success: false,
        message: "Product already exists with same serial number.",
      });

    const newInventory = await new Inventory({
      productName,
      productSerialNumber,
      quantitiesReceived,
      pricePerUnit,
      vendorName,
    }).save();

    await user.inventory.push(newInventory._id);

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Added Inventory Succesfully!",
      newInventory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
