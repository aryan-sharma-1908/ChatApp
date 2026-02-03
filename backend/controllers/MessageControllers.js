import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import { getOrCreateConversation } from "../service/ConversationService.js";

export const getOldMessages = async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [userId, friendId] },
    });

    if (!conversation) {
      return res.status(200).json({
        success: true,
        conversationId: null,
        messages: [],
      });
    }
    const messages = await Message.find({
      conversationId: conversation._id,
      deletedFor: { $ne: userId },
      deletedAt: { $exists: false}
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

export const deleteAllMessages = async (req, res) => {
  const session = await Message.startSession();
  session.startTransaction();
  try {
    const userId = req.user._id;
    const { friendId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [userId, friendId]}
    }).session(session);

    if (!conversation) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "conversation not found.",
      });
    }

    await Message.updateMany(
      {
        conversationId: conversation._id,
        deletedFor: { $ne: userId },
      },
      { $addToSet: { deletedFor: userId } },
      { session }
    );

    await Message.deleteMany({
      conversationId: conversation._id,
      deletedFor: {$all: conversation.members },
      
    }, { session });

    await session.commitTransaction();

    req.io.to(conversation._id.toString()).emit('messages_deleted', {
      conversationId: conversation._id,
      deletedBy: userId
    })

    res.status(200).json({
      success: true,
      conversationId: conversation._id,
      messages: "Chat messages deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in deleteAllMessages: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    session.endSession();
  }
};

