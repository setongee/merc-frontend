import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu1dmXmvwMYS96lqLCaBoUhckjpKmUg1A",
  authDomain: "merchcreations-15ff6.firebaseapp.com",
  projectId: "merchcreations-15ff6",
  storageBucket: "merchcreations-15ff6.appspot.com",
  messagingSenderId: "320960293919",
  appId: "1:320960293919:web:6f9b962f478fad4b5df92a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export {app, db, storage}