import React, { useState, useContext } from 'react'
import { IoIosAttach } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { Textarea } from './textarea';
import SocketContext from '@/context/SocketContext';
import { Button } from './button';
import { v4 as uuidv4 } from 'uuid'
import apiClient from '@/lib/api-client.js';
import axios from 'axios';

const MessageInput = ({ activeUser }) => {
  const senderId = uuidv4();
  const Socket = useContext(SocketContext);
  const [text, setText] = useState("");

  const handleSubmitText = async (e) => {

    e.preventDefault();

    const message = text.trim();

    if (message === "") return;
    console.log(senderId)
    Socket.emit("chat_message", {
      message: message,
      recieverId: ""
    });

    console.log("message sent: ", message);

    setText("");
  }
  return (
    <form className='w-full' onSubmit={handleSubmitText}>
      <div className='w-full h-16 py-4 px-6 rounded-4xl flex bg-white items-center shadow-md gap-4 border border-gray-500/70' >
        <IoIosAttach className='text-xl cursor-pointer active:scale-95 ' />
        <Textarea className='w-full flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0! ring-0! border-0! min-h-8 text-[18px]! text-[#060505c4] font-medium max-h-12 resize-none' value={text} onChange={(e) => setText(e.target.value)} />
        <Button type='submit' className=' cursor-pointer active:scale-95 p-0 bg-transparent! hover:bg-transparent!'>
          <BsSendFill className='text-xl active:scale-95 ' />
        </Button>
      </div>
    </form>

  )
}

export default MessageInput
