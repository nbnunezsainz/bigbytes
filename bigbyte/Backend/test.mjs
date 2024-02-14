import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

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
const db = getFirestore(app);

async function writeData() {
  try {
      await setDoc(doc(db, "User", "TEST IF FAIL"), {
      name: "Los",
      state: "CA",
      country: "USA"
    });

    console.log("Data written successfully");
  } catch (error) {
    console.error("Error writing data:", error);
  } finally {
    process.exit();
  }
}

// Call the asynchronous function
writeData();

console.log("working");