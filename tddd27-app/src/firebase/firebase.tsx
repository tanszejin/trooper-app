import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUrmR-w4o-MwvQXVbAjNZgOnWinQeIArQ",
  authDomain: "trooper-sg.firebaseapp.com",
  projectId: "trooper-sg",
  storageBucket: "trooper-sg.firebasestorage.app",
  messagingSenderId: "570744451708",
  appId: "1:570744451708:web:cac2d6ff9d22d43fae8ff9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
