import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBgl5r0K5c7Kq97Jw917HXANKfMQRmZIWw",
    authDomain: "thesolvetree.firebaseapp.com",
    projectId: "thesolvetree",
    storageBucket: "thesolvetree.firebasestorage.app",
    messagingSenderId: "905516348894",
    appId: "1:905516348894:web:d7d71961804f6368c7194f",
    measurementId: "G-ESTK5XTQF6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
