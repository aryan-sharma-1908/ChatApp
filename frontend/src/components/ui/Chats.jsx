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
import Conversation from './Conversation'

const users = [
  { id: 'a2ff3b22-8d62-453e-b0d3-091a6da23ad2', name: "Aryan Sharma", description: "Not Available", userImage: AryanProfile },
  { id: 'b3ff4c33-9e73-564f-c1e4-102b7eb34be3', name: "Aditya Raj", description: "Available", userImage: AdityaProfile },
  { id: 'c4ff5d44-0f84-675g-d2f5-213c8fc45cf4', name: "Sudhanshu Pal", description: "Sleeping...", userImage: SudhanshuProfile },
  { id: 'd5ff6e55-1g95-786h-e3g6-324d9gd56dg5', name: "Rupam Singh", description: "Not Available", userImage: RupamProfile },
  { id: 'e6ff7f66-2h06-897i-f4h7-435ehhe67eh6', name: "Pakshik Gangwal", description: "Available", userImage: PakshikProfile },
  { id: 'f7ff8g77-3i17-908j-g5i8-546fiif78fi7', name: "Aryan Sharma", description: "Not Available", userImage: AryanProfile },
  { id: 'g8ff9h88-4j28-019k-h6j9-657gjjg89gj8', name: "Aditya Raj", description: "Available", userImage: AdityaProfile },
  { id: 'h9ff0i99-5k39-120l-i7k0-768hkkh00hk0', name: "Sudhanshu Pal", description: "Sleeping...", userImage: SudhanshuProfile },
  { id: 'i0ff1j00-6l40-231m-j8l1-879illl11il1', name: "Rupam Singh", description: "Not Available", userImage: RupamProfile },
  { id: 'j1ff2k11-7m51-342n-k9m2-980jmmn22jm2', name: "Pakshik Gangwal", description: "Available", userImage: PakshikProfile },
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
        <div className='chat group/users flex-1 overflow-y-auto'>
          {users.map(user => (
            <Chat key={user.id} id={user.id} name={user.name} description={user.description} userImage={user.userImage} onClick={() => setActiveChatId(user.id)} isactive={isactive == user.id} />
          ))}

        </div>
      </div>
      <div className="messages w-[75%] bg-[#F5F2F2] h-full fixed right-0">
        {isactive ? <Conversation activeUser={activeUser} /> : ""}
      </div>
    </div>
  )
}

export default Chats
