// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCANdAxxBN57DjDJpD0zHv_KhYj3sS1w3E",
    authDomain: "boggle-authentication.firebaseapp.com",
    projectId: "boggle-authentication",
    storageBucket: "boggle-authentication.appspot.com",
    messagingSenderId: "828699221568",
    appId: "1:828699221568:web:9d3c6876627ae2d295c9a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db }

export const auth = getAuth(app)

export default app