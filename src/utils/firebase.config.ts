import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEDGDcVv8u4rClLgIwK-2PVsLQiKQVXHI",
  authDomain: "chat-app-a4c11.firebaseapp.com",
  projectId: "chat-app-a4c11",
  storageBucket: "chat-app-a4c11.firebasestorage.app",
  messagingSenderId: "1093724048557",
  appId: "1:1093724048557:web:91606edfd70638d87b0a24",
  measurementId: "G-TVD13T62DX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 
