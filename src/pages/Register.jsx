import React, { useState } from 'react'
import './style.css'
import { BiImageAdd } from 'react-icons/bi';
import { auth, storage, db } from '../firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate=useNavigate();
  const [err, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value
    const file = e.target[3].files[0];
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage,displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.log("upload image error")
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await updateProfile(user.user, {
                displayName,
                photoURL: downloadURL
              })
            } catch (error) {
              console.log("Error in updating user")
              console.log(error)
            }
            try {
              await setDoc(doc(db, "users", user.user.uid), {
                uid: user.user.uid,
                displayName,
                email,
                photoURL: downloadURL
              })
            } catch (error) {
              console.log("Error in uploading to the db")
              console.log(error)
            }
            
            await setDoc(doc(db,"userChats",user.user.uid),{})
          });
        }
      );
      console.log("Successfully registered the user");
      navigate("/")
    } catch (error) {
      console.log("upload user error")
      console.log(error)
      setError(true);
    }



  }
  return (
    <div className='registerContainer'>
      <div className="registerWrapper">
        <p className='logo'>Chat App</p>
        <p className='title'>Register</p>
        <form onSubmit={handleSubmit} className='registerForm'>
          <input type="text"
            className='registerInp'
            placeholder='Enter Name'
            name='name'
          />
          <input type="email"
            className='registerInp'
            placeholder='Enter Email'
            name='email'
          />
          <input type="password"
            className='registerInp'
            placeholder='Enter your password'
            name='password'
          />

          <div className="propic" style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
            <label htmlFor="avatar" style={{ cursor: "pointer" }}><BiImageAdd size={"30px"} /></label>
            <span >Upload your avatar</span>
          </div>
          <input type="file"
            id='avatar'
            style={{ display: 'none' }}
          />
          {err && <p style={{ color: "red" }}>Something went wrong</p>}
          <button className='signupButton'>Sign Up</button>
        </form>
        <p className='registerPara'>You already have an account?<span className='registerSpan' onClick={()=>{
          navigate("/login")
        }}>Login</span></p>
      </div>
    </div>
  )
}

export default Register