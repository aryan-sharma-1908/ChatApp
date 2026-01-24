import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import SocketProvider  from './context/SocketContext'
import ChatProvider  from './context/ChatContext'
import UserProvider from './context/UserContext'

createRoot(document.getElementById('root')).render(
  <>
    <UserProvider>
      <ChatProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ChatProvider>
    </UserProvider>
    <Toaster richColors position="top-right" />
  </>,
)
