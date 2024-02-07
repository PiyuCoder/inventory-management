import { Inventory } from "../models/inventory.models.js";
import { Shopkeeper } from "../models/shopkeeper.models.js";

export const fetchInventory = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Shopkeeper.findById(userId);

    const inventoryArr = await user.inventory;

    const inventories = await Inventory.find({ _id: { $in: inventoryArr } });

    return res.status(200).json({
      success: true,
      message: "Fetched inventories successfully",
      inventories: inventories.reverse(),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
