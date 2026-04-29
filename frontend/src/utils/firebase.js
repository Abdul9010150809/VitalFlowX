import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpkCl57TiqLZ8fiDBZsZitb3VK60MJ2wU",
  authDomain: "fraud-detect-72f11.firebaseapp.com",
  projectId: "fraud-detect-72f11",
  storageBucket: "fraud-detect-72f11.firebasestorage.app",
  messagingSenderId: "1077076139393",
  appId: "1:1077076139393:web:c2f0d58ab9c1024f3e1c80",
  measurementId: "G-WNE9J5WS0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
