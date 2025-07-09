// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyg0kmjgxu2NflGjZak2Brn5vJ1Y-IBNY",
  authDomain: "rentdrive-b6985.firebaseapp.com",
  projectId: "rentdrive-b6985",
  storageBucket: "rentdrive-b6985.firebasestorage.app",
  messagingSenderId: "1010819751992",
  appId: "1:1010819751992:web:92f5e600f1cc7e09f106cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth and export it
const auth = getAuth(app);
export { auth };
