// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDQt9P7g2omksABx9qyS_HOCAv8aLjshyE",
//   authDomain: "todowithauth-41bb4.firebaseapp.com",
//   projectId: "todowithauth-41bb4",
//   storageBucket: "todowithauth-41bb4.appspot.com",
//   messagingSenderId: "945449874926",
//   appId: "1:945449874926:web:23adcf3471f67e81db4aff"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB4geawXvB3pmweegyG3D1i1L7FPRQUcw4",
  authDomain: "rs-online-services.firebaseapp.com",
  projectId: "rs-online-services",
  storageBucket: "rs-online-services.appspot.com",
  messagingSenderId: "605563292737",
  appId: "1:605563292737:web:a6f169fb6a34c4a4e28ac0",
  measurementId: "G-5REN7DXCT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()


