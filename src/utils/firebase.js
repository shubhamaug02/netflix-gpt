// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADU2wZzEVF8k7qxrw-mWI6fL6vMsuRyDQ",
  authDomain: "netflixgpt-8f7a9.firebaseapp.com",
  projectId: "netflixgpt-8f7a9",
  storageBucket: "netflixgpt-8f7a9.appspot.com",
  messagingSenderId: "820136980031",
  appId: "1:820136980031:web:30036a196fa747283a528a",
  measurementId: "G-HJVF8RXFL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();