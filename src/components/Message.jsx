import React, { useContext, useEffect, useRef } from 'react'
import img from '../images/pp.jpg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({message}) => {
  const{currentUser}=useContext(AuthContext)
  const{data}=useContext(ChatContext)
  console.log(message)
  const ref = useRef();
  useEffect(() => {
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    ref.current?.scrollIntoView();
  }, [message]);
  return (
    <div className={`message ${message.senderId===currentUser.uid&&"owner"}`}>
        <div className='messageInfo'>
          <img src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt="" />
          <span>just now</span>
      </div>
        <div className="messageContent">
          <p>{message.text}</p>
          {console.log(message)}
          {message.photoURL&&<img src={message.photoURL} alt="" />}
        </div>
    </div>
  )
}

export default Message