//this function returns the firebase configuration key
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export function getFirebaseConfig()
{
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
      return firebaseConfig;
}
const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); //may not need