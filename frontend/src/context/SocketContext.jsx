import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"
import apiClient from "@/lib/api-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

    const socketRef = useRef(null);
    
    useEffect(() => {
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

        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketContext;