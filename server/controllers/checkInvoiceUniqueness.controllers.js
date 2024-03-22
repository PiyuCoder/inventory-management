import { Sales } from "../models/sales.models.js";
import { Shopkeeper } from "../models/shopkeeper.models.js";

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
    const userId = req.user.id;

    const exists = await Sales.findOne({ invoiceNumber });

    if (exists) {
      return res.status(200).json({ isUnique: false });
    }

    const user = await Shopkeeper.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const newInvoice = await new Sales({
      invoiceData: formData,
      invoiceNumber,
    }).save();

    await user.invoices.push(newInvoice._id);

    user.save();

    return res.status(200).json({ success: true, newInvoice, user });
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

export const fetchAllInvoiceData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Shopkeeper.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    const invoiceIds = await user.invoices;

    const allInvoices = await Sales.find({ _id: { $in: invoiceIds } });

    return res.status(200).json({ success: true, allInvoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
