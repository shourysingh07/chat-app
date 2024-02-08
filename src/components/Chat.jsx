import React, { useContext } from 'react'
import { AiOutlineVideoCamera } from 'react-icons/ai'
import { HiUserAdd } from 'react-icons/hi'
import { BsThreeDots } from 'react-icons/bs'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data?.user)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data?.user?.displayName}</span>
        <div className="chatIcons">
          <AiOutlineVideoCamera style={{ cursor: "pointer" }} />
          <HiUserAdd style={{ cursor: "pointer" }} />
          <BsThreeDots style={{ cursor: "pointer" }} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat