import MessageInput from '@/components/ui/MessageInput'
import ChatsHeader from '@/components/ui/ChatsHeader'
import MessagesHeader from '@/components/ui/MessagesHeader'
import React, { useState } from 'react'
import Chat from './Chat'
import AryanProfile from '@/assets/AryanProfile.jpeg'
import AdityaProfile from '@/assets/AdityaProfile.jpeg'
import SudhanshuProfile from '@/assets/SudhanshuProfile.jpeg'
import RupamProfile from '@/assets/RupamProfile.jpeg'
import PakshikProfile from '@/assets/PakshikProfile.jpeg'

const users = [
  { id: 1, name: "Aryan Sharma", description: "Not Available", userImage: AryanProfile },
  { id: 2, name: "Aditya Raj", description: "Available", userImage: AdityaProfile },
  { id: 3, name: "Sudhanshu Pal", description: "Sleeping...", userImage: SudhanshuProfile },
  { id: 4, name: "Rupam Singh", description: "Not Available", userImage: RupamProfile },
  { id: 5, name: "Pakshik Gangwal", description: "Available", userImage: PakshikProfile },
  { id: 6, name: "Aryan Sharma", description: "Not Available", userImage: AryanProfile },
  { id: 7, name: "Aditya Raj", description: "Available", userImage: AdityaProfile },
  { id: 8, name: "Sudhanshu Pal", description: "Sleeping...", userImage: SudhanshuProfile },
  { id: 9, name: "Rupam Singh", description: "Not Available", userImage: RupamProfile },
  { id: 10, name: "Pakshik Gangwal", description: "Available", userImage: PakshikProfile },
]

const Chats = () => {
  const [isactive, setIsActive] = useState(null);
  const setActiveChatId = (id) => {
    setIsActive(id)
  }

  const activeUser = users.find(user => (user.id == isactive));

  return (
    <div className='h-screen flex items-stretch w-full'>
      <div className="chats w-[25%] bg-white h-full shadow-md border-r-white border-r-2">
        <div className='sticky top-0 z-10'>
          <ChatsHeader />
        </div>
        <div className='chat mt-5 group/users flex-1 overflow-y-auto'>
          {users.map(user => (
            <Chat key={user.id} id={user.id} name={user.name} description={user.description} userImage={user.userImage} onClick={() => setActiveChatId(user.id)} isactive={isactive == user.id} />
          ))}

        </div>
      </div>
      <div className="messages w-[75%] bg-[#F5F2F2] h-full fixed right-0">
        {isactive ? <div>
          <div className="messages_header absolute top-0 w-full">
            <MessagesHeader activeUser={activeUser} />
          </div>
          <div className='absolute w-full bottom-0'>
            <div className="chats_input m-2">
              <MessageInput/>
            </div>
          </div>
        </div> : ""}


      </div>
    </div>
  )
}

export default Chats
