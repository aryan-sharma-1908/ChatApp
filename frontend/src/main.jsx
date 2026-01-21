import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { SocketProvider } from './context/SocketContext'
import { ChatContextProvider } from './context/ChatContext'

createRoot(document.getElementById('root')).render(
  <>
    <ChatContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ChatContextProvider>
    <Toaster richColors position="top-right" />
  </>,
)
