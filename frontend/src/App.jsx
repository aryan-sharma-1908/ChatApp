import React, { useContext, useEffect } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/index'
import Chats from './components/ui/Chats'
import Profile from './pages/profile/index'
import Conversation from './pages/Conversation/index'
import ConversationSkeleton from './components/ui/skeletons/ConversationSkeleton'
import { SocketContext } from './context/SocketContext'
import { UserContext } from './context/UserContext'
import ProtectedRoute from './route/ProtectedRoute'

const App = () => {
  const { user } = useContext(UserContext);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/chats' element={<Chats />}>
            <Route index element={<ConversationSkeleton />}></Route>
            <Route path=':friendId' element={<Conversation />}></Route>
          </Route>
        </Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='*' element={<Navigate to='/auth' />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App