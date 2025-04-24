import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHq8zJi00ORijH6ScwjxK31VjbL1IIHDU",
  authDomain: "trooper-4c128.firebaseapp.com",
  projectId: "trooper-4c128",
  storageBucket: "trooper-4c128.firebasestorage.app",
  messagingSenderId: "166509910603",
  appId: "1:166509910603:web:0ed060150b15c8a85f8bce",
  measurementId: "G-V3C9YXL6DB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
