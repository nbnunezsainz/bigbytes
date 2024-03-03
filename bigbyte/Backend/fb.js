
const { initializeApp } = require("firebase/app");
require('dotenv').config({ path: './.env' }) 
const { getAuth } = require("firebase/auth");

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.apiKey,
//     databaseURL: process.env.databaseURL,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.KappId,
//     measurementId: process.env.measurementId
//   };

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
  const firebaseApp = initializeApp(firebaseConfig);
   const Clientauth = getAuth(firebaseApp);

 module.exports ={Clientauth};
  