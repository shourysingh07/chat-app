import React, { useContext, useState } from 'react'
import img from '../images/pp.jpg'
import {doc, collection, getDocs, query, setDoc, where, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import {db} from '../firebase'
import{AuthContext} from '../context/AuthContext'
const Search =() => {
  const[username,setUsername]=useState("")
  const[user,setUser]=useState(null)
  const[error,setError]=useState(false)
  const{currentUser}=useContext(AuthContext);
  const handleSearch=async()=>{
    console.log("reached here")
     const q= query(collection(db,"users"),where("displayName","==",username))
     try {
      const querySnapshot = await getDocs(q);
      
       querySnapshot.forEach((doc)=>{
        setUser(doc.data())
       })
       console.log(querySnapshot)
       if(querySnapshot.empty)
          setError(true)
      
     } catch (error) {
      console.log("error in finding the user ")
      console.log(error)
      setError(true)
     }
     
  }
  const handleKey=(e)=>{
    e.code==="Enter"&&handleSearch();
  }
  const handleSelect=async()=>{
    //check if the group chat exists and if not  create it 
    try {
      const combinedID=currentUser.uid>user.uid?currentUser.uid+user.uid:user.uid+currentUser.uid;
      const res=await getDoc(doc(db,"chats",combinedID))
      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedID),{messages:[]} );
      }
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedID+'.userInfo']:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL
        },
        [combinedID+'.date']:serverTimestamp()
      })
      await updateDoc(doc(db,"userChats",user.uid),{
        [combinedID+'.userInfo']:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL
        },
        [combinedID+'.date']:serverTimestamp()
      })
    } catch (error) {
      
    }
    setUser(null)
    setUsername("")
       
    //create user chats
  }
  return (
    <div className='searchBar'>
      <input type="text"
      placeholder='Find a User'
      className='searchInput'
      onKeyDown={handleKey}
      onChange={(e)=>{setUsername(e.target.value)
        console.log(username)
        if(username.length===1)
        {
          setUser(null)
          setError(false)
        }
      }}
      value={username}
      />
      {error&&<span style={{color:"white"}}>User not found</span>}
     { user&&<div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userCharInfo">
        <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search