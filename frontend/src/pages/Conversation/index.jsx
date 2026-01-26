import React, { useContext } from 'react'
import MessagesHeader from '../../components/ui/MessagesHeader'
import MessageInput from '../../components/ui/MessageInput'
import { ChatContext } from '@/context/ChatContext'
import MessagesList from '@/components/ui/MessagesList'
import {useParams} from 'react-router-dom'
const Conversation = () => {
  const params = useParams();
  
  return (
    <div className='flex flex-col h-full'>
      <div className="shrink-0">
        <MessagesHeader />
      </div>
      <div className='flex-1 min-h-0 overflow-y-auto'>
        <MessagesList />
      </div>
      <div className="shrink-0 p-2">
        <MessageInput />
      </div>
    </div>
  )
}

export default Conversation
