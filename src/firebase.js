// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD06lICMUULN4ByLgQIZEXv89fXC4FHuv8",
  authDomain: "sweet-lab-2fda2.firebaseapp.com",
  projectId: "sweet-lab-2fda2",
  storageBucket: "sweet-lab-2fda2.firebasestorage.app",
  messagingSenderId: "523115946393",
  appId: "1:523115946393:web:63078fabcb14161192f308",
  measurementId: "G-JM6ECM7D8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export both for flexibility
export { app, db };