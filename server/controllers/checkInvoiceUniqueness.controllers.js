import { Sales } from "../models/sales.models.js";

export const checkInvoiceUniqueness = async (req, res) => {
  try {
    const { invoiceNumber } = req.body;

    const exists = await Sales.findOne({ invoiceNumber });

    if (exists) {
      return res.status(200).json({ isUnique: false });
    }

    return res.status(200).json({ isUnique: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const saveInvoiceData = async (req, res) => {
  try {
    const formData = JSON.parse(req.body.formData);
    const invoiceNumber = formData.invoiceNumber;

    const exists = await Sales.findOne({ invoiceNumber });

    if (exists) {
      return res.status(200).json({ isUnique: false });
    }

    const newInvoice = await new Sales({
      invoiceData: formData,
      invoiceNumber,
    }).save();

    return res.status(200).json({ success: true, newInvoice });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getInvoiceData = async (req, res) => {
  try {
    const { invoiceNumber } = req.query;
    // console.log(invoiceNumber);

    const invoiceData = await Sales.findOne({ invoiceNumber });
    // console.log(invoiceData);

    if (!invoiceData) {
      return res
        .status(400)
        .json({ success: false, message: "invoice number not found." });
    }

    return res.status(200).json({ success: true, invoiceData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
