import Message from "../models/MessageModel.js";
import Conversation from "../models/ConversationModel.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import cookie from "cookie";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const usersMap = {};
export const getSocketIdFromUserId = (userId) => {
  return usersMap[userId];
};

export const getOnlineUsers = () => {
  return Object.keys(usersMap);
};

io.on("connection", async (socket) => {
  try {
    console.log("A user connnected", socket.id);
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;
    if (!token) {
      socket.disconnect();
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      socket.disconnect();
      return;
    }
    socket.userId = user._id.toString();
    usersMap[socket.userId] = socket.id;
    socket.emit("getOnlineUsers", getOnlineUsers);

    socket.on("disconnect", () => {
      delete usersMap[socket.userId];
      console.log("A user disconnected", socket.id);
    });
  } catch (error) {
    console.error("Error in decoding user id from token: ", error);
    socket.disconnect();
  }
});
export { app, server, io };
