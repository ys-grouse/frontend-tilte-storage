// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1MZHJSjrGIsmjrp52jJSx-6uOqNJwvu8",
  authDomain: "etilte.firebaseapp.com",
  databaseURL:
    "https://etilte-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "etilte",
  storageBucket: "etilte.appspot.com",
  messagingSenderId: "674228668498",
  appId: "1:674228668498:web:d45e712a5498d7b1dcb78b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
