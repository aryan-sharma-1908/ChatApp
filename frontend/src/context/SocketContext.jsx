import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client"
import apiClient from "@/lib/api-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socketInstance = io(apiClient.defaults.baseURL, {
            withCredentials: true,
            transports: ['websocket']
        });
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Socket connected successfully.', socketInstance.id)
        })

        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected. ', socketInstance.id)
        })

        return () => {
            socketInstance.disconnect();
        }
    },[])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketContext;