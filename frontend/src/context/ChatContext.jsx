import React, { createContext, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { FRIEND_ROUTES } from '@/utils/constants'

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [friends, setFriends] = useState([])
    const [isActiveChat, setIsActiveChat] = useState(null);
    const activeFriend = useMemo(() => {
        return friends.find(friend => (friend._id === isActiveChat));
    },
        [friends, isActiveChat]);
    const fetchFriends = async () => {
        try {
            const response = await apiClient.get(FRIEND_ROUTES);
            console.log('Fetched friends: ', response);
            setFriends(response.data.friends || []);
        } catch (error) {
            console.error('Error fetching friends: ', error);
            toast.error("Failed to fetch friends. Please try again.")
            setFriends([]);
        }
    }
    useEffect(() => {

        fetchFriends();
    }, [])


    return (
        <ChatContext.Provider value={{ friends, isActiveChat, setIsActiveChat, setFriends, activeFriend }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider
