import React, { useContext } from 'react'

import {signOut} from 'firebase/auth'
import {auth} from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    signOut(auth)
    navigate("/login")
  }
  const {currentUser}=useContext(AuthContext);
  const img=currentUser.photoURL;
  console.log(currentUser)
  return (
    <div className='navbar'>
      <div className="navLogo">
        <p>Chat App</p>
      </div>
      <div className="navInfo">
        <img src={img} className='navAvatar' alt="" />
        <p>{currentUser.displayName}</p>
        <button className='navButton' onClick={handleClick}>logout</button>
      </div>
    </div>
  )
}

export default Navbar