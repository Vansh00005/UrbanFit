// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjSUuRHlbf5-FDRsyms2AkvQ5Pw8yfA1A",
  authDomain: "urbanfit-4f60e.firebaseapp.com",
  projectId: "urbanfit-4f60e",
  storageBucket: "urbanfit-4f60e.appspot.com",
  messagingSenderId: "205740824138",
  appId: "1:205740824138:web:2b185f2014c041b2f538b3",
  measurementId: "G-QCZXVDH5LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
