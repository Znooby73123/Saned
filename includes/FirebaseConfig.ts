// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApZrjkvMwte8j_0NX_8BXpHrFBYv0imwk",
  authDomain: "saned-f5a2d.firebaseapp.com",
  projectId: "saned-f5a2d",
  storageBucket: "saned-f5a2d.firebasestorage.app",
  messagingSenderId: "551357149431",
  appId: "1:551357149431:web:bda2893556f45bb92a63f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
