import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6";
import { toast } from 'sonner';
import apiClient from '@/lib/api-client';
import { ADD_FRIEND_ROUTES } from '@/utils/constants';
import { ChatContext } from '@/context/ChatContext';

const UserData = ({ username, avatar, id, description }) => {
  const { setFriends } = useContext(ChatContext);

  const [isFriend, setIsFriend] = useState(false);

  const handleAddFriend = async (id) => {
    try {
      if (isFriend) {
        toast.error("This user is already your friend.");
        return;
      }

      const response = await apiClient.post(ADD_FRIEND_ROUTES, { friendId: id });
      if (response.data.success) {
        toast.success("Friend added succesfully.");
        setIsFriend(true);
        setFriends(prevFriends => [...prevFriends, response.data.newFriend]);
      }
    } catch (error) {
      console.error("Error adding friend: ", error);
      toast.error("Failed to add friend. Please try again.");
    }
  }
  return (
    <>
      <div className="flex gap-5 mb-2 w-full border-b border-gray-500/20 h-15" key={id}>
        <div className='w-12 h-12 rounded-full overflow-hidden shadow-md'>
          <img src={avatar} alt="user_avatar" className='w-full h-full object-cover' />
        </div>
        <div className=' flex-1'>
          <h1 className='text-xl text-black'>{username}</h1>
          <p className='text-black/70'>{description}</p>
        </div>

        <div className='self-center h-full'>
          <Button className={`bg-white rounded-full border-gray-800 active:scale-95 w-8 h-8 min-w-8 ${isFriend ? 'cursor-not-allowed bg-gray-200 disabled' : ''} `}
            onClick={() => handleAddFriend(id)}>
            {
              isFriend ? "✓" : <FaPlus className='text-2xl  rounded-full text-gray-500' />
            }

          </Button>
        </div>
      </div>


    </>
  )
}

export default UserData
