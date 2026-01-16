import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6";
import { toast } from 'sonner';

const UserData = ({ username, avatar, id, description }) => {
  const [friendAdded, setFriendAdded] = useState(false);
  const handleAddFriend = (id) => {
    if(friendAdded) {
      toast.warning('Removing friend feature coming soon! ');
      localStorage.setItem('friendAdded', id);
      setFriendAdded(false);
    }
    setFriendAdded(true);
  }
  return (
    <>
     <div className="flex gap-5 mb-2 w-full border-b border-gray-500/20 h-15" key={id}>
        <div className='w-12 h-12 rounded-full overflow-hidden shadow-md'>
            <img src={avatar} alt="user_avatar" className='w-full h-full object-cover'/>
        </div>
        <div className=' flex-1'>
        <h1 className='text-xl text-black'>{username}</h1>
        <p className='text-black/70'>{description}</p>
        </div>

        <div className='self-center h-full'>
          <Button className='bg-white rounded-full border-gray-800 active:scale-95 w-8 h-8 min-w-8' onClick={() => handleAddFriend(id)}>
            {
              friendAdded ? "✓" : <FaPlus className='text-2xl  rounded-full text-gray-500' />
            }
            
          </Button>
        </div>
    </div>   
        
      
    </>
  )
}

export default UserData
