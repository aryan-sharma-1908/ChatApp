import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { SlOptionsVertical } from "react-icons/sl"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const MessagesHeader = ({ activeUser }) => {
    if (!activeUser) return null
    return (
        <div className='bg-white w-full h-22  border-b-white border-l-white border-l-2 border-b-2 flex items-center justify-between p-5'>
            <div className="user_info gap-4 flex justify-between items-center cursor-pointer">
                <div className="user_avatar w-14 h-14 min-w-14">
                    <Avatar className='w-full h-full shadow-md border-2 border-white'>
                        <AvatarImage src={activeUser.userImage} className='rounded-full' />
                        <AvatarFallback>{activeUser.name}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex-col justify-between items-center'>
                    <div className="user_name text-[#2B2A2A] text-2xl font-bold">{activeUser.name}</div>
                    <p className='font-medium text-gray-500'>click here to get {activeUser.name} info</p>
                </div>

            </div>
            <div>
                <Tooltip>
                    <Button size='icon-lg' className='relative overflow-hidden rounded-full
                before:content-[""] before:bg-transparent
                before:scale-80 hover:before:bg-[#f1f1f1] before:absolute hover:before:scale-100 before:duration-300 before:inset-0 before:rounded-full cursor-pointer transition-transform'>
                        <TooltipTrigger>
                            <span className='relative z-10 cursor-pointer'><SlOptionsVertical /></span>

                        </TooltipTrigger>
                    </Button>
                    <TooltipContent>
                        <p>Menu</p>
                    </TooltipContent>
                </Tooltip>

            </div>

        </div>
    )
}

export default MessagesHeader
