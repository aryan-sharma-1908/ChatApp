import Message from "../models/MessageModel.js";
import { getOrCreateConversation } from "../service/ConversationService.js";

const socketIdMap = new Map();


export const initSocket = (io) => {

  io.on("connection", (socket) => {

    const userId = socket.userId;
    if (!userId) return socket.disconnect();

    socketIdMap.set(userId, socket.id);

    console.log("A user connected: ", userId);

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log('Joined conversation: ',conversationId)
    });

    socket.on("send_message", async ({ text, friendId }) => {
      try {
        const senderId = socket.userId;
        const conversation = await getOrCreateConversation(senderId, friendId);

        const newMessage = await Message.create({
          conversationId: conversation._id,
          text,
          senderId: senderId,
          status: "sent",
        });
        console.log(newMessage)
        io.to(conversation._id.toString()).emit("new_message", {
          newMessage
        });
      } catch (error) {
        console.error("Error in sendMessage: ", error);
        socket.emit("message_error", {
          message: "error in sending message",
        });
      }
    });

    socket.on("disconnect", () => {
      socketIdMap.delete(userId);
      console.log("A user disconnected: ", userId);
    });
  });
};

export const getOnlineUsers = () => {
  return Array.from(socketIdMap.keys());
};