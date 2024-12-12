import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_Vs2iOOgumTKWbQybjQ7d4fmN4SbIwr4",
  authDomain: "practical-exam-c3351.firebaseapp.com",
  projectId: "practical-exam-c3351",
  storageBucket: "practical-exam-c3351.appspot.com",
  messagingSenderId: "1002224221846",
  appId: "1:1002224221846:web:6f691e2bf897e175870cb7",
  measurementId: "G-BN7BSGRWE7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
