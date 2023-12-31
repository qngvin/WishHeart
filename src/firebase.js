// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuF5jUvNOqZyX8-R_WGK_cAUHuuDZP28A",
  authDomain: "wishheart-105f1.firebaseapp.com",
  projectId: "wishheart-105f1",
  storageBucket: "wishheart-105f1.appspot.com",
  messagingSenderId: "299980575938",
  appId: "1:299980575938:web:92a477fd3e367b1302d75b",
  measurementId: "G-DBG30HGH43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);