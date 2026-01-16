import React from 'react'
import MessagesHeader from './MessagesHeader'
import MessageInput from './MessageInput'

const Conversation = ({activeUser}) => {
  return (
    <div>
          <div className="messages_header absolute top-0 w-full">
            <MessagesHeader activeUser={activeUser} />
          </div>
          <div className='absolute w-full bottom-0'>
            <div className="chats_input my-2 mx-4">
              <MessageInput activeUser={activeUser} />
            </div>
          </div>
        </div>
  )
}

export default Conversation
