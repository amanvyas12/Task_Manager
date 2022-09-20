// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBiyEE_N3U06xcE0s8asCa53f9sQwhB_44",
  authDomain: "taskmanager-2fb4b.firebaseapp.com",
  projectId: "taskmanager-2fb4b",
  storageBucket: "taskmanager-2fb4b.appspot.com",
  messagingSenderId: "989464658536",
  appId: "1:989464658536:web:133881257913f91432f1dd"
};

// Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const db = fire.firestore();
  const auth = firebase.auth();
 
  export default fire;