// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_lrJ8aPsCBNQqljrGavBIVTA3ucTxaUs",
  authDomain: "booming-crowbar-387705.firebaseapp.com",
  projectId: "booming-crowbar-387705",
  storageBucket: "booming-crowbar-387705.appspot.com",
  messagingSenderId: "45791953662",
  appId: "1:45791953662:web:efbe4fbd2ee6087e469baf",
  measurementId: "G-Y4VDCLXX7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };