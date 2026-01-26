import Message from "../models/MessageModel.js";
import { getOrCreateConversation } from "../service/ConversationService.js";

export const getOldMessages = async (req, res) => {
  try {
    const { friendId } = req.params;
    const  userId  = req.user._id;
    
    const conversation = await getOrCreateConversation(userId, friendId);
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      conversationId: conversation._id,
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};
