// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8505d.firebaseapp.com",
  projectId: "mern-blog-8505d",
  storageBucket: "mern-blog-8505d.firebasestorage.app",
  messagingSenderId: "892982368229",
  appId: "1:892982368229:web:6e784bac0e1df70abcc10c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

