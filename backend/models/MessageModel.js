import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    messageId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
        unique: true
    },
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    updatedAt: {
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