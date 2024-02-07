import express from "express";
import { addInventory } from "../controllers/addInventory.controllers.js";
import { authenticator } from "../middlewares/authenticator.js";
import { updateInventory } from "../controllers/updateInventory.controllers.js";
import { fetchInventory } from "../controllers/fetchInventory.controllers.js";

const router = express.Router();

router.get("/inventory/fetchInventory", authenticator, fetchInventory);
router.post("/inventory/add", authenticator, addInventory);
router.put("/inventory/update", updateInventory);

export default router;
