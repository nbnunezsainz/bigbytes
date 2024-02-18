// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//MUST ADD
import {getAuth} from "firebase/auth";
//MUST ADD**
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcrfzBruA31ybVPHoqb_n8DnSiyS08tM0",
    authDomain: "lbackend-7a432.firebaseapp.com",
    databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com",
    projectId: "lbackend-7a432",
    storageBucket: "lbackend-7a432.appspot.com",
    messagingSenderId: "46064267649",
    appId: "1:46064267649:web:c6dfc9c6287669806ff880",
    measurementId: "G-WRYZ44FDPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//MUST ADD
export const auth = getAuth(app);
//MUST ADD **