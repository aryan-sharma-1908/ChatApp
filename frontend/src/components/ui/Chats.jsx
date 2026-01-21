import MessageInput from '@/components/ui/MessageInput'
import ChatsHeader from '@/components/ui/ChatsHeader'
import MessagesHeader from '@/components/ui/MessagesHeader'
import React, { useContext, useEffect, useState } from 'react'
import Chat from './Chat'
import AryanProfile from '@/assets/AryanProfile.jpeg'
import AdityaProfile from '@/assets/AdityaProfile.jpeg'
import SudhanshuProfile from '@/assets/SudhanshuProfile.jpeg'
import RupamProfile from '@/assets/RupamProfile.jpeg'
import PakshikProfile from '@/assets/PakshikProfile.jpeg'
import Conversation from './Conversation'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { FRIEND_ROUTES } from '@/utils/constants'
import ChatContext from '@/context/ChatContext'

const Chats = () => {
  const { friends, isActiveChat, setIsActiveChat, activeFriend } = useContext(ChatContext);

  return (
    <div className='h-screen flex items-stretch w-full'>
      <div className="chats w-[25%] bg-white h-full shadow-md border-r-white border-r-2">
        <div className='sticky top-0 z-10 mb-1'>
          <ChatsHeader />
        </div>
        <div className='chat group/users flex-1 overflow-y-auto'>
          {friends.map(friend => (
            <Chat key={friend._id} friend={friend} onClick={() => setIsActiveChat(friend._id)} isActive={isActiveChat == friend._id} />
          ))}

        </div>
      </div>
      <div className="messages w-[75%] bg-[url(/conversationbg.jpg)] h-full fixed right-0">
        {isActiveChat ? <Conversation activeFriend={activeFriend} /> : ""}
      </div>
    </div>
  )
}

export default Chats
