import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./Routes/Auth.js";
import productRoutes from "./Routes/products.js";

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ Message: "Clozzet" });
});

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Server Running on port ${PORT} and DB connected`);
    })
    .catch((err) => console.log(err));
});
