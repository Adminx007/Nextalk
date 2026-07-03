// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmYflApsEXMMY_PyjcMNF5fOkz7JWijLI",
  authDomain: "tnbo-80fc8.firebaseapp.com",
  projectId: "tnbo-80fc8",
  storageBucket: "tnbo-80fc8.firebasestorage.app",
  messagingSenderId: "146710661145",
  appId: "1:146710661145:web:607ca7bbc5ee1254998288"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
