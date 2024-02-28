
const { initializeApp } = require("firebase/app");
require('dotenv').config({ path: './Secure.env' }) 
const firebaseConfig = {
    apiKey: process.env.FBSDKapiKey,
    authDomain: process.env.FBSDKapiKey,
    databaseURL: process.env.FBSDKdatabaseURL,
    projectId: process.env.FBSDKprojectId,
    storageBucket: process.env.FBSDKstorageBucket,
    messagingSenderId: process.env.FBSDKmessagingSenderId,
    appId: process.env.FBSDKappId,
    measurementId: process.env.FBSDKmeasurementId
  };
  const firebaseApp = initializeApp(firebaseConfig);


  
 module.exports = firebaseApp;
  