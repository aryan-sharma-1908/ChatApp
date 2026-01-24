import Conversation from '../models/ConversationModel.js';
import Message from '../models/MessageModel.js'
import { getSocketIdFromUserId, io } from '../server/socket.js';

export const handleNewMessage = async (req, res) => {
    try {
        const {messageContent, friendId} = req.body;
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            members: {$all : [senderId, friendId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                members : [senderId, friendId]
            })
        }
        
        const newMessage = await Message.create({
            senderId: senderId,
            text: messageContent,
            conversationId: conversation._id,
            status: 'sent'
        })

        const friendSocketId = getSocketIdFromUserId(friendId);

        if(friendSocketId) {
           
            io.to(friendSocketId).emit('newMessage', newMessage);
            
            newMessage.status = 'delivered';
            await newMessage.save();
        }
        console.log(`new message delivered: ${newMessage.text}`)
        res.status(200).json({
            success: true,
            message: `new message delivered: ${newMessage.text}`
        })

    } catch (error) {
        console.error("Error occured in handleNewMessage: ", error);
        res.status(500).json({
            success: false,
            message: "Error occurred during handleNewMessage"
        })
    }
}