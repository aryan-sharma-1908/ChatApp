import React, { useContext } from 'react'
import MessagesHeader from './MessagesHeader'
import MessageInput from './MessageInput'
import ChatContext from '@/context/ChatContext'

const Conversation = () => {
  const { activeFriend } = useContext(ChatContext);
  return (
    <div>
          <div className="messages_header absolute top-0 w-full">
            <MessagesHeader activeFriend={activeFriend} />
          </div>
          <div className='absolute w-full bottom-0'>
            <div className="chats_input my-2 mx-4">
              <MessageInput activeFriend={activeFriend} />
            </div>
          </div>
        </div>
  )
}

export default Conversation
