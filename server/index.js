import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/db.js";
import userRouter from "./routes/shopkeeper.routes.js";
import inventoryRouter from "./routes/inventory.routes.js";
import salesRouter from "./routes/sales.routes.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api", userRouter);
app.use("/api", inventoryRouter);
app.use("/api", salesRouter);

app.listen(PORT, console.log(`server listening on port ${PORT}`));
