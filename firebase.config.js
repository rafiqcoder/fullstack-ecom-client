// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4i2RzfBARtEHxip0OLeZYtrCyn6eg3zY",
  authDomain: "fullstack-ecommerce-c64ee.firebaseapp.com",
  projectId: "fullstack-ecommerce-c64ee",
  storageBucket: "fullstack-ecommerce-c64ee.firebasestorage.app",
  messagingSenderId: "556290006568",
  appId: "1:556290006568:web:30f06bc98641b79d93df1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
