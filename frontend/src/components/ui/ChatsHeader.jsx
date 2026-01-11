import React from 'react'
import { CiSearch } from "react-icons/ci";
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
const ChatsHeader = () => {
  return (
    <div className='bg-white w-full h-22 border-b-white border-b-2'>
      <div className='mx-6 my-4'>
        <h1 className='text-4xl font-extrabold font-serif'>ChatApp</h1>
      </div> 
      <div className='mx-4'>
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
