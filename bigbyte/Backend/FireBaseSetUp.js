
 const {getFirestore}= require("firebase-admin/firestore");
 const admin = require("firebase-admin");
const serviceAccount = require("./FBAdmin.json");
//const { initializeApp, cert } = require('firebase-admin/app');

 const firebaseApp = admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com"
 });

const db = getFirestore(firebaseApp);

module.exports = {db,admin}; 


    //  const firebaseConfig = {
    //     apiKey: "AIzaSyCcrfzBruA31ybVPHoqb_n8DnSiyS08tM0",
    //     authDomain: "lbackend-7a432.firebaseapp.com",
    //       databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com",
    //      projectId: "lbackend-7a432",
    //       storageBucket: "lbackend-7a432.appspot.com",
    //      messagingSenderId: "46064267649",
    //       appId: "1:46064267649:web:c6dfc9c6287669806ff880",
    //       measurementId: "G-WRYZ44FDPG"
    //    };
 
    //    const clientApp = initializeClientApp(firebaseConfig, "clientAPP");
    //    const auth = getAuth(clientApp);


//

