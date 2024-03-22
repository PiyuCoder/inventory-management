import bcrypt from "bcrypt";
import { Shopkeeper } from "../models/shopkeeper.models.js";

export const register = async (req, res) => {
  try {
    const { name, phone, email, password, establishment, address } = req.body;
    const { filename } = req.file;

    if (!req.file) {
      return res.status(400).send("No logo uploaded.");
    }

    if (!name || !phone || !email || !password || !establishment || !address)
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });

    const user = await Shopkeeper.findOne({ phone });

    if (user)
      return res.status(400).json({
        success: false,
        message: "User already registerd. Please login",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new Shopkeeper({
      name,
      phone,
      email,
      password: hashedPassword,
      establishment,
      logo: filename,
      address,
    }).save();

    newUser.password = undefined;

    return res
      .status(201)
      .json({ success: true, message: "Registered Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
