import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/index'
import Chats from './components/ui/Chats'
import Profile from './pages/profile/index'
import Conversation from './pages/Conversation/index'
import ConversationSkeleton from './components/ui/skeletons/ConversationSkeleton'
const App = () => {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/auth' element={<Auth />}></Route>
        <Route path='*' element={<Navigate to='/auth' />}></Route>
        <Route path='/chats' element={<Chats />}>
          <Route index element={<ConversationSkeleton/>}></Route>
          <Route path=':friendId' element={<Conversation/>}></Route>
        </Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App