import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBvXPXk0ft7G0Ohf2V8ntMLB9jyso4BlN0",
  authDomain: "reactexpensetracker-37f2d.firebaseapp.com",
  projectId: "reactexpensetracker-37f2d",
  storageBucket: "reactexpensetracker-37f2d.appspot.com",
  messagingSenderId: "813777057989",
  appId: "1:813777057989:web:644b48bc652cc531d098ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(app);
