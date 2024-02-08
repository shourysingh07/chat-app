import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import{auth} from '../firebase.js'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const[error,setError]=useState(false)
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
    try {
    const user=await signInWithEmailAndPassword(auth, email, password)
    navigate("/")   
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }
  return (
    <div className='loginContainer'>
    <div className="loginWrapper">
      <p className='login logo'>Chat App</p>
      <p className='title'>Login</p>
      <form onSubmit={handleSubmit} className='loginForm'>
        <input type="email"
        className='loginInp'
        placeholder='Enter Email'
        name='email'
        />
        <input type="password"
        className='loginInp'
        placeholder='Enter your password'
        name='password'
        />
       <button className='loginButton' >Sign In</button>
       {error&&<p style={{color:"red"}}>Error occured in login. Please try again</p>}
      </form>
      <p className='loginPara'>You don't have an account?<span className='loginSpan' onClick={()=>{
        navigate("/register")
      }}>Register</span></p>
    </div>
</div>
  )
}

export default Login