import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    messageId : {
        type: String,
        required: true,
        unique: true
    },
    senderId : {
        type: String,
        required: true
    },
    receiverId : {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    conversationId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read', 'failed', 'pending'],
        default: 'pending'
    }
}, {timestamps: true})

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;