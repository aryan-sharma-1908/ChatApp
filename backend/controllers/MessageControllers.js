import Message from '@/models/MessageModel.js';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import socket from 'socket.io';
import {io} from '../index.js';

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content} = req.body;


    } catch (error) {
        console.error('Error in sendMessage: ', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}