import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD06lICMUULN4ByLgQIZEXv89fXC4FHuv8",
  authDomain: "sweet-lab-2fda2.firebaseapp.com",
  projectId: "sweet-lab-2fda2",
  storageBucket: 'sweet-lab-bucket',
  messagingSenderId: "523115946393",
  appId: "1:523115946393:web:63078fabcb14161192f308",
  measurementId: "G-JM6ECM7D8L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 

export { app, db, storage }; // Export storage too
