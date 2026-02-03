import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6";
import { toast } from 'sonner';
import apiClient from '@/lib/api-client';
import { ADD_FRIEND_ROUTES } from '@/utils/constants';
import { ChatContext } from '@/context/ChatContext';

const UserData = ({ name, avatar, _id, description, onAdded }) => {
  const { setFriends, friends } = useContext(ChatContext);
  const [isAdding, setIsAdding] = useState(false);
  const isFriend = friends.some(f => f._id === _id);

  const handleAddFriend = async () => {
    const friendId = _id;
    try {
      if (isFriend || isAdding) {
        if (isFriend) toast.error("This user is already your friend.");
        return;
      }

      // Optimistic UI: add the friend locally immediately
      const optimisticFriend = { _id: friendId, name, avatar, description, optimistic: true };
      setFriends(prev => [...prev, optimisticFriend]);
      setIsAdding(true);

      const response = await apiClient.post(ADD_FRIEND_ROUTES, { friendId }, { withCredentials: true });

      // If backend returned the created friend, replace optimistic entry with authoritative data
      if (response.data && response.data.success) {
        toast.success("Friend added successfully.");
        if (response.data.newFriend) {
          setFriends(prev => prev.map(f => f._id === friendId ? response.data.newFriend : f));
        } else {
          // Backend didn't send friend object. Remove optimistic flag.
          setFriends(prev => prev.map(f => f._id === friendId ? ({ ...f, optimistic: false }) : f));
        }
        if (onAdded) onAdded();
      }

    } catch (error) {
      console.error("Error adding friend: ", error);
      toast.error("Failed to add friend. Please try again.");
      // Rollback optimistic update on error
      setFriends(prev => prev.filter(f => f._id !== friendId || !f.optimistic));
    } finally {
      setIsAdding(false);
    }
  }
  return (
    <>
      <div className="flex gap-5 mb-2 w-full border-b border-gray-500/20 h-15" key={_id}>
        <div className='w-12 h-12 rounded-full overflow-hidden shadow-md'>
          <img src={avatar} alt="user_avatar" className='w-full h-full object-cover' />
        </div>
        <div className=' flex-1'>
          <h1 className='text-xl text-black'>{name}</h1>
          <p className='text-black/70'>{description}</p>
        </div>

        <div className='self-center h-full'>
          <Button
            className={`bg-white rounded-full border-gray-800 active:scale-95 w-8 h-8 min-w-8 ${isFriend || isAdding ? 'cursor-not-allowed bg-gray-200 disabled' : ''}`}
            onClick={handleAddFriend}
            disabled={isFriend || isAdding}
          >
            {isAdding ? '...' : (isFriend ? "✓" : <FaPlus className='text-2xl  rounded-full text-gray-500' />)}
          </Button>
        </div>
      </div>


    </>
  )
}

export default UserData
