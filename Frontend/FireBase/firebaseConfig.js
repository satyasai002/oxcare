// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtfrH8ZqP1CIc70kn520fFIDerqCXG9uU",
  authDomain: "trip-share-34004.firebaseapp.com",
  projectId: "trip-share-34004",
  storageBucket: "trip-share-34004.appspot.com",
  messagingSenderId: "744479540173",
  appId: "1:744479540173:web:f62b2495207ea865613a84",
  measurementId: "G-6SVF9XGNX3"
};

const app = initializeApp(firebaseConfig);
// Firebase storage reference
const storage = getStorage(app);
export default storage;