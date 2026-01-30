import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import SocketProvider from './context/SocketContext'
import ChatProvider from './context/ChatContext'
import UserProvider from './context/UserContext'
import MessageProvider from './context/MesageContext'
createRoot(document.getElementById('root')).render(
  <>
    <MessageProvider>
      <UserProvider>
        <ChatProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ChatProvider>
      </UserProvider>
    </MessageProvider>
    <Toaster richColors position="top-right" />
  </>,
)
