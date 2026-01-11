import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const Chat = ({ id, name, userImage, description, isactive, onClick }) => {

    return (
        <div className={`w-full border-y-[0.25px] border-gray-300/30 h-20 p-2 flex gap-3 hover:bg-gray-200/30 ${isactive && 'bg-gray-200/70'} cursor-pointer`} onClick={onClick}>
            <div className='w-14 h-14 min-w-14'>
                <Avatar className='w-full h-full shadow-md'>
                    <AvatarImage src={userImage} className='rounded-full' />
                    <AvatarFallback>{name}</AvatarFallback>
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
