import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/db.js";
import userRouter from "./routes/shopkeeper.routes.js";
import inventoryRouter from "./routes/inventory.routes.js";
import salesRouter from "./routes/sales.routes.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

dotenv.config();
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Serve static files from the build directory
app.use("/", express.static(path.join(__dirname, "build")));

app.use("/api", userRouter);
app.use("/api", inventoryRouter);
app.use("/api", salesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, console.log(`server listening on port ${PORT}`));
