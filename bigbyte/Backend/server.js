const { initializeApp } = require("firebase/app");
const port = 3001;
const app = require('./app');


//const { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

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

initializeApp(firebaseConfig);

app.listen(port,()=>
{
    console.log("app running ssossn port 3001");
    
    
});


