import express from "express";
import { register } from "../controllers/register.controllers.js";
import { login } from "../controllers/login.controllers.js";

const router = express.Router();

router.post("/register", register).post("/login", login);

export default router;
