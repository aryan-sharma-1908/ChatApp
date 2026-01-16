import React from 'react'
import { CiSearch } from "react-icons/ci";
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
import Addfriends from './Addfriends';
const ChatsHeader = () => {
  return (
    <div className='bg-white w-full border-b-white border-b-2'>
      <div className='flex justify-between px-6 py-4'>
          <h1 className='text-4xl font-extrabold font-serif'>ChatApp</h1>
        <Addfriends />
      </div>

      <div className='px-4'>
        <InputGroup className="rounded-4xl focus-within:ring-0!">
          <InputGroupInput
            placeholder="Search..."
          />
          <InputGroupAddon>
            <CiSearch />
          </InputGroupAddon>
        </InputGroup>

      </div>
    </div>
  )
}

export default ChatsHeader
