import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import apiClient from '@/lib/api-client'
import { MESSAGE_ROUTES } from '@/utils/constants'
import { ChatContext } from '@/context/ChatContext'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { SocketContext } from '@/context/SocketContext'

const MessagesList = () => {
    const { friends } = useContext(ChatContext);
    const { friendId } = useParams();
    const [messages, setMessages] = useState([]);
    const activeFriend = friends.find(friend => friend._id === friendId);
    const { socket } = useContext(SocketContext);
    const bottomRef = useRef(null);

    useEffect(() => {
        if(!socket || !activeFriend?._id) return;
        socket.emit('join_conversation',activeFriend._id);

    }, [socket, activeFriend?._id]);

    useEffect(() => {
        if (!activeFriend?._id) return;

        const getOldMessages = async () => {
            try {
                const response = await apiClient.get(`${MESSAGE_ROUTES}/${activeFriend._id}`);
                setMessages(response.data.messages || []);
            } catch (error) {
                console.error('Error in getOldMessages: ', error);
                toast.error('Failed to load messages');
                setMessages([]);
            }
        }

        getOldMessages();
    }, [activeFriend?._id]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message) => {
            console.log(message);
            setMessages(oldMessages => {
                if (oldMessages.some(m => m._id === message._id)) return oldMessages;
                return [...oldMessages, message];
            });
        }

        socket.on('new_message', handleNewMessage);

        return () => {
            socket.off('new_message', handleNewMessage);
        }
    }, [socket]);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    if (!activeFriend) {
        return <div className="p-4 text-gray-500">Select a chat</div>;
    }


    return (
        <div className='flex flex-col gap-2 py-2 px-2'>
            {messages.map(message => (
                <MessageBubble key={message._id} text={message.text} from={message.senderId === activeFriend._id ? 'them' : 'me'} time={new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                />

            ))}
            <div ref={bottomRef} />
        </div>
    )
}

export default MessagesList
