// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-hatch.firebaseapp.com",
  projectId: "home-hatch",
  storageBucket: "home-hatch.firebasestorage.app",
  messagingSenderId: "63489624669",
  appId: "1:63489624669:web:7ec3f37612bcd5b4895bb4",
  measurementId: "G-3FVSFHRV4H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
