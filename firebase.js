// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOhTA843PqbbpezfKKDnbwNES4D-G9mgU",
  authDomain: "epitechconnect-c36e7.firebaseapp.com",
  projectId: "epitechconnect-c36e7",
  storageBucket: "epitechconnect-c36e7.firebasestorage.app",
  messagingSenderId: "121380175576",
  appId: "1:121380175576:web:e83a0094ae34f631b5a1ad",
  measurementId: "G-ZF4W0VHHEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);