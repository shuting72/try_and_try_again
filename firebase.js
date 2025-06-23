// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA36XEEy8zpDOfb6-aRBWFsM37Ci-sN0mo",
  authDomain: "try-and-try-again-e1255.firebaseapp.com",
  projectId: "try-and-try-again-e1255",
  storageBucket: "try-and-try-again-e1255.firebasestorage.app",
  messagingSenderId: "862622576858",
  appId: "1:862622576858:web:ab3105518f41123987f5e3",
  measurementId: "G-25V3NL4HEB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
