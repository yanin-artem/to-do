import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLYHiZCZMO1-zAt8Oa-jU1LT5vNb3IC4k",
  authDomain: "mytodolist-af437.firebaseapp.com",
  projectId: "mytodolist-af437",
  storageBucket: "mytodolist-af437.appspot.com",
  messagingSenderId: "76064798522",
  appId: "1:76064798522:web:821d0a2c91d2f476858203",
  measurementId: "G-EEPJN98HB9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);