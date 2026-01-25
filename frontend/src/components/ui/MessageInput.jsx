import React, { useState, useContext, useRef } from 'react'
import { IoIosAttach } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { Textarea } from './textarea';
import SocketContext from '@/context/SocketContext';
import { Button } from './button';
import { v4 as uuidv4 } from 'uuid'
import apiClient from '@/lib/api-client.js';
import axios from 'axios';
import {ChatContext} from '@/context/ChatContext';
import {useParams} from 'react-router-dom'
import { MESSAGE_ROUTES } from '@/utils/constants';
import {toast} from 'sonner'
const MessageInput = () => {
  const Socket = useContext(SocketContext);
  const [text, setText] = useState("");
  const { friends } = useContext(ChatContext);
  const { friendId } = useParams();
  const activeFriend = friends.find(friend => friend._id.toString() === friendId);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSubmitText = async (e) => { 
    e.preventDefault();
    setIsSendingMessage(true);

    const messageContent = text.trim();
    if (messageContent === "") return;
    try {
      const response = await apiClient.post(MESSAGE_ROUTES, {
        messageContent: messageContent,
        friendId: friendId
      })
      
    } catch (error) {
      console.error("Error in sending message: ", error);
      toast.error('Error in sending message');
    }
    setText("");
  }

  return (
    <form className='w-full' onSubmit={handleSubmitText}>
      <div className='w-full h-16 py-4 px-3 rounded-4xl flex bg-white items-center shadow-md gap-4 border border-gray-500/70'>
        <Button className='cursor-pointer active:scale-95 rounded-full w-12 h-12 flex items-center justify-center p-0! bg-[#0084FF]! min-w-12' size='icon'>
          <IoIosAttach className='text-2xl! font-bold! text-white' />
        </Button>
        <Textarea className='w-full flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0! ring-0! border-0! min-h-8 text-[18px]! text-[#060505c4] font-medium max-h-16 resize-none' value={text} onChange={(e) => setText(e.target.value)} />
        <Button type='submit' className='cursor-pointer active:scale-95 p-0 bg-[#0084FF]! rounded-full w-12 h-12 flex items-center justify-center'>
          <BsSendFill className='text-2xl active:scale-95 text-white' />
        </Button>
      </div>
    </form>

  )
}

export default MessageInput
