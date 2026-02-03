import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import { UserContext } from '@/context/UserContext';

const MessagesList = ({messages}) => {
    const {user} = useContext(UserContext);
    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'})
    },[messages])
    
    return (
        <div className='flex flex-col gap-2 py-2 px-2'>
            {messages.map(message => (
                <MessageBubble key={message._id ?? message.clientMessageId} text={message.text} from={message.senderId === user._id ? 'me' : 'them'} time={new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })} status={message.status} deleted
                />

            ))}
            <div ref={bottomRef} />
        </div>
    )
}

export default MessagesList
