import React, { useState, useContext } from 'react'
import { IoIosAttach } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { Textarea } from './textarea';
import { SocketContext } from '@/context/SocketContext';
import { Button } from './button';
import {ChatContext} from '@/context/ChatContext';
import {useParams} from 'react-router-dom'
import {toast} from 'sonner'

const MessageInput = () => {
  const {socket} = useContext(SocketContext);
  const [text, setText] = useState("");
  const { friends } = useContext(ChatContext);
  const { friendId } = useParams();
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSubmitText = (e) => { 
    e.preventDefault();
    setIsSendingMessage(true);
    const trimmedText = text.trim();
    if (trimmedText === "") {
      setIsSendingMessage(false);
      return;}
    try {
      if(!socket) {
        setIsSendingMessage(false);
        return null;}
      socket.emit('send_message', {
        text: trimmedText,
        friendId
      })
    } catch (error) {
      console.error("Error in sending message: ", error);
      toast.error('Error in sending message');
    }
    setText("");
    setIsSendingMessage(false);
  }

  if(!friendId) return null;
  return (
    <form className='w-full' onSubmit={handleSubmitText}>
      <div className='w-full h-16 py-4 px-3 rounded-4xl flex bg-white items-center shadow-md gap-4 border border-gray-500/70'>
        <Button className='cursor-pointer active:scale-95 rounded-full w-12 h-12 flex items-center justify-center p-0! bg-[#A1BC98]! min-w-12' size='icon'>
          <IoIosAttach className='text-2xl! font-bold! text-white' />
        </Button>
        <Textarea className='w-full flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0! ring-0! border-0! min-h-8 text-[18px]! text-[#060505c4] font-medium max-h-16 resize-none' value={text} onChange={(e) => setText(e.target.value)} />
        <Button type='submit' className='cursor-pointer active:scale-95 p-0 bg-[#A1BC98]! rounded-full w-12 h-12 flex items-center justify-center' disabled={isSendingMessage}>
          <BsSendFill className='text-2xl active:scale-95 text-white' />
        </Button>
      </div>
    </form>

  )
}

export default MessageInput
