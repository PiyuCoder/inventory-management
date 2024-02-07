import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Shopkeeper } from "../models/shopkeeper.models.js";

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body.formData;

    if (!phone || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });

    const user = await Shopkeeper.findOne({ phone });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Not a registered user. Please register",
      });

    const isPasswordVerified = await bcrypt.compare(password, user.password);

    if (!isPasswordVerified)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Credentials" });

    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user.password = undefined;
    return res
      .status(201)
      .json({ success: true, message: "Login Successful!", user, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
