import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"
import apiClient from "@/lib/api-client";
export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    
    const connectSocket = () => {
        const socketInstance = io(apiClient.defaults.baseURL, {
            withCredentials: true,
        });

        socketRef.current = socketInstance;

        socketRef.current.on('connect', () => {
            console.log('Socket connected successfully.', socketRef.current.id)
        })

        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected. ', socketRef.current.id)
        })

        
    }

    const disconnectSocket = () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
    }

    return (
        <SocketContext.Provider value={{socket:socketRef,connectSocket,disconnectSocket}}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider;