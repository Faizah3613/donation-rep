// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJoZtis4gCLSwa8dD8oPWy16BTKTW6AiY",
  authDomain: "donation-access.firebaseapp.com",
  projectId: "donation-access",
  storageBucket: "donation-access.firebasestorage.app",
  messagingSenderId: "921851885160",
  appId: "1:921851885160:web:9d3ae7b73ab85a4b6aaddd",
  measurementId: "G-PPTK1PKXWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;

