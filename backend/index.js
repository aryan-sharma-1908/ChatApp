import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import morgan from "morgan";
import uploadRoutes from "./routes/UploadRoutes.js";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";
import userRoutes from "./routes/UserRoutes.js";
import { server, app } from "./server/socket.js";
import MessageRoutes from './routes/MessageRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", AuthMiddleware, userRoutes);
app.use("/api/message", AuthMiddleware, MessageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
