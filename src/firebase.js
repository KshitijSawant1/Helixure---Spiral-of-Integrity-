// Import the required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore for database
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration (use your actual config values)
const firebaseConfig = {
  apiKey: "AIzaSyAddwPZn_qw-GguHp7GeFiyAj3yUPMSRvM",
  authDomain: "helixure-d9bd5.firebaseapp.com",
  projectId: "helixure-d9bd5",
  storageBucket: "helixure-d9bd5.appspot.com",
  messagingSenderId: "458929309593",
  appId: "1:458929309593:web:3a2eee24dda55caaad7508",
  measurementId: "G-6QGXT35KWY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);
