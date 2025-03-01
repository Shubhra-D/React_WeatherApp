// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1jCgXk587hddvJhAFJGZIJAamqvqO_Jk",
  authDomain: "react-weatherapp-bbf19.firebaseapp.com",
  projectId: "react-weatherapp-bbf19",
  storageBucket: "react-weatherapp-bbf19.firebasestorage.app",
  messagingSenderId: "381018703868",
  appId: "1:381018703868:web:29622b5e8442ccb67d9479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const provider =new GoogleAuthProvider(app)