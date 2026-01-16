import React from 'react'

const UserData = ({ username, avatar, id }) => {
  return (
    <>
     <div className="flex gap-2" key={id}>
        <div className='w-12 h-12 rounded-full overflow-hidden shadow-md'>
            <img src={avatar} alt="user_avatar" className='w-full h-full object-cover'/>
        </div>
        <h1 className='text-2xl'>{username}</h1>
    </div>   
        
      
    </>
  )
}

export default UserData
