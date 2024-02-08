
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCOXIZJoeZCSd9Fa_UhoTlm9DTh1PQfV8U",
  authDomain: "chat-app-4db33.firebaseapp.com",
  projectId: "chat-app-4db33",
  storageBucket: "chat-app-4db33.appspot.com",
  messagingSenderId: "395486423579",
  appId: "1:395486423579:web:257518b1c9d45a03e8a6be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage=getStorage();
export const db=getFirestore();