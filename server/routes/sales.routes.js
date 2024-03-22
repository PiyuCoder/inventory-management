import express from "express";
import {
  checkInvoiceUniqueness,
  fetchAllInvoiceData,
  getInvoiceData,
  saveInvoiceData,
} from "../controllers/checkInvoiceUniqueness.controllers.js";
import { authenticator } from "../middlewares/authenticator.js";

const router = express.Router();

router.post("/sales/invoiceUnique", checkInvoiceUniqueness);
router.post("/sales/invoiceNumber", authenticator, saveInvoiceData);
router.get("/sales/invoiceData", getInvoiceData);
router.get("/sales/allInvoiceData", authenticator, fetchAllInvoiceData);

export default router;
