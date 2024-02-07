import jwt from "jsonwebtoken";

export const authenticator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });

    const token = authorization.split(" ")[1];

    const verified = jwt.verify(token, process.env.SECRET_KEY);

    if (!verified)
      return res
        .status(400)
        .json({ success: false, message: "Token expired or incorrect" });

    req.user = verified;

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
