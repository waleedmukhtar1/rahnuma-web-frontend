import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF4bDYa2F2FH1krsDuerQgXY7g7QjfUC4",
  authDomain: "rahnuma-183a1.firebaseapp.com",
  projectId: "rahnuma-183a1",
  storageBucket: "rahnuma-183a1.appspot.com",
  messagingSenderId: "149090089896",
  appId: "1:149090089896:web:95664ea2c0a4d60c663b9d",
  measurementId: "G-FV3E4ZBVHT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
