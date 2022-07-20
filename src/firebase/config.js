// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZL25jchGJhY1paL0c5FSvB3WnstGshL8",
  authDomain: "react-app-f55ca.firebaseapp.com",
  projectId: "react-app-f55ca",
  storageBucket: "react-app-f55ca.appspot.com",
  messagingSenderId: "1015071043740",
  appId: "1:1015071043740:web:7fdc51bb9c5a7173c87d59"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)