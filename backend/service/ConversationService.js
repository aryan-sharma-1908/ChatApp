import Conversation from "../models/ConversationModel.js";

export const getOrCreateConversation = async (userId, frienId) => {
    try {
        const members = [userId, frienId].sort()
        let conversation = await Conversation.findOne({
            members: { $all : members, $size: members.length }
        })

        if(!conversation) {
            conversation = await Conversation.create({
                members
            })
        }

        return conversation
    } catch (error) {
        console.error("error in getConversation: ", error);
    }
}