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
import Conversation from '../../pages/Conversation'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { FRIEND_ROUTES } from '@/utils/constants'
import {ChatContext} from '@/context/ChatContext'
import ConversationSkeleton from './skeletons/ConversationSkeleton'
import {Outlet, useNavigate, useParams} from 'react-router-dom'
const Chats = () => {
  const {friendId} = useParams();
  const { friends, activeFriend } = useContext(ChatContext);
  const navigate = useNavigate();

  return (
    <div className='h-screen flex items-stretch w-full'>
      <div className="chats w-[25%] bg-white h-full shadow-xl  border-r-gray-100 border-r ">
        <div className='sticky top-0 z-10 mb-1'>
          <ChatsHeader />
        </div>
        <div className='chat group/users flex-1 overflow-y-auto'>
          {friends.map(friend => (
            <Chat key={friend._id} friend={friend} isActive={friendId == friend._id} onClick={() => navigate(`/chats/${friend._id}`)}/>
          ))}

        </div>
      </div>
      <div className="messages w-[75%] bg-[#F8F9FA] bg-cover h-full fixed right-0">
          <Outlet/>
      </div>
    </div>
  )
}

export default Chats
