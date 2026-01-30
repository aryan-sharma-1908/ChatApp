import React, { useContext, useEffect, useOptimistic, useState } from 'react'
import MessagesHeader from '../../components/ui/MessagesHeader'
import MessageInput from '../../components/ui/MessageInput'
import MessagesList from '@/components/ui/MessagesList'
import { useParams } from 'react-router-dom'
import { MessageContext } from '@/context/MesageContext'
import { v4 as uuid } from 'uuid'
import { ChatContext } from '@/context/ChatContext'
import apiClient from '@/lib/api-client'
import { MESSAGE_ROUTES } from '@/utils/constants'
import { SocketContext } from '@/context/SocketContext'
import { startTransition } from 'react'
import { UserContext } from '@/context/UserContext'

const Conversation = () => {
  const { friendId } = useParams();

  const { socket } = useContext(SocketContext);
  const { friends } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const { messages, setMessages } = useContext(MessageContext);
  const [conversationId, setConversationId] = useState(null);
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(messages,
    (state, newMessage) => [
      ...state, newMessage
    ]
  )
  const activeFriend = friends.find(friend => friend._id === friendId);

  useEffect(() => {
    if (!activeFriend?._id) return;

    const getOldMessages = async () => {
      try {
        const response = await apiClient.get(`${MESSAGE_ROUTES}/${activeFriend._id}`, { withCredentials: true });
        if (response.data.success) {
          setConversationId(response.data.conversationId);
        }
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
    if (!socket || !activeFriend?._id) return;
    socket.emit('join_conversation', conversationId);

    const handler = (socketMessage) => {
      setMessages(prev =>
        prev.map(m => m.clientMessageId === socketMessage.clientMessageId ? socketMessage : m)
          .concat(prev.some(m => m._id === socketMessage._id) ? [] : [socketMessage]));
    }

    socket.on('new_message', handler);

    return () => socket.off('new_message', handler);
  }, [socket, activeFriend?._id, messages]);


  const handleSendMessage = (messageText) => {
    if (!socket) return;

    const clientMessageId = uuid();
    startTransition(() => {
      addOptimisticMessages({
        clientMessageId,
        text: messageText,
        senderId: user._id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
    })

    socket.emit('send_message', {
      clientMessageId,
      text: messageText,
      friendId
    })
  }

  return (
    <div className='flex flex-col h-full'>
      <div className="shrink-0">
        <MessagesHeader />
      </div>
      <div className='flex-1 min-h-0 overflow-y-auto'>
        <MessagesList messages={optimisticMessages} />
      </div>
      <div className="shrink-0 p-2">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  )
}

export default Conversation
