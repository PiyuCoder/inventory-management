import express from "express";
import { register } from "../controllers/register.controllers.js";
import { login } from "../controllers/login.controllers.js";
import { upload } from "../multer/multer.js";

const router = express.Router();

router.post("/register", upload.single("logo"), register).post("/login", login);

export default router;
