import React, { useContext } from 'react'
import MessagesHeader from '../../components/ui/MessagesHeader'
import MessageInput from '../../components/ui/MessageInput'
import ChatContext from '@/context/ChatContext'

const Conversation = () => {

  return (
    <div>
          <div className="messages_header absolute top-0 w-full">
            <MessagesHeader />
          </div>
          <div className='absolute w-full bottom-0'>
            <div className="chats_input my-2 mx-4">
              <MessageInput />
            </div>
          </div>
        </div>
  )
}

export default Conversation
