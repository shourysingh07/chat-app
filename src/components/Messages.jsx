import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
const Messages = () => {
  const{data}=useContext(ChatContext)
  const[messages,setMessages]=useState([]);
  useEffect(() => {
    const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
      console.log(messages)
    })
  
    return () => {
      unSub();
    }
  }, [data.chatId])
  
  return (
    <div className='messages'>
      {messages&&messages.map((m)=>{
        return(
          <Message message={m} key={m.id}/>
        )
      })}
      {/* {console.log(messages)} */}
        {/* <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/> */}
    </div>
  )
}

export default Messages