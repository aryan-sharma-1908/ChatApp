import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const Chat = ({ friend, isactive, onClick }) => {
    const { _id, name, description, avatar } = friend;

    return (
        <div className={`w-full border-y-[0.25px] border-gray-300/30 h-20 p-2 flex gap-3 hover:bg-gray-200/30 ${isactive && 'bg-gray-200/70'} cursor-pointer`} onClick={onClick}>
            <div className='w-14 h-14 min-w-14'>
                <Avatar className='w-full h-full shadow-md'>
                    <AvatarImage src={avatar} className='rounded-full' />
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className='userInfo'>
                <h1 className='text-xl font-medium'>{name}</h1>
                <p className='text-black opacity-70'>{description}</p>
            </div>
        </div>
    )
}

export default Chat
