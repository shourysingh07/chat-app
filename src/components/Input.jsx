import React, { useContext, useState } from 'react'
import { BsPaperclip } from 'react-icons/bs'
import { MdAddAPhoto } from 'react-icons/md'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
const Input = () => {
  const [text, setText] = useState("")
  const [error, setError] = useState(false)
  const [image, setImage] = useState(null)
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, Date.now()+currentUser.uid);
      
      const uploadTask = uploadBytesResumable(storageRef, image);
      console.log("hello i am here")
      uploadTask.on(
        (error) => {
          console.log("upload image error")
          setError(true)
        },
        // () => {
        //   getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //     try {
        //       await updateDoc(doc(db, "chats", data.chatId), {
        //         messages: arrayUnion({
        //           id: uuid(),
        //           senderId: currentUser.uid,
        //           text,
        //           date: Timestamp.now(),
        //           img: downloadURL,
        //         }),
        //       });
        //     } catch (error) {
        //       console.log("Error in sending message")
        //       console.log(error)
        //     }



        //   });
        // }
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
 await updateDoc(doc(db, "userChats", currentUser.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  setText('')
    setImage(null)
}
  return (
    <div className='messageInput'>
      <input type="text"
        placeholder='Type something'
        name='message'
        onChange={(e) => { setText(e.target.value) }}
        value={text}
      />
      <div className="options">
        <BsPaperclip style={{ color: "gray", cursor: "pointer" }} />
        <input type='file'
          name='image'
          id='messageImage'
          style={{ display: "none" }}
          alt=''
          onChange={(e) => {console.log(e.target.files[0])
             setImage(e.target.files[0]) 
             console.log(image.name)
            }}
          
        />
        <label htmlFor="messageImage">
          <MdAddAPhoto style={{ color: "gray", cursor: "pointer" }} />
        </label>
        <button className='messageButton' onClick={handleSend}>
          Send
        </button>
      </div>


    </div>
  )
}

export default Input