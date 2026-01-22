import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    ConversationId: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isGroupChat: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

export default ConversationModel;