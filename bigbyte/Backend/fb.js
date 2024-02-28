
const { initializeApp } = require("firebase/app");
require('dotenv').config({ path: './.env' }) 
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.apiKey,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.KappId,
    measurementId: process.env.measurementId
  };
  const firebaseApp = initializeApp(firebaseConfig);


  
 module.exports = firebaseApp;
  