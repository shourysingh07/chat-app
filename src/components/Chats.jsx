import React, { useState, useEffect, useContext } from 'react'
import img from '../images/pp.jpg'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'
import { AuthContext } from "../context/AuthContext.js"
import { ChatContext} from '../context/ChatContext'
const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

      return () => {
        unsub();
      }
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  // console.log(Object.entries(chats)[0][1].lastMessage.text)
  const handleSelect=(e)=>{
    dispatch({type:"CHANGE_USER",payload:e})
  }
 
  return (
    <div className='chats'>
      {chats&&Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => {
        return (
          <div className="userChat" key={chat[0]} onClick={()=>{handleSelect(chat[1].userInfo)}}>
            
            <img src={chat[1]?.userInfo?.photoURL} alt="" />
            <div className="userChatInfo">
              <span style={{ fontWeight: "500", fontSize: "18px" }}>{chat[1]?.userInfo?.displayName}</span>
              <p>{chat[1]?.lastMessage?.text?chat[1]?.lastMessage?.text:"IMAGE"}</p>
              { console.log(chat[1]?.userInfo)}
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Chats