import { createContext, useOptimistic, useState } from 'react'
import {v4 as uuid} from 'uuid'
export const MessageContext = createContext(null);

const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    return (
        <MessageContext.Provider value={{messages, setMessages}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider
