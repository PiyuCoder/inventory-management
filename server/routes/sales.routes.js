import express from "express";
import {
  checkInvoiceUniqueness,
  getInvoiceData,
  saveInvoiceData,
} from "../controllers/checkInvoiceUniqueness.controllers.js";

const router = express.Router();

router.post("/sales/invoiceUnique", checkInvoiceUniqueness);
router.post("/sales/invoiceNumber", saveInvoiceData);
router.get("/sales/invoiceData", getInvoiceData);

export default router;
