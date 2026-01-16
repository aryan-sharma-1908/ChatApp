import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './button'
import { FiPlusCircle } from "react-icons/fi";
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';
import { USER_ROUTES } from '@/utils/constants.js'
import UserData from './UserData';
const Addfriends = () => {
  const [usersData, setUsersData] = useState([]);

  const handleOpenUsersList = async () => {
    try {
      const response = await apiClient.get(USER_ROUTES);

      const users = response.data.users;

      setUsersData(users);

      console.log(usersData.usernames, usersData.userAvatars, usersData.description);
    } catch (error) {
      console.error("Error adding friend: ", error);
      toast.error("Failed to add friend. Please try again.")
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className='active:scale-95 flex items-center' onClick={handleOpenUsersList}>
            <FiPlusCircle className='w-full text-2xl min-w-full  hover:bg-gray-100' />
          </div>
        </DialogTrigger>
        <DialogContent className='bg-white/80 '>
          <DialogHeader>
            <DialogTitle className='text-black text-3xl pl-2'>Add friends</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
          {
                usersData.map(userData => (
                  <UserData key={userData._id} username={userData.name} avatar={userData.avatar} id={userData._id} description={userData.description}/>
                ))
              }
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Addfriends
