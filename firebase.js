import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy0t-RjzwZS97UT2sgUbLzU2W-91683j8",
  authDomain: "gatewaytosuccess-12fce.firebaseapp.com",
  projectId: "gatewaytosuccess-12fce",
  storageBucket: "gatewaytosuccess-12fce.appspot.com",
  messagingSenderId: "387573643859",
  appId: "1:387573643859:web:8afa12dd6c47c4596064a6",
  measurementId: "G-GQM9BTXR7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
