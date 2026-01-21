import React, { useState, useContext } from 'react'
import { IoIosAttach } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { Textarea } from './textarea';
import SocketContext from '@/context/SocketContext';
import { Button } from './button';
import { v4 as uuidv4 } from 'uuid'
import apiClient from '@/lib/api-client.js';
import axios from 'axios';
import ChatContext from '@/context/ChatContext';

const MessageInput = () => {
  const senderId = uuidv4();
  const Socket = useContext(SocketContext);
  const [text, setText] = useState("");
  const { activeFriend } = useContext(ChatContext);
  
  const handleSubmitText = async (e) => {
    
    e.preventDefault();

    const message = text.trim();

    if (message === "") return;

    console.log(senderId)

    Socket.emit("chat_message", {
      message: message,
      recieverId: activeFriend._id
    });

    console.log("message sent: ", message);
    setText("");
  }

  return (
    <form className='w-full' onSubmit={handleSubmitText}>
      <div className='w-full h-16 py-4 px-3 rounded-4xl flex bg-white items-center shadow-md gap-4 border border-gray-500/70' >
        <Button className='cursor-pointer active:scale-95 rounded-full w-12 h-12 flex items-center justify-center p-0! bg-gray-500/70! min-w-12' size='icon'>
          <IoIosAttach className='text-2xl! font-bold! text-white' />
        </Button>
        <Textarea className='w-full flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0! ring-0! border-0! min-h-8 text-[18px]! text-[#060505c4] font-medium max-h-16 resize-none' value={text} onChange={(e) => setText(e.target.value)} />
        <Button type='submit' className='cursor-pointer active:scale-95 p-0 bg-gray-500/70! rounded-full w-12 h-12 flex items-center justify-center'>
          <BsSendFill className='text-2xl active:scale-95 text-white' />
        </Button>
      </div>
    </form>

  )
}

export default MessageInput
